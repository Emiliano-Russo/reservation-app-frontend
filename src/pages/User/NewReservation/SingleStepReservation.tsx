import styles from './NewReservation.module.css';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { Controls } from './Controls';
import { Button, message, Select, TimePicker } from 'antd';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import { ControlValue } from './NewReservation';
import { convertToJSDate } from '../../../utils/dateFormat';

export const SingleStepReservation = ({
  setControlValues,
  businessType,
  creatingReservation,
  controlValues,
  setModalOpen,
  hourTypeSelection,
  dayTypeSelection,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<null | Date>(null);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState<null | Date>(null);

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onChangeHour = (time: any, timeString: string) => {
    const start = convertToJSDate(timeString);
    setStartTime(start);
  };

  const onChangeHourRange = (time: any, timeString: [string, string]) => {
    const start = convertToJSDate(timeString[0]);
    const end = convertToJSDate(timeString[1]);
    setStartTime(start);
    setEndTime(end);
  };

  return (
    <>
      {/* Date Picker */}
      <div style={{ margin: '20px auto 0px auto' }}>
        {dayTypeSelection == 'S' ? (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            locale={es}
            inline
          />
        ) : (
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        )}
      </div>

      {/* Time Picker */}
      <div style={{ margin: '20px auto 30px auto', width: '80%' }}>
        {hourTypeSelection == 'S' ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p style={{ margin: '0px', textAlign: 'left' }}>Hora</p>
            <TimePicker
              style={{ margin: '0 auto' }}
              placeholder="Selecciona la Hora"
              format="h:mm a"
              onChange={onChangeHour}
            />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p style={{ margin: '0px', textAlign: 'left' }}>Rango Horario</p>
            <TimePicker.RangePicker
              onChange={onChangeHourRange}
              style={{ margin: '0 auto', width: '200px' }}
              format="h:mm a"
            />
          </div>
        )}
      </div>

      <div>
        <FadeFromTop>
          <Controls
            controls={businessType.controls}
            setControlValues={setControlValues}
          />
        </FadeFromTop>
      </div>
      <div className={styles.buttonsContainer}>
        <Button loading={creatingReservation} style={{ visibility: 'hidden' }}>
          Enviar
        </Button>
        <Button
          loading={creatingReservation}
          type="primary"
          onClick={() => {
            if (startDate && startTime) {
              console.log('setting controls');
              let newControlValues: any = {};

              const sd = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate(),
                startTime.getHours(),
                startTime.getMinutes(),
              );

              if (dayTypeSelection === 'S' && hourTypeSelection === 'S') {
                newControlValues.date = sd;
                newControlValues.negotiable = undefined;
              } else {
                newControlValues.negotiable = {
                  dateRange: {
                    start: startDate,
                    end: dayTypeSelection === 'F' ? endDate : undefined,
                  },
                  timeRange: {
                    start: startTime,
                    end: hourTypeSelection === 'F' ? endTime : undefined,
                  },
                };
              }

              setControlValues((prev: ControlValue) => ({
                ...prev,
                ...newControlValues,
              }));
              setModalOpen(true);
            } else {
              message.error('Porfavor selecciona una fecha');
            }
          }}
        >
          Enviar
        </Button>
      </div>
    </>
  );
};
