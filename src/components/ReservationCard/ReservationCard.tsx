import { Dispatch, SetStateAction, useState } from 'react';
import {
  ReservationStatus,
  getStatusColor,
  translateStatus,
} from '../../interfaces/reservation.status';
import styles from './ReservationCard.module.css';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';
import { REACT_APP_BASE_URL } from '../../../env';
import { ReservationService } from '../../services/reservation.service';
import { BusinessModal } from './BusinessModal';
import { UserModal } from './UserModal';
import { IReservation } from '../../interfaces/reservation.interface';
import { message } from 'antd';

interface Props {
  id: string;
  userName: string;
  businessName: string;
  reservationDate: Date;
  status: ReservationStatus;
  extras: any;
  index: number;
  createdAt: number;
  changeStatusReservation: (
    reservationId: string,
    status: ReservationStatus,
  ) => void;
  isBusiness: boolean;
}

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export const renderExtra = (extra) => {
  if (extra.labelFirst) {
    return `${extra.label} ${extra.value}`;
  } else {
    return `${extra.value} ${extra.label}`;
  }
};

export const ReservationCard = (ticket: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const statusStyle = getStatusColor(ticket.status);

  const handleReservationUpdateState = (status: ReservationStatus) => {
    console.log('handleReservationUpdateState!', status);
    setLoading(true);
    reservationService
      .updateReservation(ticket.id, ticket.createdAt, { status: status })
      .then(() => {
        console.log('## Change status reservation...', status);
        ticket.changeStatusReservation(ticket.id, status);
      })
      .catch((err) => {
        message.error('Error');
        console.log('error', err);
      })
      .finally(() => {
        setLoading(false);
        setIsModalVisible(false);
      });
  };

  return (
    <AnimatedFromLeft
      key={ticket.id}
      className={styles.card}
      onClick={() => {
        setIsModalVisible(true);
      }}
      delay={ticket.index * 0.1}
    >
      <div className={styles.header}>
        <span className={styles.name}>
          {ticket.isBusiness ? ticket.userName : ticket.businessName}
        </span>
        <span className={styles.dateTime}>
          <span className={styles.date}>
            {new Date(ticket.reservationDate).toLocaleDateString('es-ES')}
          </span>
          <span className={styles.time}>
            {new Date(ticket.reservationDate).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </span>
      </div>
      <div className={styles.content}>
        <span className={styles.details}>
          {ticket.extras && ticket.extras.length > 0
            ? renderExtra(ticket.extras[0])
            : null}
        </span>
        <span className={styles.status} style={statusStyle}>
          {translateStatus(ticket.status)}
        </span>
      </div>
      {ticket.isBusiness ? (
        <BusinessModal
          loading={loading}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          ticket={ticket}
          handleReservationUpdateState={handleReservationUpdateState}
        />
      ) : (
        <UserModal
          handleReservationUpdateState={handleReservationUpdateState}
          isModalVisible={isModalVisible}
          loading={loading}
          setIsModalVisible={setIsModalVisible}
          ticket={ticket}
        />
      )}
    </AnimatedFromLeft>
  );
};
