import { useEffect, useState } from 'react';
import {
  ReservationStatus,
  translateStatus,
} from '../../interfaces/reservation.status';
import styles from './ReservationCard.module.css';
import { Modal, Button } from 'antd';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  businessName: string;
  reservationDate: Date;
  status: ReservationStatus;
  extras: any;
  index: number;
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

const renderExtra = (extra) => {
  if (extra.labelFirst) {
    return `${extra.label} ${extra.value}`;
  } else {
    return `${extra.value} ${extra.label}`;
  }
};

export const ReservationCard = (ticket: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const statusStyle = getStatusColor(ticket.status);

  const handleReservationCancel = () => {
    // Aquí puedes implementar la lógica para cancelar la reserva
    setIsModalVisible(false);
  };

  return (
    <motion.div
      initial={{ x: -400, opacity: 0, scale: 0.8 }} // Configuración inicial: movido hacia la izquierda, casi invisible y ligeramente reducido
      animate={{ x: 0, opacity: 1, scale: 1 }} // Configuración final: posición original, completamente visible y a tamaño original
      transition={{ ease: 'easeOut', duration: 0.8, delay: ticket.index * 0.1 }} // Retraso basado en el id para dar un efecto en cascada
      key={ticket.id}
      className={styles.card}
      onClick={() => {
        console.log('setting true');
        setIsModalVisible(true);
      }}
    >
      <div className={styles.header}>
        <span className={styles.name}>{ticket.businessName}</span>
        <span className={styles.dateTime}>
          <span className={styles.date}>
            {ticket.reservationDate.toLocaleDateString('es-ES')}
          </span>
          <span className={styles.time}>
            {ticket.reservationDate.toLocaleTimeString('es-ES', {
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
          <Button
            key="cancel"
            onClick={(e: any) => {
              console.log('estoy cancelando');
              e.stopPropagation();
              setIsModalVisible(false);
            }}
          >
            Cerrar
          </Button>,
          (ticket.status === ReservationStatus.Pending ||
            ticket.status === ReservationStatus.Confirmed) && (
            <Button
              key="submit"
              type="primary"
              danger
              onClick={handleReservationCancel}
            >
              Cancelar Reserva
            </Button>
          ),
        ]}
      >
        {/* Aquí puedes agregar más detalles del ticket si es necesario */}
        <p>Reserva para: {ticket.businessName}</p>
        <p>Fecha: {ticket.reservationDate.toLocaleDateString('es-ES')}</p>
        <p>
          Hora:{' '}
          {ticket.reservationDate.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        {ticket.extras &&
          ticket.extras.map((extra) => (
            <p key={extra.label}>{renderExtra(extra)}</p>
          ))}
      </Modal>
    </motion.div>
  );
};
