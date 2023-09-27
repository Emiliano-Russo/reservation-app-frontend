import { translateForUserAcceptStatus } from '../../interfaces/reservation/reservation.interface';
import { formatOnlyDate, formatTime } from '../../utils/dateFormat';

export const BasicInfo = ({ props }) => {
  return (
    <>
      <strong> Estado</strong>
      <p>
        {translateForUserAcceptStatus(
          props.reservation.negotiable.acceptedBusinessProposed,
        )}
      </p>

      <strong>Fecha/s</strong>
      <p>
        {formatOnlyDate(
          props.reservation.negotiable.dateRange.start.toString(),
        )}
        {props.reservation.negotiable.dateRange.end ? (
          <span>
            -
            {formatOnlyDate(
              props.reservation.negotiable.dateRange.end.toString(),
            )}
          </span>
        ) : null}
      </p>
      <strong>Horario</strong>
      <p>
        {formatTime(new Date(props.reservation.negotiable.timeRange.start))}
        {props.reservation.negotiable.timeRange.end
          ? '-' +
            formatTime(new Date(props.reservation.negotiable.timeRange.end))
          : null}
      </p>
      <strong>Nota</strong>
      <p>{props.reservation.bookingInstructions}</p>
    </>
  );
};
