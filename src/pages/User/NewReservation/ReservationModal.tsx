import { Button, Modal } from 'antd';
import styles from './NewReservation.module.css';
import {
  formatDate,
  formatOnlyDate,
  formatTime,
} from '../../../utils/dateFormat';
import { INegotiable } from '../../../interfaces/reservation/negotiable.interace';
import { ControlValue } from './NewReservation';
import { IBusiness } from '../../../interfaces/business/business.interface';

interface PropsNegotiable {
  negotiable: INegotiable;
  bookingInstructions: string;
}

const NegotiableContent = (props: PropsNegotiable) => {
  if (!props.negotiable) return <h1>Empty</h1>;
  return (
    <div>
      {props.negotiable.dateRange?.end ? (
        <>
          <h1>Dias Flexibles</h1>
          <p>
            <strong>Del </strong>
            {formatOnlyDate(props.negotiable.dateRange?.start.toString())}
          </p>
          <p>
            <strong>Hasta</strong>{' '}
            {formatOnlyDate(props.negotiable.dateRange?.end.toString())}
          </p>
        </>
      ) : (
        <>
          <h1>Dia especifico</h1>
          <p> {formatOnlyDate(props.negotiable.dateRange?.start.toString())}</p>
        </>
      )}

      {props.negotiable.timeRange?.end ? (
        <>
          <h1>Horas Flexibles</h1>
          <p>
            <strong>De </strong>
            {formatTime(new Date(props.negotiable.timeRange.start))}
          </p>
          <p>
            {' '}
            <strong>Hasta</strong>{' '}
            {formatTime(new Date(props.negotiable.timeRange.end))}
          </p>
        </>
      ) : props.negotiable.timeRange ? (
        <>
          <h1>Hora especifica</h1>
          <p>{formatTime(new Date(props.negotiable.timeRange.start))}</p>
        </>
      ) : null}
      {props.bookingInstructions}
    </div>
  );
};

const Specific = ({ business, controlValues }) => {
  return (
    <div className={styles.modalContent}>
      <h3>{business?.name}</h3>
      <p>Fecha</p>
      <span>{formatDate(controlValues?.date)}</span>
      <p>{controlValues.bookingInstructions}</p>
      {controlValues?.extras?.map((val) => {
        return (
          <>
            <p>{val.label}</p>
            <span>{val.value}</span>
          </>
        );
      })}
    </div>
  );
};

interface Props {
  modalOpen: boolean;
  loading: boolean;
  creatingReservation: boolean;
  createReservation: () => void;
  controlValues: ControlValue | undefined;
  business: IBusiness;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReservationModal = (props: Props) => {
  return (
    <Modal
      open={props.modalOpen}
      onCancel={() => {
        if (props.creatingReservation == false) props.setModalOpen(false);
      }}
      bodyStyle={{ padding: 0 }}
      footer={
        <div>
          <Button
            danger
            loading={props.creatingReservation}
            onClick={() => {
              if (props.loading == false) props.setModalOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            loading={props.creatingReservation}
            type="primary"
            onClick={props.createReservation}
          >
            Confimar
          </Button>
        </div>
      }
    >
      {props.controlValues && props.controlValues.negotiable ? (
        <NegotiableContent
          negotiable={props.controlValues.negotiable}
          bookingInstructions={props.controlValues.bookingInstructions || ''}
        />
      ) : (
        <Specific
          business={props.business}
          controlValues={props.controlValues}
        />
      )}
    </Modal>
  );
};
