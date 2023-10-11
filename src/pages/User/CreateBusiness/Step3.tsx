import React, { useState } from 'react';
import { TimePicker, Button, Modal, Divider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { PropsStep } from '.';
import dayjs from 'dayjs';
import { IAvailability } from '../../../interfaces/business/business.interface';
import { mapDayToEnglish } from '../../../utils/dateFormat';

export const Step3 = (props: PropsStep) => {
  console.log('Props: ', props);
  const [showNote, setShowNote] = useState(false);
  const [opening, setOpening] = useState<dayjs.Dayjs | null>(null);
  const [closing, setClosing] = useState<dayjs.Dayjs | null>(null);
  const [daysAvailable, setDaysAvailable] = useState<string[]>([]);
  const { t } = useTranslation();

  const toggleDay = (day) => {
    const availabilityStringified = buildAvailabilityStringify(day);
    console.log(availabilityStringified);
    props.setBusinessData((prev) => {
      console.log('a ver el stringify aviability: ', availabilityStringified);
      return { ...prev, availabilityStringify: availabilityStringified };
    });
    if (daysAvailable.includes(day)) {
      setDaysAvailable((prev) => {
        return prev.filter((d) => d !== day);
      });
    } else {
      setDaysAvailable((prev) => [...prev, day]);
    }
  };

  const buildAvailabilityStringify: (day: string) => string = (day: string) => {
    const op = opening != null ? opening?.toDate().toISOString() : '';
    const clos = closing != null ? closing?.toDate().toISOString() : '';
    let list: IAvailability[] = daysAvailable.map((day) => {
      const av: IAvailability = {
        id: '',
        day: mapDayToEnglish(day),
        openingTime: op,
        closingTime: clos,
      };
      return av;
    });

    list = list.filter((val) => val.openingTime != '' && val.closingTime != '');

    if (daysAvailable.includes(day)) {
      list = list.filter((val) => val.day != day);
    } else {
      const item: IAvailability = {
        id: '',
        day: mapDayToEnglish(day),
        openingTime: op,
        closingTime: clos,
      };
      list.push(item);
    }

    return JSON.stringify(list);
  };

  return (
    <GrowsFromLeft>
      <div
        style={{
          padding: '20px',
          borderRadius: '8px',
          // backgroundColor: '#f6f8fa',
          // boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            marginBottom: '15px',
            padding: '10px',
            position: 'relative',
            borderRadius: '10px',
            // backgroundColor: '#ffffff',
            // boxShadow: '0px 0px 10px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label>{t('Apertura')}</label>
            <TimePicker
              format="h:mm a"
              value={opening}
              onChange={(val) => {
                setOpening(val);
              }}
              placeholder={t('Selecciona la Hora')}
              style={{ width: '100%', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>{t('Clausura')}</label>
            <TimePicker
              format="h:mm a"
              value={closing}
              onChange={(val) => {
                setClosing(val);
              }}
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
            // backgroundColor: '#ffffff',
            // boxShadow: '0px 0px 10px rgba(0,0,0,0.05)',
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
          open={showNote}
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
