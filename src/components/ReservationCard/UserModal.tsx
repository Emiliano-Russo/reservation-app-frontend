import { Button, Modal } from 'antd';
import { ReservationStatus } from '../../interfaces/reservation.status';
import { renderExtra } from './ReservationCard';

export const UserModal = ({
  ticket,
  setIsModalVisible,
  isModalVisible,
  loading,
  handleReservationUpdateState,
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
                onClick={() =>
                  handleReservationUpdateState(ReservationStatus.Cancelled)
                }
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
