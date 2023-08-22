import { ReservationStatus } from '../interfaces/reservation.status';

interface Props {
  name: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
}

export const ReservationCard = (ticket: Props) => {
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '5px',
        marginBottom: '15px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        background: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '57px',
          padding: '20px',
          borderBottom: '1px solid #EAECF5',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 400 }}>{ticket.name}</span>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: '#9EA5D1',
            }}
          >
            {new Date(ticket.date).toLocaleDateString('es-ES')}
          </span>
          <span
            style={{
              marginLeft: '10px',
              fontSize: '12px',
              fontWeight: 400,
              color: '#9EA5D1',
            }}
          >
            {ticket.time}
          </span>
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '67px',
          padding: '20px',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: 400 }}>
          {ticket.guests} Invitados
        </span>
        <span
          style={{
            background: '#E0F2FE',
            fontSize: '12px',
            padding: '10px 15px',
            borderRadius: '30px',
            color: '#36BFFA',
          }}
        >
          {ticket.status}
        </span>
      </div>
    </div>
  );
};
