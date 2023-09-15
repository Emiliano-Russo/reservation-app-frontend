import React, { useState } from 'react';
import { TimePicker, Button, Modal, Divider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';

export const ReservationDetails = ({
  openingTime,
  closingTime,
  daysAvailable,
  onOpeningTimeChange,
  onClosingTimeChange,
  onDaysAvailableChange,
}) => {
  const [showNote, setShowNote] = useState(false);
  const { t } = useTranslation();

  const toggleDay = (day) => {
    if (daysAvailable.includes(day)) {
      onDaysAvailableChange(daysAvailable.filter((d) => d !== day));
    } else {
      onDaysAvailableChange([...daysAvailable, day]);
    }
  };

  return (
    <GrowsFromLeft>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f6f8fa',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            marginBottom: '15px',
            padding: '10px',
            position: 'relative',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label>{t('Apertura')}</label>
            <TimePicker
              format="HH:mm"
              value={openingTime}
              onChange={onOpeningTimeChange}
              placeholder={t('Selecciona la Hora')}
              style={{ width: '100%', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>{t('Clausura')}</label>
            <TimePicker
              format="HH:mm"
              value={closingTime}
              onChange={onClosingTimeChange}
              placeholder={t('Selecciona la Hora')}
              style={{ width: '100%', marginTop: '5px' }}
            />
          </div>
          <InfoCircleOutlined
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              color: '#007acc',
            }}
            onClick={() => setShowNote(true)}
          />
        </div>

        <Divider />

        <div
          style={{
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.05)',
          }}
        >
          <h3>{t('Días disponibles')}</h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}
          >
            {[
              'Lunes',
              'Martes',
              'Miércoles',
              'Jueves',
              'Viernes',
              'Sábado',
              'Domingo',
            ].map((day) => (
              <Button
                key={day}
                style={{ margin: '5px', minWidth: '90px' }} // Aquí cambiamos el flex por un minWidth
                type={daysAvailable.includes(day) ? 'primary' : 'default'}
                onClick={() => toggleDay(day)}
              >
                {t(day)}
              </Button>
            ))}
          </div>
        </div>

        <Modal
          title={t('Nota')}
          visible={showNote}
          onCancel={() => setShowNote(false)}
          footer={null}
        >
          {t(
            'Los horarios establecidos son de carácter informativo para el cliente. Sin embargo, es a discreción del negocio aceptar reservas fuera de este horario.',
          )}
        </Modal>
      </div>
    </GrowsFromLeft>
  );
};
