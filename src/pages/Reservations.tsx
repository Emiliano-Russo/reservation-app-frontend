import React from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ReservationCard } from '../components/ReservationCard';
import { ReservationStatus } from '../interfaces/reservation.status';
import Footer from '../components/Footer';
import { withFooterLayout } from '../wrappers/WithFooterLayout';

const Reservations = withFooterLayout(() => {
  const tickets = [
    {
      name: 'Diego Billares',
      date: '2023-08-20',
      time: '02:00',
      guests: 2,
      status: ReservationStatus.Pending,
    },
    {
      name: 'Diego Billares',
      date: '2023-08-20',
      time: '02:00',
      guests: 3,
      status: ReservationStatus.Pending,
    },
    {
      name: 'Diego Billares',
      date: '2023-08-20',
      time: '02:00',
      guests: 4,
      status: ReservationStatus.Pending,
    },
    {
      name: 'Diego Billares',
      date: '2023-08-20',
      time: '02:00',
      guests: 7,
      status: ReservationStatus.Pending,
    },
    {
      name: 'Diego Billares',
      date: '2023-08-20',
      time: '02:00',
      guests: 10,
      status: ReservationStatus.Pending,
    },
    {
      name: 'Fabi Billares',
      date: '2023-08-20',
      time: '02:00',
      guests: 2,
      status: ReservationStatus.Pending,
    },
    // Agrega más tickets aquí
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '0px 20px',
        }}
      >
        <p style={{ fontSize: '16px', fontWeight: 500 }}>
          Reservas Solicitadas
        </p>
        <Button>Filtros</Button>
      </div>
      <div style={{ padding: '0px 20px' }}>
        <Input
          placeholder=" Buscar algo"
          prefix={<SearchOutlined />}
          style={{ width: '100%', maxWidth: '400px', height: '57px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          marginBottom: '30px',
          width: '100%',
          padding: '20px 20px',
        }}
      >
        {tickets.map((ticket) => (
          <ReservationCard {...ticket} />
        ))}
      </div>
    </>
  );
});

export default Reservations;
