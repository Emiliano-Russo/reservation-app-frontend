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

export const getStatusColor = (status: ReservationStatus) => {
  let bgColor: string;
  switch (status) {
    case ReservationStatus.Pending:
      bgColor = '#faad14'; // Amarillo brillante
      break;
    case ReservationStatus.Confirmed:
      bgColor = '#a0d911'; // Verde brillante
      break;
    case ReservationStatus.Realized:
      bgColor = '#1677ff'; // Azul brillante
      break;
    case ReservationStatus.Cancelled:
      bgColor = '#f5222d'; // Rojo brillante
      break;
    case ReservationStatus.Rejected:
      bgColor = '#E91E63'; // Rosa brillante
      break;
    case ReservationStatus.NotAttended:
      bgColor = '#9C27B0'; // Púrpura brillante
      break;
    default:
      bgColor = '#4CAF50';
  }

  const textColor = 'white';

  return {
    background: bgColor,
    color: textColor,
  };
};
