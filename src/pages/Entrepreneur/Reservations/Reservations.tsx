import { useSelector } from 'react-redux';
import { REACT_APP_BASE_URL } from '../../../../env';
import Footer from '../../../components/Footer/Footer';
import { ReservationService } from '../../../services/reservation.service';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { useEffect, useRef } from 'react';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { ReservationCard } from '../../../components/ReservationCard/ReservationCard';
import { Spin } from 'antd';
import styles from './Reservations.module.css';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { NegotiableCard } from '../../../components/NegotiableCard/NegotiableCard';
import { IReservation } from '../../../interfaces/reservation.interface';
import { ReservationStatus } from '../../../interfaces/reservation.status';
import { useDynamoLazyLoading } from '../../../hooks/useDynamoLazyLoading';

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export const BusinessReservation = withPageLayout(
  () => {
    const currentBusiness = useSelector(
      (state: any) => state.business.currentBusiness,
    );

    const {
      data: reservations,
      loading,
      loadMoreData,
      updateData,
    } = useDynamoLazyLoading<IReservation>({
      initialData: [],
      fetchData: async (lastKey) => {
        return reservationService.getReservationsByBusinessId(
          currentBusiness.id,
          '5',
          JSON.stringify(lastKey),
        );
      },
    });

    const containerRef = useRef<any>(null); // Referencia al contenedor

    const handleScroll = (e) => {
      const container = e.target;
      if (
        container.scrollHeight - container.scrollTop ===
        container.clientHeight
      ) {
        // Cargar más datos
        loadMoreData();
      }
    };

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
      }
      return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);

    const changeStatusReservation = (
      reservationId: string,
      status: ReservationStatus,
    ) => {
      updateData((prevReservations) => {
        const updatedReservations = [...prevReservations];
        const reservationIndex = updatedReservations.findIndex(
          (res) => res.id === reservationId,
        );
        if (reservationIndex !== -1) {
          updatedReservations[reservationIndex].status = status;
        }
        return updatedReservations;
      });
    };

    return (
      <>
        <GrowsFromLeft>
          <div style={{ padding: '20px' }}>
            <h4>Reservas Solicitadas</h4>
          </div>
        </GrowsFromLeft>
        <SearchInput />
        {loading && <Spin style={{ marginTop: '100px' }} />}
        <div className={styles.ticketsContainer} ref={containerRef}>
          {reservations.map((reservation, index) => {
            if (reservation.negotiable) {
              return (
                <NegotiableCard
                  setReservations={updateData}
                  index={index}
                  isBusiness={true}
                  reservation={reservation}
                />
              );
            } else {
              return (
                <ReservationCard
                  isBusiness
                  key={reservation.id}
                  businessName={reservation.businessName}
                  extras={reservation.extras}
                  id={reservation.id}
                  reservationDate={reservation.reservationDate!}
                  status={reservation.status}
                  userName={reservation.userName}
                  index={index}
                  createdAt={reservation.createdAt!}
                  changeStatusReservation={changeStatusReservation}
                />
              );
            }
          })}
        </div>
      </>
    );
  },
  '0px',
  true,
  true,
);
