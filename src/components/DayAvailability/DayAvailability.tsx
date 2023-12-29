import { ClockCircleOutlined } from '@ant-design/icons';
import { IAvailability } from '../../interfaces/business/business.interface';
import { weekDayToSpanish } from '../../utils/dateFormat';

interface Props {
  availability: IAvailability;
  oneCard: boolean;
}

export const DayAvailability = (props: Props) => {
  return (
    <div
      style={{
        margin: !props.oneCard ? '20px 0px' : '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: !props.oneCard ? '15px' : '20px',
        borderRadius: '15px',
        color: '#333',
        lineHeight: '1.5',
      }}
    >
      <strong style={{ fontSize: '18px', color: '#4a4a4a' }}>
        {!props.oneCard ? weekDayToSpanish(props.availability.day) + ' ' : 'Lunes - ' + weekDayToSpanish(props.availability.day) + ' ' }
      </strong>
      <div key={props.availability.id} style={{ marginTop: '10px' }}>
        <p>
          <ClockCircleOutlined
            style={{ marginRight: '5px', color: '#1890ff' }}
          />
          <strong>Abre:</strong> {props.availability.openingTime}
        </p>
        <p>
          <ClockCircleOutlined
            style={{ marginRight: '5px', color: '#1890ff' }}
          />
          <strong>Cierra:</strong> {props.availability.closingTime}
        </p>
      </div>
    </div>
  );
};
