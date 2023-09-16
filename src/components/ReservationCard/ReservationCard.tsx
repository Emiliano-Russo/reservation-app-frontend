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

export const ReservationCard = (ticket: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const statusStyle = getStatusColor(ticket.status);

  const handleReservationCancel = () => {
    // Aquí puedes implementar la lógica para cancelar la reserva
    setLoading(true);
    reservationService
      .updateReservation(ticket.id, { status: 'Cancelled' })
      .then(() => {
        ticket.onCancel(ticket.id);
        message.success('Reserva Cancelada!');
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
                {ticket.isBusiness ? 'Rechazar' : 'Cancelar Reserva'}
              </Button>
              <Button
                style={{
                  display:
                    ticket.status === ReservationStatus.Pending
                      ? 'inherit'
                      : 'none',
                }}
              >
                Aceptar Reserva
              </Button>
              <Button
                style={{
                  background: '#52c41a',
                  color: 'white',
                  display:
                    ticket.status === ReservationStatus.Confirmed
                      ? 'inherit'
                      : 'none',
                }}
              >
                Confirmar Asistencia
              </Button>
            </div>
          ),
        ]}
      >
        {/* Aquí puedes agregar más detalles del ticket si es necesario */}
        <p>
          Reserva para:{' '}
          {ticket.isBusiness ? ticket.userName : ticket.businessName}
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
      </Modal>
    </AnimatedFromLeft>
  );
};
