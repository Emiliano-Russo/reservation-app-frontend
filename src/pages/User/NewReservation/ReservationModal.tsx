import { Button, Modal } from 'antd';
import styles from './NewReservation.module.css';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} • ${hours}:${minutes}`;
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
    </Modal>
  );
};
