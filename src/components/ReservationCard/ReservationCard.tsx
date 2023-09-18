import { useEffect, useState } from 'react';
import {
  ReservationStatus,
  translateStatus,
} from '../../interfaces/reservation.status';
import styles from './ReservationCard.module.css';
import { Modal, Button, message } from 'antd';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';
import { REACT_APP_BASE_URL } from '../../../env';
import { ReservationService } from '../../services/reservation.service';

interface Props {
  id: string;
  userName: string;
  businessName: string;
  reservationDate: Date;
  status: ReservationStatus;
  extras: any;
  index: number;
  onCancel: any;
  isBusiness: boolean;
}

const getStatusColor = (status: ReservationStatus) => {
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

const reservationService = new ReservationService(REACT_APP_BASE_URL);

const renderExtra = (extra) => {
  if (extra.labelFirst) {
    return `${extra.label} ${extra.value}`;
  } else {
    return `${extra.value} ${extra.label}`;
  }
};

const BusinessModal = ({
  ticket,
  handleReservationUpdateState,
  isModalVisible,
  setIsModalVisible,
}) => {
  console.log('rendering business modal');
  if (isModalVisible) console.log('IS VISIBLE');
  else console.log('IS NOT VISIblE');

  return (
    <Modal
      footer={null}
      open={isModalVisible}
      onOk={(e: any) => {
        e.stopPropagation();
        setIsModalVisible(false);
      }}
      onCancel={(e: any) => {
        e.stopPropagation();
        setIsModalVisible(false);
      }}
    >
      <p>
        Reserva para <strong>{ticket.userName}</strong>
      </p>
      <p>
        Fecha: {new Date(ticket.reservationDate).toLocaleDateString('es-ES')}
      </p>
      <p>
        Hora:{' '}
        {new Date(ticket.reservationDate).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      {ticket.extras &&
        ticket.extras.map((extra) => (
          <p key={extra.label}>{renderExtra(extra)}</p>
        ))}
      <br></br>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {ticket.status === ReservationStatus.Pending && (
          <>
            <Button
              type="primary"
              onClick={() => {
                handleReservationUpdateState(ReservationStatus.Confirmed);
              }}
            >
              Aceptar
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                handleReservationUpdateState(ReservationStatus.Rejected);
              }}
            >
              Rechazar
            </Button>
          </>
        )}
        {ticket.status === ReservationStatus.Confirmed && (
          <>
            <Button
              type="primary"
              style={{ margin: '10px' }}
              onClick={() => {
                handleReservationUpdateState(ReservationStatus.Realized);
              }}
            >
              Confirmar Asistencia
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                handleReservationUpdateState(ReservationStatus.Rejected);
              }}
            >
              Rechazar
            </Button>
            <Button
              onClick={() => {
                handleReservationUpdateState(ReservationStatus.NotAttended);
              }}
            >
              No Asistió
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

const UserModal = ({
  ticket,
  setIsModalVisible,
  isModalVisible,
  loading,
  handleReservationCancel,
}) => {
  console.log('rendering user modal');
  return (
    <>
      <Modal
        title="Detalles de la Reserva"
        open={isModalVisible}
        onOk={(e: any) => {
          e.stopPropagation();
          setIsModalVisible(false);
        }}
        onCancel={(e: any) => {
          e.stopPropagation();
          setIsModalVisible(false);
        }}
        footer={[
          (ticket.status === ReservationStatus.Pending ||
            ticket.status === ReservationStatus.Confirmed) && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Button
                loading={loading}
                key="submit"
                type="primary"
                danger
                onClick={handleReservationCancel}
              >
                Cancelar Reserva
              </Button>
            </div>
          ),
        ]}
      >
        <p>Reserva para: {ticket.businessName}</p>
        <p>
          Fecha: {new Date(ticket.reservationDate).toLocaleDateString('es-ES')}
        </p>
        <p>
          Hora:{' '}
          {new Date(ticket.reservationDate).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        {ticket.extras &&
          ticket.extras.map((extra) => (
            <p key={extra.label}>{renderExtra(extra)}</p>
          ))}
      </Modal>
    </>
  );
};

export const ReservationCard = (ticket: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const statusStyle = getStatusColor(ticket.status);

  const handleReservationUpdateState = (status: ReservationStatus) => {
    setLoading(true);
    reservationService
      .updateReservation(ticket.id, { status: status })
      .then(() => {
        ticket.onCancel(ticket.id);
      })
      .catch((err) => {
        console.log('error');
      })
      .finally(() => {
        setLoading(false);
      });
    setIsModalVisible(false);
  };

  return (
    <AnimatedFromLeft
      key={ticket.id}
      className={styles.card}
      onClick={() => {
        console.log('setting modal visible!');
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
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          ticket={ticket}
          handleReservationUpdateState={handleReservationUpdateState}
        />
      ) : (
        <UserModal
          handleReservationCancel={handleReservationUpdateState}
          isModalVisible={isModalVisible}
          loading={loading}
          setIsModalVisible={setIsModalVisible}
          ticket={ticket}
        />
      )}
    </AnimatedFromLeft>
  );
};
