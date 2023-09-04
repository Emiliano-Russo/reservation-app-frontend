import React from 'react';
import { Button } from 'antd';
import { ReservationCard } from '../../components/ReservationCard';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import Footer from '../../components/Footer';
import { tickets } from '../../mocks/reservations';
import SearchInput from '../../components/SearchInput/SearchInput';
import styles from './Reservations.module.css';

const Reservations = withPageLayout(() => {
  return (
    <>
      <div className={styles.header}>
        <p className={styles.headerText}>Reservas Solicitadas</p>
        <button>Filtros</button>
      </div>
      <SearchInput />
      <div className={styles.ticketsContainer}>
        {tickets.map((ticket) => (
          <ReservationCard {...ticket} />
        ))}
      </div>
      <Footer style={{ margin: 'auto 1.25rem 1.25rem 1.25rem' }} />
    </>
  );
}, '0px');

export default Reservations;
