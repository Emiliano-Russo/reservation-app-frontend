import { useState } from 'react';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';
import {
  AcceptStatus,
  IReservation,
  translateForUserAcceptStatus,
} from '../../interfaces/reservation.interface';
import styles from '../ReservationCard/ReservationCard.module.css';
import { Button, Modal, TimePicker, message } from 'antd';
import {
  convertToJSDate,
  formatDate,
  formatOnlyDate,
  formatTime,
} from '../../utils/dateFormat';
import { ReservationService } from '../../services/reservation.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { es } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { ReservationStatus } from '../../interfaces/reservation.status';

interface Props {
  reservation: IReservation;
  index: number;
  isBusiness: boolean;
}

const BasicInfo = ({ props }) => {
  return (
    <>
      <strong> Estado</strong>
      <p>
        {translateForUserAcceptStatus(
          props.reservation.negotiable.acceptedBusinessProposed,
        )}
      </p>

      <strong>Fecha/s</strong>
      <p>
        {formatOnlyDate(
          props.reservation.negotiable.dateRange.start.toString(),
        )}
        {props.reservation.negotiable.dateRange.end ? (
          <span>
            -
            {formatOnlyDate(
              props.reservation.negotiable.dateRange.end.toString(),
            )}
          </span>
        ) : null}
      </p>
      <strong>Horario</strong>
      <p>
        {formatTime(new Date(props.reservation.negotiable.timeRange.start))}
        {props.reservation.negotiable.timeRange.end
          ? '-' +
            formatTime(new Date(props.reservation.negotiable.timeRange.end))
          : null}
      </p>
    </>
  );
};

const UserFooter = ({ props, loading, responseBusinessProposal }) => {
  console.log('@ REndering user footer @');
  return (
    <>
      {props.reservation.negotiable.businessProposedSchedule &&
      props.reservation.negotiable.acceptedBusinessProposed !=
        AcceptStatus.NotAccepted ? (
        <>
          <h4>Propuesta del negocio</h4>
          {formatDate(props.reservation.negotiable.businessProposedSchedule)}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '50px',
            }}
          >
            {props.isBusiness ? null : (
              <>
                <Button
                  loading={loading}
                  type="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    responseBusinessProposal(AcceptStatus.Accepted);
                  }}
                >
                  Aceptar
                </Button>
                <Button
                  loading={loading}
                  type="primary"
                  danger
                  onClick={() => {
                    responseBusinessProposal(AcceptStatus.NotAccepted);
                  }}
                >
                  Rechazar
                </Button>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

const BusinessFooter = (props: Props) => {
  console.log('######## RENDERING BUSINESS FOOTER');
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const reservationService = new ReservationService(REACT_APP_BASE_URL);

  if (!props.reservation.negotiable) return null;

  const onChangeHour = (time: any, timeString: string) => {
    const start = convertToJSDate(timeString);
    setStartTime(start);
  };

  const sendProposal = () => {
    setLoading(true);
    const dateToSend = startTime;
    dateToSend.setHours(startTime.getHours());
    dateToSend.setMinutes(startTime.getMinutes());
    reservationService
      .businessProposedSchedule(props.reservation.id, dateToSend.toString())
      .then(() => {
        message.success('Propuesta Enviada');
      })
      .catch(() => {
        message.error('Error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const reject = () => {
    setLoading(true);
    reservationService
      .updateReservation(props.reservation.id, {
        status: ReservationStatus.Rejected,
        negotiable: undefined,
      })
      .then(() => {
        message.info('Reserva Rechazada');
      })
      .catch(() => {
        message.error('Error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {props.reservation.negotiable.dateRange.end && (
        <>
          <p>Elegir una fecha</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale={es}
          />
        </>
      )}
      {props.reservation.negotiable.timeRange.end && (
        <TimePicker
          style={{ margin: '0 auto' }}
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
};

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export const NegotiableCard = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const responseBusinessProposal = (status: AcceptStatus) => {
    setIsLoading(true);
    reservationService
      .userResponseProposedSchedule(props.reservation.id, status)
      .then((data) => {
        if (status === AcceptStatus.Accepted)
          message.success('Reserva Confirmada!');
        else message.info('Fecha No Aceptada');
      })
      .catch(() => {
        message.error('Error!');
      })
      .finally(() => {
        setIsModalVisible(false);
      });
  };

  if (!props.reservation.negotiable) return <div>Error</div>;

  return (
    <AnimatedFromLeft
      key={props.reservation.id}
      className={styles.card}
      onClick={() => {
        setIsModalVisible(true);
      }}
      delay={props.index * 0.1}
    >
      <div style={{ background: '#efdbff' }} className={styles.header}>
        <span className={styles.name}>
          {props.isBusiness
            ? props.reservation.userName
            : props.reservation.businessName}
        </span>
        <span className={styles.dateTime}>Flexible</span>
      </div>
      <div className={styles.content}>
        <p style={{ fontSize: '13px' }}>
          {translateForUserAcceptStatus(
            props.reservation.negotiable.acceptedBusinessProposed,
          )}
        </p>
      </div>
      <Modal
        footer={null}
        open={isModalVisible}
        onOk={(e) => {
          console.log('okok');
          e.stopPropagation();
          setIsModalVisible(false);
        }}
        onCancel={(e) => {
          console.log('cancel');
          e.stopPropagation();
          setIsModalVisible(false);
        }}
      >
        <BasicInfo props={props} />
        {/* SEPARAMOS LA LOGICA empezamos suponiendo que es usuario*/}
        <br></br>
        {props.isBusiness ? (
          <BusinessFooter {...props} />
        ) : (
          <UserFooter
            loading={loading}
            props={props}
            responseBusinessProposal={responseBusinessProposal}
          />
        )}
      </Modal>
    </AnimatedFromLeft>
  );
};
