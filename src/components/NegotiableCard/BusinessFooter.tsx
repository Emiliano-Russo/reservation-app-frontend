import { message, TimePicker, Button } from 'antd';
import { useState } from 'react';
import { REACT_APP_BASE_URL } from '../../../env';
import {
  IReservation,
  AcceptStatus,
} from '../../interfaces/reservation.interface';
import { ReservationStatus } from '../../interfaces/reservation.status';
import { ReservationService } from '../../services/reservation.service';
import { convertToJSDate, formatDate } from '../../utils/dateFormat';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';

interface Props {
  reservation: IReservation;
  index: number;
  isBusiness: boolean;
  setIsModalVisible: any;
  setReservations: React.Dispatch<React.SetStateAction<IReservation[]>>;
}

export const BusinessFooter = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  console.log('SET RESERVATIONS: ', props.setReservations);

  const reservationService = new ReservationService(REACT_APP_BASE_URL);

  if (!props.reservation.negotiable) return null;

  const onChangeHour = (time: any, timeString: string) => {
    const start = convertToJSDate(timeString);
    setStartTime(start);
  };

  const sendProposal = () => {
    setLoading(true);
    console.log('sending proposal...');
    const dateToSend = startDate;
    dateToSend.setHours(startTime.getHours());
    dateToSend.setMinutes(startTime.getMinutes());
    console.log('about to send');
    reservationService
      .businessProposedSchedule(
        props.reservation.id,
        props.reservation.createdAt!,
        dateToSend.toString(),
      )
      .then(() => {
        message.success('Propuesta Enviada');
        console.log('Propuesta Enviada!');
        console.log('setReservations: ', props.setReservations);
        props.setReservations((prev: IReservation[]) => {
          console.log('com');
          const clonedPrev = [...prev];
          const indexRes = clonedPrev.findIndex(
            (val) => val.id == props.reservation.id,
          );
          console.log('indexREs:', indexRes);
          const item = clonedPrev[indexRes];
          console.log('item: ', item);
          if (item.negotiable) {
            item.negotiable.acceptedBusinessProposed = AcceptStatus.Unanswered;
            item.negotiable.businessProposedSchedule = dateToSend.toString();
          }
          console.log('item after tweaks on negotiable: ', item);
          clonedPrev[indexRes] = item;
          return clonedPrev;
        });
      })
      .catch((err) => {
        console.log('an error', err);
        message.error('Error');
      })
      .finally(() => {
        setLoading(false);
        props.setIsModalVisible(false);
      });
  };

  const reject = () => {
    setLoading(true);
    reservationService
      .updateReservation(props.reservation.id, props.reservation.createdAt!, {
        status: ReservationStatus.Rejected,
        negotiable: undefined,
      })
      .then(() => {
        message.info('Reserva Rechazada');
        props.setReservations((prev: IReservation[]) => {
          const clonedPrev = [...prev];
          const indexRes = clonedPrev.findIndex(
            (val) => val.id == props.reservation.id,
          );
          const item = clonedPrev[indexRes];
          if (item.negotiable) {
            item.negotiable = undefined;
            item.status = ReservationStatus.Rejected;
            item.reservationDate = new Date();
          }
          clonedPrev[indexRes] = item;
          return clonedPrev;
        });
      })
      .catch(() => {
        message.error('Error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (
    props.reservation.negotiable.acceptedBusinessProposed ==
      AcceptStatus.NotAccepted ||
    props.reservation.negotiable.businessProposedSchedule == undefined
  )
    return (
      <>
        {props.reservation.negotiable.dateRange.end && (
          <>
            <p>Elegir una fecha</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              locale={es}
              dateFormat="dd/MM/yyyy"
            />
          </>
        )}
        {props.reservation.negotiable.timeRange.end && (
          <TimePicker
            style={{ margin: '20px auto' }}
            placeholder="Selecciona la Hora"
            format="h:mm a"
            onChange={onChangeHour}
          />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '50px',
            justifyContent: 'space-around',
          }}
        >
          <Button loading={loading} type="primary" danger onClick={reject}>
            Rechazar
          </Button>
          <Button loading={loading} type="primary" onClick={sendProposal}>
            Enviar Propuesta
          </Button>
        </div>
      </>
    );

  return (
    <>
      <p>
        <strong>Propuesta:</strong>
        {'  '}
        {formatDate(props.reservation.negotiable.businessProposedSchedule)}
      </p>
    </>
  );
};
