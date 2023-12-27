import { Button, Input, Modal } from 'antd';
import { renderExtra } from './ReservationCard';
import { ReservationStatus } from '../../interfaces/reservation.status';
import { Dispatch, SetStateAction, useState } from 'react';

interface Data {
  status: ReservationStatus;
  userName: string;
  reservationDate: string | undefined | null;
  extras?: any;
  bookingInstructions: string | undefined;
}

interface Props {
  data: Data;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
  loading: boolean;
  handleReservationUpdateState: (
    status: ReservationStatus,
    rejectionReason?: string,
  ) => void;
}

export const BusinessModal = (props: Props) => {
  const [isRejected, setIsRejected] = useState(false);
  const [comment, setComment] = useState('');

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
      <p>
        Reserva para: <strong>{props.data.userName}</strong>
      </p>
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
      <p>{props.data.bookingInstructions}</p>
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
            {isRejected && (
              <>
                <Input
                  style={{ marginTop: '10px', marginBottom: '20px' }}
                  placeholder="Lamentamos haber cancelado su reserva"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  loading={props.loading}
                  type="primary"
                  danger
                  onClick={() => {
                    setIsRejected(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  loading={props.loading}
                  type="primary"
                  onClick={() => {
                    props.handleReservationUpdateState(
                      ReservationStatus.Rejected,
                      comment,
                    );
                  }}
                >
                  Enviar
                </Button>
              </>
            )}
            {!isRejected && (
              <>
                <Button
                  loading={props.loading}
                  type="primary"
                  onClick={() => {
                    props.handleReservationUpdateState(
                      ReservationStatus.Confirmed,
                    );
                  }}
                >
                  Aceptar
                </Button>
                <Button
                  loading={props.loading}
                  type="primary"
                  danger
                  onClick={() => {
                    setIsRejected(true);
                  }}
                >
                  Rechazar
                </Button>
                )
              </>
            )}
          </>
        )}
        {props.data.status === ReservationStatus.Confirmed && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <Button
              loading={props.loading}
              type="primary"
              onClick={() =>
                props.handleReservationUpdateState(ReservationStatus.Realized)
              }
            >
              Confimar Asistencia
            </Button>

            <Button
              loading={props.loading}
              onClick={() =>
                props.handleReservationUpdateState(
                  ReservationStatus.NotAttended,
                )
              }
            >
              No Asistió
            </Button>

            <Button
              loading={props.loading}
              type="primary"
              danger
              onClick={() => setIsRejected(true)}
            >
              Rechazar Reserva
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
