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

export interface IReservation {
  id: string;
  user: IUser;
  business: IBusiness;
  reservationDate: Date | null;
  rating: number;
  comment: string;
  status: ReservationStatus;
  negotiable: INegotiable | null | undefined;
  createdAt: Date;
}

export enum AcceptStatus {
  Unanswered = 'Unanswered',
  Accepted = 'Accepted',
  NotAccepted = 'NotAccepted',
}

export function translateForUserAcceptStatus(
  status: AcceptStatus | undefined,
): string {
  switch (status) {
    case AcceptStatus.Unanswered:
      return 'Esperando respuesta del usuario';
    case AcceptStatus.Accepted:
      return 'Aceptado';
    case AcceptStatus.NotAccepted:
      return 'No aceptado, esperando otra propuesta del negocio';
    default:
      return 'Aguardando confirmación del negocio';
  }
}
