import { useState } from 'react';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';
import {
  AcceptStatus,
  IReservation,
  translateForUserAcceptStatus,
} from '../../interfaces/reservation.interface';
import styles from '../ReservationCard/ReservationCard.module.css';
import { Modal, message } from 'antd';
import { ReservationService } from '../../services/reservation.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { UserFooter } from './UserFooter';
import { BusinessFooter } from './BusinessFooter';
import { BasicInfo } from './BasicInfo';
import { ReservationStatus } from '../../interfaces/reservation.status';

interface Props {
  reservation: IReservation;
  index: number;
  isBusiness: boolean;
  setReservations: React.Dispatch<React.SetStateAction<IReservation[]>>;
}

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export const NegotiableCard = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const responseBusinessProposal = (status: AcceptStatus) => {
    setIsLoading(true);
    reservationService
      .userResponseProposedSchedule(props.reservation.id, status)
      .then((data) => {
        if (status === AcceptStatus.Accepted) {
          message.success('Reserva Confirmada!');
          props.setReservations((prev: IReservation[]) => {
            const clonedPrev = [...prev];
            const indexRes = clonedPrev.findIndex(
              (item) => item.id == props.reservation.id,
            );
            const date =
              clonedPrev[indexRes].negotiable?.businessProposedSchedule;
            if (!date) return prev;
            clonedPrev[indexRes].reservationDate = new Date(date);
            clonedPrev[indexRes].negotiable = undefined;
            clonedPrev[indexRes].status = ReservationStatus.Confirmed;
            return clonedPrev;
          });
        } else {
          message.info('Fecha No Aceptada');
          props.setReservations((prev: IReservation[]) => {
            const clonedPrev = [...prev];
            const indexRes = clonedPrev.findIndex(
              (item) => item.id == props.reservation.id,
            );
            const item = clonedPrev[indexRes];
            if (item.negotiable) {
              item.negotiable.acceptedBusinessProposed =
                AcceptStatus.NotAccepted;
            }
            clonedPrev[indexRes] = item;
            return clonedPrev;
          });
        }
      })
      .catch(() => {
        message.error('Error!');
      })
      .finally(() => {
        setIsModalVisible(false);
      });
  };

  if (!props.reservation.negotiable) return <div>Error</div>;

  return (
    <AnimatedFromLeft
      key={props.reservation.id}
      className={styles.card}
      onClick={() => {
        setIsModalVisible(true);
      }}
      delay={props.index * 0.1}
    >
      <div style={{ background: '#efdbff' }} className={styles.header}>
        <span className={styles.name}>
          {props.isBusiness
            ? props.reservation.user.name
            : props.reservation.business.name}
        </span>
        <span className={styles.dateTime}>Flexible</span>
      </div>
      <div className={styles.content}>
        <p style={{ fontSize: '13px' }}>
          {translateForUserAcceptStatus(
            props.reservation.negotiable.acceptedBusinessProposed,
          )}
        </p>
      </div>
      <Modal
        footer={null}
        open={isModalVisible}
        onOk={(e) => {
          e.stopPropagation();
          setIsModalVisible(false);
        }}
        onCancel={(e) => {
          e.stopPropagation();
          setIsModalVisible(false);
        }}
      >
        <BasicInfo props={props} />
        {/* SEPARAMOS LA LOGICA empezamos suponiendo que es usuario*/}
        <br></br>
        {props.isBusiness ? (
          <BusinessFooter
            {...props}
            setIsModalVisible={setIsModalVisible}
            setReservations={props.setReservations}
          />
        ) : (
          <UserFooter
            loading={loading}
            props={props}
            responseBusinessProposal={responseBusinessProposal}
          />
        )}
      </Modal>
    </AnimatedFromLeft>
  );
};
