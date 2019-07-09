import { Component, OnInit, Input } from '@angular/core';
import { Class } from 'src/app/shared/class.model';
import { MeetingTime } from 'src/app/shared/meeting-time.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  constructor() {}

  // Input so parent components can pass in classes
  @Input() classes: Class[];
  allStartTimes: string[];

  // Days of week for labels
  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Map days of week to code
  dayToCode = {
    Monday: 'M',
    Tuesday: 'T',
    Wednesday: 'W',
    Thursday: 'R',
    Friday: 'F'
  };

  ngOnInit() {
    // Get start times of all classes in order (for side labels)
    this.allStartTimes = this.getAllStartTimes();
  }

  /**
   * Cycle through meeting times of classes and return list of meeting times in order of earlies to latest
   */
  getAllStartTimes() {
    let meetingTimes: MeetingTime[] = [];
    for (let c of this.classes) {
      for (let m of c.meetingTimes) {
        meetingTimes.push(m);
      }
    }
    meetingTimes.sort(
      (a: MeetingTime, b: MeetingTime) => a.startAsNum() - b.startAsNum()
    );

    let startTimes: string[] = [];
    for (let m of meetingTimes) {
      if (!startTimes.includes(m.startTime)) {
        startTimes.push(m.startTime);
      }
    }
    return startTimes;
  }

  /**
   * Check if a section has a meeting start time at a certain time on a certain day
   *
   * @param c class object to check
   * @param startTime start time to check class against
   * @param dayOfWeek day of week to check class against
   */
  hasMeetingAtTime(c: Class, startTime: string, dayOfWeek: string) {
    for (let m of c.meetingTimes) {
      if (
        m.startTime == startTime &&
        m.weekCode.split('').includes(this.weekdayToCode(dayOfWeek))
      )
        return true;
    }
    return false;
  }

  /**
   * Convert a weekday to its code. This is a stupid method to have.
   *
   * @param weekday
   */
  weekdayToCode(weekday: string): string {
    if (weekday === 'Thursday') {
      return 'R';
    } else {
      return weekday[0];
    }
  }
}
