import { useSelector } from 'react-redux';
import { REACT_APP_BASE_URL } from '../../../../env';
import Footer from '../../../components/Footer/Footer';
import { ReservationService } from '../../../services/reservation.service';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { useEffect, useState } from 'react';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { ReservationCard } from '../../../components/ReservationCard/ReservationCard';
import { Spin } from 'antd';
import styles from './Reservations.module.css';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';

export const BusinessReservation = withPageLayout(
  () => {
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);

    const currentBusiness = useSelector(
      (state: any) => state.business.currentBusiness,
    );

    const reservationService = new ReservationService(REACT_APP_BASE_URL);

    useEffect(() => {
      reservationService
        .getReservationsByBusinessId(currentBusiness.id)
        .then((data) => {
          console.log('data reservation: ', data);
          setReservations(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    const sortedTickets = reservations.sort(
      (a: any, b: any) =>
        new Date(b.reservationDate).getTime() -
        new Date(a.reservationDate).getTime(),
    );

    return (
      <>
        <GrowsFromLeft>
          <div style={{ padding: '20px' }}>
            <h4>Reservas Solicitadas</h4>
          </div>
        </GrowsFromLeft>
        <SearchInput />
        {loading && <Spin style={{ marginTop: '100px' }} />}
        <div className={styles.ticketsContainer}>
          {sortedTickets.map((reservation: any, index: number) => (
            <ReservationCard
              isBusiness
              key={reservation.id}
              {...reservation}
              index={index}
              onCancel={() => {}}
            />
          ))}
        </div>
      </>
    );
  },
  '0px',
  true,
  true,
);
