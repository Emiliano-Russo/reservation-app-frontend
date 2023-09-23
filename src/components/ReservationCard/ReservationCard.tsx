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
  reservation: IReservation;
  index: number;
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
  console.log('ticket props: ', ticket);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const statusStyle = getStatusColor(ticket.reservation.status);

  const handleReservationUpdateState = (status: ReservationStatus) => {
    setLoading(true);
    reservationService
      .updateReservation(ticket.reservation.id, { status: status })
      .then(() => {
        ticket.changeStatusReservation(ticket.reservation.id, status);
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
      key={ticket.reservation.id}
      className={styles.card}
      onClick={() => {
        setIsModalVisible(true);
      }}
      delay={ticket.index * 0.1}
    >
      <div className={styles.header}>
        <span className={styles.name}>
          {ticket.isBusiness
            ? ticket.reservation.user.name
            : ticket.reservation.business.name}
        </span>
        <span className={styles.dateTime}>
          <span className={styles.date}>
            {new Date(ticket.reservation.reservationDate!).toLocaleDateString(
              'es-ES',
            )}
          </span>
          <span className={styles.time}>
            {new Date(ticket.reservation.reservationDate!).toLocaleTimeString(
              'es-ES',
              {
                hour: '2-digit',
                minute: '2-digit',
              },
            )}
          </span>
        </span>
      </div>
      <div className={styles.content}>
        <span className={styles.details}>
          {/* {ticket.reservation.extras && ticket.extras.length > 0
            ? renderExtra(ticket.extras[0])
            : null} */}
        </span>
        <span className={styles.status} style={statusStyle}>
          {translateStatus(ticket.reservation.status)}
        </span>
      </div>
      {ticket.isBusiness ? (
        <BusinessModal
          loading={loading}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          data={{
            userName: ticket.reservation.user.name,
            reservationDate: ticket.reservation.reservationDate?.toString(),
            status: ticket.reservation.status,
            civilIdDoc: ticket.reservation.user.civilIdDoc,
          }}
          handleReservationUpdateState={handleReservationUpdateState}
        />
      ) : (
        <UserModal
          handleReservationUpdateState={handleReservationUpdateState}
          isModalVisible={isModalVisible}
          loading={loading}
          setIsModalVisible={setIsModalVisible}
          data={{
            businessName: ticket.reservation.business.name,
            reservationDate: ticket.reservation.reservationDate?.toString(),
            status: ticket.reservation.status,
          }}
        />
      )}
    </AnimatedFromLeft>
  );
};
