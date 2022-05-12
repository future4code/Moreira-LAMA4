import { WEEK_DAY } from "../ENUM/WEEK_DAY";

export type concertInputDTO = {
  day: WEEK_DAY;
  startTime: number;
  endTime: number;
  bandId: string;
};
