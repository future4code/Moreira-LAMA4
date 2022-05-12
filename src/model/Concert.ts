import { WEEK_DAY } from "../types/ENUM/WEEK_DAY";

export class Concert {
  constructor(
    private id: string,
    private day: WEEK_DAY,
    private startTime: number,
    private endTime: number,
    private bandId: string
  ) {}

  public getId = () => {
    return this.id;
  };
  public getDay = () => {
    return this.day;
  };
  public getStartTime = () => {
    return this.startTime;
  };
  public getEndTime = () => {
    return this.endTime;
  };
  public getBandId = () => {
    return this.bandId;
  };
}
