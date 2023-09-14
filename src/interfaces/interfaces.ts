export enum WeekDays {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

export function mapDayToEnglish(dayInSpanish: string): WeekDays {
  switch (dayInSpanish) {
    case 'Domingo':
      return WeekDays.Sunday;
    case 'Lunes':
      return WeekDays.Monday;
    case 'Martes':
      return WeekDays.Tuesday;
    case 'Miércoles':
      return WeekDays.Wednesday;
    case 'Jueves':
      return WeekDays.Thursday;
    case 'Viernes':
      return WeekDays.Friday;
    case 'Sábado':
      return WeekDays.Saturday;
    default:
      throw new Error(`Day ${dayInSpanish} not recognized`);
  }
}

export interface IShift {
  openingTime: String;
  closingTime: String;
}

export interface IAvailability {
  day: WeekDays;
  shifts: Array<IShift>;
  open: Boolean;
}
