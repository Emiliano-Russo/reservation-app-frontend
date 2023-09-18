import React, { useState } from 'react';
import { Button, Radio, Modal } from 'antd';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';

export const ReservationType = ({
  setDayTypeSelection,
  setHourTypeSelection,
}) => {
  const [step, setStep] = useState(1);

  const handleDayChange = (e) => {
    setDayTypeSelection(e.target.value);
    setStep(2);
  };

  const handleHourChange = (e) => {
    setHourTypeSelection(e.target.value);
  };

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {step === 1 && (
        <>
          <AnimatedFromLeft>
            <h2>
              ¿Desea reservar para un día puntual o tiene flexibilidad en las
              fechas?
            </h2>
            <Radio.Group
              style={{ marginTop: '50px' }}
              onChange={handleDayChange}
            >
              <Radio.Button value="S">Día específico</Radio.Button>
              <Radio.Button value="F">Flexible en fechas</Radio.Button>
            </Radio.Group>
          </AnimatedFromLeft>
        </>
      )}

      {step === 2 && (
        <>
          <AnimatedFromLeft>
            <h2>
              ¿Desea reservar para una hora puntual o tiene flexibilidad en el
              horario?
            </h2>
            <Radio.Group
              style={{ marginTop: '50px' }}
              onChange={handleHourChange}
            >
              <Radio.Button value="S">Hora específica</Radio.Button>
              <Radio.Button value="F">Flexible en horario</Radio.Button>
            </Radio.Group>
          </AnimatedFromLeft>
        </>
      )}
    </div>
  );
};
