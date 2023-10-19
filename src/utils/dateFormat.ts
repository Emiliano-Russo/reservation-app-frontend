import { WeekDays } from '../interfaces/weekday.enum';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} • ${hours}:${minutes}`;
};

export const formatOnlyDate = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const convertTo24Hour = (timeStr: string) => {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  }

  if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

export const convertToJSDate = (timeStr: string) => {
  const { hours, minutes } = convertTo24Hour(timeStr);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export function weekDayToSpanish(day: WeekDays): string {
  switch (day) {
    case WeekDays.Sunday:
      return 'Domingo';
    case WeekDays.Monday:
      return 'Lunes';
    case WeekDays.Tuesday:
      return 'Martes';
    case WeekDays.Wednesday:
      return 'Miércoles';
    case WeekDays.Thursday:
      return 'Jueves';
    case WeekDays.Friday:
      return 'Viernes';
    case WeekDays.Saturday:
      return 'Sábado';
    default:
      return ''; // O puedes lanzar un error si prefieres
  }
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

export function getDayValue(day: WeekDays): number {
  switch (day) {
    case WeekDays.Monday:
      return 1;
    case WeekDays.Tuesday:
      return 2;
    case WeekDays.Wednesday:
      return 3;
    case WeekDays.Thursday:
      return 4;
    case WeekDays.Friday:
      return 5;
    case WeekDays.Saturday:
      return 6;
    case WeekDays.Sunday:
      return 7;
    default:
      return 0;
  }
}
