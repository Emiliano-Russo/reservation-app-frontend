import { Button, Switch, TimePicker } from 'antd';
import { PropsStep } from '.';
import { useState } from 'react';
import { convertToJSDate, mapDayToEnglish } from '../../../utils/dateFormat';
import { IAvailability } from '../../../interfaces/business/business.interface';
import dayjs from 'dayjs';

interface PropsRowScheduleSelector {
  day: string;
  onChange: (start: Date, end: Date, isOpen: boolean) => void;
}

const RowScheduleSelector = (props: PropsRowScheduleSelector) => {
  const [start, setStart] = useState<Date>(
    new Date('2021-01-01T09:00:00.000Z'),
  );
  const [end, setEnd] = useState<Date>(new Date('2021-01-01T17:00:00.000Z'));
  const [isOpen, setIsOpen] = useState(false);

  const onChangeHourRange = (time: any, timeString: [string, string]) => {
    const start = convertToJSDate(timeString[0]);
    const end = convertToJSDate(timeString[1]);
    console.log('start: ', start.toDateString());
    console.log('end: ', end.toDateString());
    props.onChange(start, end, isOpen);
  };

  const onChangeSwitch = (open: boolean) => {
    setIsOpen(open);
    props.onChange(start, end, open);
  };

  return (
    <div
      key={props.day}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        margin: '10px 0px',
      }}
    >
      <div>
        <p style={{ width: '90px' }}>{props.day}</p>
        <TimePicker.RangePicker
          disabled={!isOpen}
          onChange={onChangeHourRange}
          style={{ margin: '0 auto', width: '190px' }}
          format="h:mm a"
          minuteStep={15}
          placeholder={['Inicio', 'Fin']}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <label>{isOpen ? 'Abierto' : 'Cerrado'}</label>
        <Switch
          defaultChecked={false}
          checked={isOpen}
          onChange={onChangeSwitch}
        />
      </div>
    </div>
  );
};

export const Step3Turbo = (props: PropsStep) => {
  const [schedule, setSchedule] = useState<IAvailability[]>([]);
  const [days, setDays] = useState([
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ]);

  console.log('schedule: ', schedule);

  const addScheduleHandler = (
    day: string,
    start: Date,
    end: Date,
    isOpen: boolean,
  ) => {
    console.log(isOpen ? 'Is opeeeeen for ' + day : 'Is cloooosed for ' + day);
    if (isOpen) {
      const daySchedule: IAvailability = {
        id: '',
        day: mapDayToEnglish(day),
        openingTime: start.toISOString(),
        closingTime: end.toISOString(),
      };
      setSchedule((prev) => {
        console.log('########before filter: ', prev);
        const clonedPrev = prev.filter(
          (item) => item.day !== mapDayToEnglish(day),
        );
        console.log('########after filter: ', clonedPrev);
        clonedPrev.push(daySchedule);
        return clonedPrev;
      });
    } else {
      setSchedule((prev) => {
        const clonedPrev = prev.filter(
          (item) => item.day !== mapDayToEnglish(day),
        );
        return clonedPrev;
      });
    }
  };

  const buildAvailabilityStringify = (
    dayOfTheWeek: string,
    start: Date,
    end: Date,
  ) => {
    const opening = start.toISOString();
    const closing = end.toISOString();
    const item: IAvailability = {
      id: '',
      day: mapDayToEnglish(dayOfTheWeek),
      openingTime: opening,
      closingTime: closing,
    };
    return JSON.stringify(item);
  };

  const groupDaysBy = (singleDay: boolean) => {
    console.log('agrupar');
    if (singleDay) {
      setDays([
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo',
      ]);
    } else {
      setDays(['L a V', 'Sabado', 'Domingo']);
    }
  };

  const saveSchedule = () => {
    console.log('guardar');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: '30px',
          paddingRight: '10px',
        }}
      >
        <label>Agrupar Lunes a Viernes</label>
        <Switch
          style={{ marginLeft: '40px' }}
          onChange={(val) => {
            groupDaysBy(!val);
          }}
        />
      </div>
      {days.map((day: string) => {
        return (
          <RowScheduleSelector
            day={day}
            onChange={(start: Date, end: Date, isOpen: boolean) => {
              addScheduleHandler(day, start, end, isOpen);
            }}
          />
        );
      })}
      <Button onClick={saveSchedule}>Guardar</Button>
    </div>
  );
};
