import { IBusiness } from './business/business.interface';
import { ReservationStatus } from './reservation.status';
import { IUser } from './user.interface';

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
  user: IUser; // Asumiendo que tienes una interfaz IUser para el modelo User
  business: IBusiness; // Asumiendo que tienes una interfaz IBusiness para el modelo Business
  reservationDate?: Date | null;
  rating?: number;
  comment?: string;
  status: ReservationStatus; // Asumiendo que tienes un enum o tipo ReservationStatus
  negotiable?: INegotiable | null; // Asumiendo que tienes una interfaz INegotiable para el modelo Negotiable
  createdAt: Date;
}
