import React, { useState } from 'react';
import { Avatar, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { BusinessTypeCard } from '../../components/BusinessTypeCard';
import { items } from '../../mocks/businessType';
import Footer from '../../components/Footer';
import styles from './Home.module.css';
import { StatusBar } from '@capacitor/status-bar';
import SearchInput from '../../components/SearchInput/SearchInput';

export const Home = withPageLayout(() => {
  StatusBar.setBackgroundColor({ color: 'white' });
  const [userName, setUsername] = useState('Diego');

  return (
    <>
      <div className={styles.greetingContainer}>
        <Avatar size={64} className={styles.avatarStyle}>
          D
        </Avatar>
        <p className={styles.greetingText}>Hola, {userName}!</p>
      </div>
      <SearchInput />
      <div className={styles.businessTypeContainer}>
        {items.map((val) => (
          <BusinessTypeCard {...val} />
        ))}
      </div>
      <Footer style={{ margin: '0px 20px 20px 20px' }} />
    </>
  );
}, '0px');
