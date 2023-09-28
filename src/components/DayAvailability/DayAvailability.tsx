import { IAvailability } from '../../interfaces/business/business.interface';
import { weekDayToSpanish } from '../../utils/dateFormat';

interface Props {
  availability: IAvailability;
}

export const DayAvailability = (props: Props) => {
  return (
    <div>
      <strong>{weekDayToSpanish(props.availability.day) + ' '}</strong>
      <div key={props.availability.id}>
        <p style={{ marginTop: '0px' }}>
          {new Date(props.availability.openingTime).toLocaleTimeString()}
          {' - '}
          {new Date(props.availability.closingTime).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
