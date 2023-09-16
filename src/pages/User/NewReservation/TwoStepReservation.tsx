import { IonDatetime } from '@ionic/react';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import styles from './NewReservation.module.css';
import { useState } from 'react';
import { Button, message } from 'antd';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { Controls } from './Controls';
import { SingleStepReservation } from './SingleStepReservation';

const ScreenOne = ({ setControlValues, setStep }) => {
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
        <div className={styles.buttonsContainer}>
          <Button style={{ visibility: 'hidden' }} onClick={() => setStep(2)}>
            Siguiente
          </Button>
          <Button onClick={() => setStep(2)}>Siguiente</Button>
        </div>
      </AnimatedFromLeft>
    </>
  );
};

const ScreenTwo = ({
  businessType,
  setControlValues,
  creatingReservation,
  controlValues,
  setModalOpen,
}) => {
  return (
    <>
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
            if (
              controlValues &&
              controlValues.date &&
              controlValues.date != null
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

export const TwoStepReservation = ({
  setControlValues,
  businessType,
  controlValues,
  creatingReservation,
  setModalOpen,
}) => {
  const [step, setStep] = useState(1);
  console.log('two step reservation');
  return (
    <>
      {step == 1 ? (
        <ScreenOne setControlValues={setControlValues} setStep={setStep} />
      ) : (
        <ScreenTwo
          businessType={businessType}
          controlValues={controlValues}
          creatingReservation={creatingReservation}
          setControlValues={setControlValues}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
};
