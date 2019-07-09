export class MeetingTime {
  constructor(
    public startTime: string,
    public endTime: string,
    public weekCode: string
  ) {}

  /**
   * Returns the start time of a meeting as a number
   */
  public startAsNum(): number {
    return this.parseTimeToNum(this.startTime);
  }

  /**
   * Returns the end time of a meeting as a number
   */
  public endAsNum(): number {
    return this.parseTimeToNum(this.endTime);
  }

  /**
   * Parses a string of a time, converts to 24 hour time, and returns
   * number representing concatination of hour and minute
   *
   * @param time Time in format HH:MM *M
   */
  private parseTimeToNum(time: string) {
    // Parse time using regex
    var t = time.match(/([0-9]+):([0-9]+) (AM|PM)/);
    var hour = parseInt(t[1]);
    var min = t[2];
    var tod = t[3];

    // Convert hour from 12 hour to 24
    if (tod == 'PM') {
      if (hour != 12) hour = hour + 12;
    }

    // Return number value of string
    return parseInt(hour + '' + min);
  }
}
