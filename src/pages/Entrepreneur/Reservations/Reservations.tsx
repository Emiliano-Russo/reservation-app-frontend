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
import { NegotiableCard } from '../../../components/NegotiableCard/NegotiableCard';
import { IReservation } from '../../../interfaces/reservation.interface';
import { ReservationStatus } from '../../../interfaces/reservation.status';

export const BusinessReservation = withPageLayout(
  () => {
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState<IReservation[]>([]);

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

    const changeStatusReservation = (
      reservationId: string,
      status: ReservationStatus,
    ) => {
      console.log('changeStatusReservation function', status);
      setReservations((prev: IReservation[]) => {
        console.log('setting reservations...');
        const clonedPrev = [...prev];
        const indexRes = clonedPrev.findIndex((val) => val.id == reservationId);
        const item = clonedPrev[indexRes];

        item.status = status;
        clonedPrev[indexRes] = item;
        console.log('new item: ', item);
        return clonedPrev;
      });
    };

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
          {sortedTickets.map((reservation: any, index: number) => {
            if (reservation.negotiable)
              return (
                <NegotiableCard
                  setReservations={setReservations}
                  index={index}
                  isBusiness={true}
                  reservation={reservation}
                />
              );
            else
              return (
                <ReservationCard
                  isBusiness
                  key={reservation.id}
                  {...reservation}
                  index={index}
                  changeStatusReservation={changeStatusReservation}
                />
              );
          })}
        </div>
      </>
    );
  },
  '0px',
  true,
  true,
);
