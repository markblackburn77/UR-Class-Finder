import { Component, OnInit } from '@angular/core';
import { Class } from '../../shared/class.model';
import { MeetingTime } from 'src/app/shared/meeting-time.model';
import { DummyData } from './dummy-data';
import { ClassesService } from 'src/app/shared/classes.service';
import { HttpService } from 'src/app/shared/http.service';

@Component({
  selector: 'app-schedule-gen',
  templateUrl: './schedule-gen.component.html',
  styleUrls: ['./schedule-gen.component.scss']
})
export class ScheduleGenComponent implements OnInit {
  constructor(
    private classesService: ClassesService,
    private httpService: HttpService
  ) {}

  /** Stores all sections of classes in cart */
  allSections: Class[];
  /** Stores all generated schedules from all sections */
  allSchedules: Class[][] = [];
  /** Do not generate schedules with less than this number of classes */
  minCoursesNum = 2;
  /** Current classes in cart */
  currCart: Class[];
  /** Boolean for if the api responds correctly  */
  serverUnreacheable = false;

  limitToCartClasses = false;

  // colors = [
  //   '#AA3939',
  //   '#AAA839',
  //   '#378b2e',
  //   '#2f4073',
  //   '#246D5E',
  //   '#822b66',
  //   '#AA5A39',
  //   '#246d5e'
  // ];

  ngOnInit() {}

  onGenerateScheduleButtonClick() {
    // Fetch the current cart from classes service
    this.currCart = this.classesService.getCurrentCart();

    // Make sure schedules are clear
    this.resetSchedules();

    // Generate schedules
    this.generateSchedules(this.currCart);
  }

  resetSchedules() {
    this.allSchedules = [];
    this.allSections = [];
  }

  /**
   * Starter method for recursive algorithm to compute all possible schedules
   * @param allSections
   */
  runGenerateSchedulesAlg(allSections: Class[]) {
    for (let i = 0; i < allSections.length; i++) {
      let c: Class = allSections[i];
      allSections.splice(i, 1);

      if (c.meetingTimes.length == 0) continue;

      this.bronKerbochAdaptation(allSections.slice(), c);
    }
  }

  bronKerbochAdaptation(sections: Class[], pick: Class, curr: Class[] = []) {
    curr.push(pick);

    let temp: Class[] = sections;

    temp = temp.filter(v => {
      return this.isCompatible(v, pick);
    });

    if (temp.length == 0) {
      if (curr.length >= this.minCoursesNum) {
        this.allSchedules.push(curr.slice());
      }
    } else {
      for (let i = 0; i < temp.length; i++) {
        let c: Class = temp[i];
        temp.splice(i, 1);
        this.bronKerbochAdaptation(temp.slice(), c, curr.slice());
      }
    }
  }

  intersection(a: any[], b: any[]) {
    return a.slice().filter(value => b.includes(value));
  }

  isCompatible(c1: Class, c2: Class): boolean {
    for (let cm1 of c1.meetingTimes) {
      for (let cm2 of c2.meetingTimes) {
        if (
          (this.timesConflict(cm1, cm2) && this.weekDaysConflict(cm1, cm2)) ||
          c1.name === c2.name
        ) {
          return false;
        }
      }
    }
    return true;
  }

  timesConflict(m1: MeetingTime, m2: MeetingTime) {
    if (m1.endAsNum() < m2.startAsNum() || m2.endAsNum() < m1.startAsNum()) {
      return false;
    }
    return true;
  }

  weekDaysConflict(m1: MeetingTime, m2: MeetingTime) {
    return (
      this.intersection(m1.weekCode.split(''), m2.weekCode.split('')).length > 0
    );
  }

  generateSchedules(classes: Class[]) {
    // Depending on toggle, run the generate alg with every section of a class or just the sections present in the cart
    if (!this.limitToCartClasses) {
      let namesList: string[] = [];
      for (let c of classes) {
        namesList.push(c.name);
      }
      this.httpService.sendSameClassSearchData(namesList).subscribe(
        // Add classes in classes service if successful
        response => {
          this.classesService.loadAllSectionsOfCart(response);
        },
        // Change variable for popup if error
        error => (this.serverUnreacheable = true),
        // If completed
        () => {
          this.runGenerateSchedulesAlg(
            this.classesService.getAllSectionsOfCurrentCart()
          );
        }
      );
    } else {
      this.runGenerateSchedulesAlg(this.currCart);
    }
  }
}
