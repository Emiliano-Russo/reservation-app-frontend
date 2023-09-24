import { Button } from 'antd';
import { formatDate } from '../../utils/dateFormat';
import { AcceptStatus } from '../../interfaces/reservation/negotiable.interace';

export const UserFooter = ({ props, loading, responseBusinessProposal }) => {
  return (
    <>
      {props.reservation.negotiable.businessProposedSchedule &&
      props.reservation.negotiable.acceptedBusinessProposed !=
        AcceptStatus.NotAccepted ? (
        <>
          <h4>Propuesta del negocio</h4>
          {formatDate(props.reservation.negotiable.businessProposedSchedule)}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '50px',
            }}
          >
            {props.isBusiness ? null : (
              <>
                <Button
                  loading={loading}
                  type="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    responseBusinessProposal(AcceptStatus.Accepted);
                  }}
                >
                  Aceptar
                </Button>
                <Button
                  loading={loading}
                  type="primary"
                  danger
                  onClick={() => {
                    responseBusinessProposal(AcceptStatus.NotAccepted);
                  }}
                >
                  Rechazar
                </Button>
              </>
            )}
          </div>
        </>
      ) : null}
    </>
  );
};
