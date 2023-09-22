import { IShift, WeekDays } from '../interfaces';

export enum BusinessStatus {
  Pending = 'Pending',
  Operating = 'Operating',
  Closed = 'Closed',
}

export interface IMap {
  id: string;
  pointX: string;
  pointY: string;
}

export interface iShift {
  id: string;
  openingTime: string;
  closingTime: string;
}

export interface IAvailability {
  id: string;
  day: WeekDays;
  shifts: IShift[];
  open: boolean;
}

export interface IBusiness {
  id: string;
  ownerId: string;
  typeId: string;
  name: string;
  country: string;
  department: string;
  address: string;
  coordinates: IMap;
  logoURL?: string;
  banner: string;
  description?: string;
  status: BusinessStatus;
  totalRatingSum: number;
  totalRatingsCount: number;
  averageRating: number;
  availability: IAvailability[];
}
