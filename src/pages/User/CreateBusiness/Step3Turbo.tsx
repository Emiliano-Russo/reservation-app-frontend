import { Button, Switch, TimePicker } from 'antd';
import { PropsStep } from '.';
import { useState } from 'react';
import { convertToJSDate, mapDayToEnglish } from '../../../utils/dateFormat';
import { IAvailability } from '../../../interfaces/business/business.interface';
import dayjs from 'dayjs';
import { WeekDays } from '../../../interfaces/weekday.enum';

interface PropsRowScheduleSelector {
  day: string;
  onChange: (start: string, end: string, isOpen: boolean) => void;
}

const RowScheduleSelector = (props: PropsRowScheduleSelector) => {
  const [start, setStart] = useState<string>('09:00');
  const [end, setEnd] = useState<string>('20:00');
  const [isOpen, setIsOpen] = useState(false);

  const onChangeHourRange = (time: any, timeString: [string, string]) => {
    console.log('opening dayjs: ', timeString[0]);
    console.log('closing dayjs: ', timeString[1]);
    setStart(timeString[0]);
    setEnd(timeString[1]);
    props.onChange(timeString[0], timeString[1], isOpen);
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
        <p style={{ width: '180px' }}>{props.day}</p>
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
  const [changesPending, setChangesPending] = useState(false);

  console.log('schedule: ', schedule);

  const saveSchedule = (scheduleParam: IAvailability[]) => {
    setChangesPending(false);
    const availabilityStringified = JSON.stringify(scheduleParam);
    console.log('availabilityStringified: ', availabilityStringified);
    props.setBusinessData((prev) => {
      console.log('a ver el stringify aviability: ', availabilityStringified);
      return { ...prev, availabilityStringify: availabilityStringified };
    });
  };

  const addScheduleHandlerWeekDays = (
    start: string,
    end: string,
    isOpen: boolean,
  ) => {
    ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'].forEach((day) => {
      addScheduleHandler(day, start, end, isOpen);
    });
  };

  const addScheduleHandler = (
    day: string,
    start: string,
    end: string,
    isOpen: boolean,
  ) => {
    setChangesPending(true);
    //sabado o domingo
    if (isOpen) {
      const daySchedule: IAvailability = {
        id: '',
        day: mapDayToEnglish(day),
        openingTime: start,
        closingTime: end,
      };
      setSchedule((prev) => {
        const clonedPrev = prev.filter(
          (item) => item.day !== mapDayToEnglish(day),
        );
        clonedPrev.push(daySchedule);
        saveSchedule(clonedPrev);
        return clonedPrev;
      });
    } else {
      setSchedule((prev) => {
        const clonedPrev = prev.filter(
          (item) => item.day !== mapDayToEnglish(day),
        );
        saveSchedule(clonedPrev);
        return clonedPrev;
      });
    }
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
      {['Lunes a Viernes', 'Sabado', 'Domingo'].map((day: string) => {
        return (
          <RowScheduleSelector
            day={day}
            onChange={(start: string, end: string, isOpen: boolean) => {
              if (day === 'Lunes a Viernes')
                addScheduleHandlerWeekDays(start, end, isOpen);
              else addScheduleHandler(day, start, end, isOpen);
            }}
          />
        );
      })}
    </div>
  );
};
