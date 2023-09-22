import { IBusiness } from '../business/business.interface';
import { IUser } from '../user/user.interface';
import { INegotiable } from './negotiable.interace';

export enum ReservationStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Realized = 'Realized',
  Cancelled = 'Cancelled',
  Rejected = 'Rejected',
  NotAttended = 'NotAttended',
}

export interface Reservation {
  id: string;
  user: IUser;
  business: IBusiness;
  reservationDate: Date | null;
  rating: number;
  comment: string;
  status: ReservationStatus;
  negotiable: INegotiable | null;
  createdAt: Date;
}
