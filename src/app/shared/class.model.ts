import { MeetingTime } from './meeting-time.model';

// Model for class object
export class Class {
  public inCart: boolean;
  constructor(
    public name: string,
    public crn: number,
    public professor: string,
    public meetingTimes: MeetingTime[],
    public location: string,
    public subject: string,
    public level: number,
    public color: string = ''
  ) {
    this.inCart = false;
  }
}
