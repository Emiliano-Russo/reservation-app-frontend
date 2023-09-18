import { Button, Modal } from 'antd';
import styles from './NewReservation.module.css';
import { INegotiable } from '../../../interfaces/reservation.interface';
import {
  formatDate,
  formatOnlyDate,
  formatTime,
} from '../../../utils/dateFormat';

const NegotiableContent = (negotiable: INegotiable) => {
  return (
    <div>
      {negotiable.dateRange?.end ? (
        <>
          <h1>Dias Flexibles</h1>
          <p>
            <strong>Del </strong>
            {formatOnlyDate(negotiable.dateRange?.start.toString())}
          </p>
          <p>
            <strong>Hasta</strong>{' '}
            {formatOnlyDate(negotiable.dateRange?.end.toString())}
          </p>
        </>
      ) : (
        <>
          <h1>Dia especifico</h1>
          <p> {formatOnlyDate(negotiable.dateRange?.start.toString())}</p>
        </>
      )}

      {negotiable.timeRange?.end ? (
        <>
          <h1>Horas Flexibles</h1>
          <p>
            <strong>De </strong>
            {formatTime(new Date(negotiable.timeRange.start))}
          </p>
          <p>
            {' '}
            <strong>Hasta</strong>{' '}
            {formatTime(new Date(negotiable.timeRange.end))}
          </p>
        </>
      ) : negotiable.timeRange ? (
        <>
          <h1>Hora especifica</h1>
          <p>{formatTime(new Date(negotiable.timeRange.start))}</p>
        </>
      ) : null}
    </div>
  );
};

const Specific = ({ business, controlValues }) => {
  return (
    <div className={styles.modalContent}>
      <h3>{business?.name}</h3>
      <p>Fecha</p>
      <span>{formatDate(controlValues?.date)}</span>
      {controlValues?.extras?.map((val) => {
        console.log('extra: ', val);
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

export const ReservationModal = ({
  modalOpen,
  loading,
  creatingReservation,
  createReservation,
  controlValues,
  business,
  setModalOpen,
}) => {
  return (
    <Modal
      open={modalOpen}
      onCancel={() => {
        if (creatingReservation == false) setModalOpen(false);
      }}
      bodyStyle={{ padding: 0 }}
      footer={
        <div>
          <Button
            danger
            loading={creatingReservation}
            onClick={() => {
              if (loading == false) setModalOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            loading={creatingReservation}
            type="primary"
            onClick={createReservation}
          >
            Confimar
          </Button>
        </div>
      }
    >
      {controlValues && controlValues.negotiable ? (
        <NegotiableContent {...controlValues.negotiable} />
      ) : (
        <Specific business={business} controlValues={controlValues} />
      )}
    </Modal>
  );
};
