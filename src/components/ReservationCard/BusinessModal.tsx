import { Button, Modal } from 'antd';
import { renderExtra } from './ReservationCard';
import { ReservationStatus } from '../../interfaces/reservation.status';

export const BusinessModal = ({
  ticket,
  handleReservationUpdateState,
  isModalVisible,
  setIsModalVisible,
  loading,
}) => {
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
              loading={loading}
              type="primary"
              onClick={() => {
                handleReservationUpdateState(ReservationStatus.Confirmed);
              }}
            >
              Aceptar
            </Button>
            <Button
              loading={loading}
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
              loading={loading}
              type="primary"
              style={{ margin: '10px' }}
              onClick={() => {
                handleReservationUpdateState(ReservationStatus.Realized);
              }}
            >
              Confirmar Asistencia
            </Button>
            <Button
              loading={loading}
              type="primary"
              danger
              onClick={() => {
                handleReservationUpdateState(ReservationStatus.Rejected);
              }}
            >
              Rechazar
            </Button>
            <Button
              loading={loading}
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
