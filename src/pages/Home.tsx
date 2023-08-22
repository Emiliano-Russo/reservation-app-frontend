import React from 'react';
import { Avatar, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { withAuth } from '../wrappers/WithAuth';
import { IonContent, IonPage } from '@ionic/react';
import Footer from '../components/Footer';
import { withFooterLayout } from '../wrappers/WithFooterLayout';
import { BusinessTypeCard } from '../components/BusinessTypeCard';

const items = [
  {
    name: 'Canchas de \n Futbol',
    icon: 'https://img.icons8.com/ios-filled/100/football2--v1.png',
  },
  {
    name: 'Restaurantes de Comida',
    icon: 'https://img.icons8.com/ios/50/restaurant.png',
  },
  {
    name: 'Salon de Peluqueria',
    icon: 'https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/64/external-haircutting-scissors-barbershop-jumpicon-(glyph)-jumpicon-glyph-ayub-irawan.png',
  },
  {
    name: 'Cafe de \n Reunion',
    icon: 'https://img.icons8.com/pastel-glyph/64/drink-to-go--v1.png',
  },
  {
    name: 'Solamente es un relleno',
    icon: 'https://img.icons8.com/ios/100/blow.png',
  },
  {
    name: 'Solamente es un relleno',
    icon: 'https://img.icons8.com/ios/100/blow.png',
  },
  {
    name: 'Solamente es un relleno',
    icon: 'https://img.icons8.com/ios/100/blow.png',
  },
  {
    name: 'Solamente es un relleno',
    icon: 'https://img.icons8.com/ios/100/blow.png',
  },
  {
    name: 'Solamente es un relleno',
    icon: 'https://img.icons8.com/ios/100/blow.png',
  },
  {
    name: 'Solamente es un relleno',
    icon: 'https://img.icons8.com/ios/100/blow.png',
  },
  {
    name: 'Solamente es un relleno',
    icon: 'https://img.icons8.com/ios/100/blow.png',
  },
  {
    name: 'Solamente es un relleno',
    icon: 'https://img.icons8.com/ios/100/blow.png',
  },
  // Agrega más items aquí
];

export const Home = withFooterLayout(() => {
  // Puedes reemplazar este nombre con el nombre del usuario actual
  const userName = 'Diego';

  return (
    <>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
      >
        <Avatar size={64} style={{ marginRight: '15px' }}>
          D
        </Avatar>
        <p style={{ color: 'black', fontSize: '20px', fontWeight: 500 }}>
          Hola, {userName}!
        </p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder=" Buscar algo"
          prefix={<SearchOutlined />}
          style={{ width: '100%', maxWidth: '400px', height: '57px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          overflowY: 'scroll',
          flex: 1,
          marginBottom: '30px',
        }}
      >
        {items.map((val) => (
          <BusinessTypeCard {...val} />
        ))}
      </div>
    </>
  );
});
