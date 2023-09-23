import { Button, Modal } from 'antd';
import { renderExtra } from './ReservationCard';
import { ReservationStatus } from '../../interfaces/reservation.status';
import { Dispatch, SetStateAction } from 'react';

interface Data {
  status: ReservationStatus;
  userName: string;
  reservationDate: string | undefined | null;
  extras?: any;
}

interface Props {
  data: Data;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
  loading: boolean;
  handleReservationUpdateState: (status: ReservationStatus) => void;
}

export const BusinessModal = (props: Props) => {
  return (
    <Modal
      footer={null}
      open={props.isModalVisible}
      onOk={(e: any) => {
        e.stopPropagation();
        props.setIsModalVisible(false);
      }}
      onCancel={(e: any) => {
        e.stopPropagation();
        props.setIsModalVisible(false);
      }}
    >
      {props.data.reservationDate ? (
        <>
          <p>
            Fecha:{' '}
            {new Date(props.data.reservationDate).toLocaleDateString('es-ES')}
          </p>
          <p>
            Hora:{' '}
            {new Date(props.data.reservationDate).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </>
      ) : (
        <h1>No hay fecha de reserva ERROR</h1>
      )}
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
        {props.data.status === ReservationStatus.Pending && (
          <>
            <Button
              loading={props.loading}
              type="primary"
              onClick={() => {
                props.handleReservationUpdateState(ReservationStatus.Confirmed);
              }}
            >
              Aceptar
            </Button>
            <Button
              loading={props.loading}
              type="primary"
              danger
              onClick={() => {
                props.handleReservationUpdateState(ReservationStatus.Rejected);
              }}
            >
              Rechazar
            </Button>
          </>
        )}
        {props.data.status === ReservationStatus.Confirmed && (
          <>
            <Button
              loading={props.loading}
              type="primary"
              style={{ margin: '10px' }}
              onClick={() => {
                props.handleReservationUpdateState(ReservationStatus.Realized);
              }}
            >
              Confirmar Asistencia
            </Button>
            <Button
              loading={props.loading}
              type="primary"
              danger
              onClick={() => {
                props.handleReservationUpdateState(ReservationStatus.Rejected);
              }}
            >
              Rechazar
            </Button>
            <Button
              loading={props.loading}
              onClick={() => {
                props.handleReservationUpdateState(
                  ReservationStatus.NotAttended,
                );
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
