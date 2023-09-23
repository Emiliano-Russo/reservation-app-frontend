import { Button, Modal } from 'antd';
import { ReservationStatus } from '../../interfaces/reservation.status';
import { renderExtra } from './ReservationCard';
import { Dispatch, SetStateAction } from 'react';

interface Data {
  status: ReservationStatus;
  businessName: string;
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

export const UserModal = (props: Props) => {
  return (
    <>
      <Modal
        title="Detalles de la Reserva"
        open={props.isModalVisible}
        onOk={(e: any) => {
          e.stopPropagation();
          props.setIsModalVisible(false);
        }}
        onCancel={(e: any) => {
          e.stopPropagation();
          props.setIsModalVisible(false);
        }}
        footer={[
          (props.data.status === ReservationStatus.Pending ||
            props.data.status === ReservationStatus.Confirmed) && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Button
                loading={props.loading}
                key="submit"
                type="primary"
                danger
                onClick={() =>
                  props.handleReservationUpdateState(
                    ReservationStatus.Cancelled,
                  )
                }
              >
                Cancelar Reserva
              </Button>
            </div>
          ),
        ]}
      >
        <h5>{props.data.businessName}</h5>
        {props.data.reservationDate ? (
          <>
            <p>
              Fecha:{' '}
              {new Date(props.data.reservationDate).toLocaleDateString('es-ES')}
            </p>
            <p>
              Hora:{' '}
              {new Date(props.data.reservationDate).toLocaleTimeString(
                'es-ES',
                {
                  hour: '2-digit',
                  minute: '2-digit',
                },
              )}
            </p>
          </>
        ) : (
          <h1>No hay fecha de reserva ERROR</h1>
        )}

        {props.data.extras &&
          props.data.extras.map((extra) => (
            <p key={extra.label}>{renderExtra(extra)}</p>
          ))}
      </Modal>
    </>
  );
};
