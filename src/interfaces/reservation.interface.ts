import { ReservationStatus } from './reservation.status';

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

export enum AcceptStatus {
  Unanswered = 'Unanswered',
  Accepted = 'Accepted',
  NotAccepted = 'NotAccepted',
}

export interface Range {
  start: Date;
  end?: Date;
}

export interface INegotiable {
  dateRange: Range;
  timeRange: Range;
  businessProposedSchedule?: string;
  acceptedBusinessProposed?: AcceptStatus;
}

export interface IExtra {
  label: string;
  value: string;
  labelFirst: boolean;
}

export interface IReservation {
  id: string;
  userId: string;
  businessId: string;
  businessName: string;
  userName: string;
  rating: number;
  comment: string;
  reservationDate?: Date;
  status: ReservationStatus;
  extras?: IExtra[];
  negotiable?: INegotiable;
  createdAt?: Date;
}
