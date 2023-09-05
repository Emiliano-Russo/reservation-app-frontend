import React, { useState, useEffect } from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { IonDatetime } from '@ionic/react';
import { Button, Input, Select } from 'antd';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import styles from './NewReservation.module.css';

const { Option } = Select;

export const NewReservation = withPageLayout(() => {
  const [step, setStep] = useState(1);

  return (
    <>
      <BackNavigationHeader title={'Reserva'} />
      <div
        style={{ display: step === 2 ? 'none' : 'flex' }}
        className={styles.calendarContainer}
      >
        <IonDatetime
          className={styles.calendarStyle}
          placeholder="Seleccione una fecha"
        ></IonDatetime>
      </div>

      {step == 2 || (step == 1 && window.innerHeight >= 680) ? (
        <div className={styles.fieldsContainer}>
          {/* Número de Invitados */}
          <div className={styles.inputContainer}>
            <label>Número de invitados:</label>
            <Input type="number" min="1" max="10" defaultValue="1" />
          </div>

          {/* Preferencia de Asiento */}
          <div className={styles.selectContainer}>
            <label>Preferencia de asiento:</label>
            <Select
              placeholder="Seleccione una preferencia"
              className={styles.fullWidth}
            >
              <Option value="ventana">Ventana</Option>
              <Option value="pasillo">Pasillo</Option>
              <Option value="centro">Centro</Option>
            </Select>
          </div>
        </div>
      ) : null}

      {step == 2 && (
        <>
          {/* Botones */}
          <div className={styles.buttonsContainer}>
            <Button onClick={() => setStep(1)}>Atrás</Button>
            <Button type="primary">Enviar</Button>
          </div>
        </>
      )}

      {step === 1 && window.innerHeight < 680 ? (
        <div className={styles.buttonsContainer}>
          <Button onClick={() => setStep(2)}>Siguiente</Button>
        </div>
      ) : step === 1 ? (
        <div className={styles.buttonsContainer}>
          <Button>Cancelar</Button>
          <Button type="primary">Enviar</Button>
        </div>
      ) : null}
    </>
  );
}, '0px');
