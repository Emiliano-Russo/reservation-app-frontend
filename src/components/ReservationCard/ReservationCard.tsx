import { ReservationStatus } from '../../interfaces/reservation.status';
import styles from './ReservationCard.module.css';

interface Props {
  name: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
}

export const ReservationCard = (ticket: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{ticket.name}</span>
        <span className={styles.dateTime}>
          <span className={styles.date}>
            {new Date(ticket.date).toLocaleDateString('es-ES')}
          </span>
          <span className={styles.time}>{ticket.time}</span>
        </span>
      </div>
      <div className={styles.content}>
        <span className={styles.guests}>{ticket.guests} Invitados</span>
        <span className={styles.status}>{ticket.status}</span>
      </div>
    </div>
  );
};
