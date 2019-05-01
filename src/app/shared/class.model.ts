export class Class {
  public inCart: boolean;
  public posInCart: number;
  constructor(
    public name: string,
    public crn: number,
    public professor: string,
    public startTime: string,
    public endTime: string,
    public location: string,
    public subject: string,
    public weekCode: string
  ) {
    this.inCart = false;
  }
}
