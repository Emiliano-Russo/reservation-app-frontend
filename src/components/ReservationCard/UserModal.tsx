import { Button, Input, Modal, Rate } from 'antd';
import { ReservationStatus } from '../../interfaces/reservation.status';
import { renderExtra } from './ReservationCard';
import { Dispatch, SetStateAction, useState } from 'react';
import LoyaltyPointsBadge from '../LoyaltyPointsBadge/LoyaltyPointsBadge';
import { FadeFromTop } from '../../animations/FadeFromTop';

interface Data {
  status: ReservationStatus;
  businessName: string;
  reservationDate: string | undefined | null;
  extras?: any;
  alreadyRated: boolean;
  bookingInstructions: string | undefined;
  rejectionReason: string | undefined | null;
}

interface Props {
  data: Data;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
  loading: boolean;
  handleReservationUpdateState: (status: ReservationStatus) => void;
  onSendStars: (amount: number, comment: string) => void;
}

export const UserModal = (props: Props) => {
  const [stars, setStars] = useState(1);
  const [comment, setComment] = useState('');

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
                    ReservationStatus.Cancelled
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
        )}{' '}
        <p>
          <p>{props.data.bookingInstructions}</p>
          {(props.data.rejectionReason != null || props.data.rejectionReason != undefined)
            &&
            <>
              <h3>Motivo de cancelacion</h3>
              <p>{props.data.rejectionReason}</p>
            </>}

        </p>
        <br></br>
        {props.data.status == ReservationStatus.Realized &&
          !props.data.alreadyRated && (
            <>
              <FadeFromTop>
                <div style={{ display: 'flex' }}>
                  <p>Califica tu Experiencia</p>

                  <LoyaltyPointsBadge points={5} />
                </div>
              </FadeFromTop>

              <Rate
                onChange={(amount) => {
                  console.log('Stars: ', amount);
                  setStars(amount);
                }}
              />
              <Input
                style={{ marginTop: '10px' }}
                placeholder="Muy bueno!"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                type="primary"
                style={{ marginTop: '20px' }}
                loading={props.loading}
                onClick={() => {
                  props.onSendStars(stars, comment);
                }}
              >
                Enviar
              </Button>
            </>
          )}
      </Modal>
    </>
  );
};

