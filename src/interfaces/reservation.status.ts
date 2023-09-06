export enum ReservationStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Realized = 'Realized',
  Cancelled = 'Cancelled',
  Rejected = 'Rejected',
  NotAttended = 'NotAttended',
}

export const translateStatus = (status: ReservationStatus): string => {
  switch (status) {
    case ReservationStatus.Pending:
      return 'Pendiente';
    case ReservationStatus.Confirmed:
      return 'Confirmado';
    case ReservationStatus.Realized:
      return 'Realizado';
    case ReservationStatus.Cancelled:
      return 'Cancelado';
    case ReservationStatus.Rejected:
      return 'Rechazado';
    case ReservationStatus.NotAttended:
      return 'Ausente';
    default:
      return 'Desconocido';
  }
};
