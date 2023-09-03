import React from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ReservationCard } from '../components/ReservationCard';
import { ReservationStatus } from '../interfaces/reservation.status';
import { withPageLayout } from '../wrappers/WithPageLayout';
import Footer from '../components/Footer';
import { tickets } from '../mocks/reservations';

const Reservations = withPageLayout(() => {
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
      <Footer />
    </>
  );
});

export default Reservations;
