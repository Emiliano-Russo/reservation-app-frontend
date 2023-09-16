import { IonDatetime } from '@ionic/react';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import styles from './NewReservation.module.css';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { Controls } from './Controls';
import { Button, message } from 'antd';

export const SingleStepReservation = ({
  setControlValues,
  businessType,
  creatingReservation,
  controlValues,
  setModalOpen,
}) => {
  console.log('rendering single step reservation');
  return (
    <>
      <AnimatedFromLeft>
        <div className={styles.calendarContainer}>
          <IonDatetime
            className={styles.calendarStyle}
            placeholder="Seleccione una fecha"
            onIonChange={(e) => {
              setControlValues((prevState) => ({
                ...prevState,
                date: e.detail.value,
              }));
            }}
          ></IonDatetime>
        </div>
      </AnimatedFromLeft>
      <FadeFromTop>
        <Controls
          controls={businessType[0].controls}
          setControlValues={setControlValues}
        />
      </FadeFromTop>
      <div className={styles.buttonsContainer}>
        <Button loading={creatingReservation} style={{ visibility: 'hidden' }}>
          Enviar
        </Button>
        <Button
          loading={creatingReservation}
          type="primary"
          onClick={() => {
            console.log('---- the line before it breaks ----', controlValues);
            if (
              controlValues != undefined &&
              controlValues?.date &&
              controlValues?.date != null
            )
              setModalOpen(true);
            else message.error('Porfavor selecciona una fecha');
          }}
        >
          Enviar
        </Button>
      </div>
    </>
  );
};
