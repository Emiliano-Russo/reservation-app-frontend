import React, { useState } from 'react';
import { Avatar, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { withPageLayout } from '../wrappers/WithPageLayout';
import { BusinessTypeCard } from '../components/BusinessTypeCard';
import { items } from '../mocks/businessType';
import Footer from '../components/Footer';

export const Home = withPageLayout(() => {
  const [userName, setUsername] = useState('Diego');

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px 0px 20px 0px',
          padding: '0px 20px',
        }}
      >
        <Avatar size={64} style={{ marginRight: '15px' }}>
          D
        </Avatar>
        <p style={{ color: 'black', fontSize: '20px', fontWeight: 500 }}>
          Hola, {userName}!
        </p>
      </div>
      <div style={{ marginBottom: '20px', padding: '0px 20px' }}>
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
          padding: '0px 20px',
        }}
      >
        {items.map((val) => (
          <BusinessTypeCard {...val} />
        ))}
      </div>
      <Footer style={{ margin: '0px 20px 20px 20px' }} />
    </>
  );
}, '0px');
