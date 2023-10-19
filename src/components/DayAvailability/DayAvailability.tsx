import { IAvailability } from '../../interfaces/business/business.interface';
import { weekDayToSpanish } from '../../utils/dateFormat';

interface Props {
  availability: IAvailability;
}

export const DayAvailability = (props: Props) => {
  return (
    <div style={{ margin: '0px 20px 0px 0px' }}>
      <strong>{weekDayToSpanish(props.availability.day) + ' '}</strong>
      <div key={props.availability.id}>
        <p style={{ marginTop: '0px' }}>
          {new Date(props.availability.openingTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
          {' - '}
          {new Date(props.availability.closingTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};
