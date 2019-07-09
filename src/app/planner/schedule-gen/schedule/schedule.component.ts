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

  @Input() classes: Class[];
  allStartTimes: string[];
  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  dayToCode = {
    Monday: 'M',
    Tuesday: 'T',
    Wednesday: 'W',
    Thursday: 'R',
    Friday: 'F'
  };

  ngOnInit() {
    this.allStartTimes = this.getAllStartTimes();
  }

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

  weekdayToCode(weekday: string): string {
    if (weekday == 'Thursday') {
      return 'R';
    } else {
      return weekday[0];
    }
  }
}
