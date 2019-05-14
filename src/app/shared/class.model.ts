import { MeetingTime } from "./meeting-time.model";
export class Class {
  public inCart: boolean;
  constructor(
    public name: string,
    public crn: number,
    public professor: string,
    public meetingTimes: MeetingTime[],
    public location: string,
    public subject: string
  ) {
    this.inCart = false;
  }
}
