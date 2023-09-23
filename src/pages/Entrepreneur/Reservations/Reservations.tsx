import { useSelector } from 'react-redux';
import { REACT_APP_BASE_URL } from '../../../../env';
import Footer from '../../../components/Footer/Footer';
import { ReservationService } from '../../../services/reservation.service';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { useEffect, useRef, useState } from 'react';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { ReservationCard } from '../../../components/ReservationCard/ReservationCard';
import { Spin, message } from 'antd';
import styles from './Reservations.module.css';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { NegotiableCard } from '../../../components/NegotiableCard/NegotiableCard';
import { IReservation } from '../../../interfaces/reservation.interface';
import { ReservationStatus } from '../../../interfaces/reservation.status';
import { useDynamoLazyLoading } from '../../../hooks/useDynamoLazyLoading';

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export const BusinessReservation = withPageLayout(
  () => {
    const currentBusinessID: string = useSelector(
      (state: any) => state.business.currentBusiness.id,
    );
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [loading, setLoading] = useState(true);

    const containerRef = useRef<any>(null); // Referencia al contenedor

    useEffect(() => {
      const getReservations = async () => {
        setLoading(true);
        reservationService
          .getReservationsByBusinessId(currentBusinessID, {
            limit: 10,
            page: page,
          })
          .then((res) => {
            if (res.items.length > 0)
              setReservations((prev: any) => [...prev, ...res.items]);
            else setHasMoreData(false);
          })
          .catch((err) => {
            message.error('Error');
          })
          .finally(() => {
            setLoading(false);
          });
      };
      getReservations();
    }, [page]);

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

    const handleScroll = (e) => {
      const container = e.target;
      if (
        container.scrollHeight - container.scrollTop ===
        container.clientHeight
      ) {
        // Cargar más datos
        if (hasMoreData) setPage((prev) => prev + 1);
        else setLoading(false);
      }
    };

    const changeStatusReservation = (
      reservationId: string,
      status: ReservationStatus,
    ) => {
      // Encuentra el índice del ticket que ha sido cancelado
      const index = reservations.findIndex(
        (res: any) => res.id === reservationId,
      );

      // Crea una copia del array de reservaciones
      const updatedReservations: any = [...reservations];

      // Actualiza el estado del ticket cancelado
      if (index !== -1) {
        updatedReservations[index].status = status;
      }
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
                  setReservations={setReservations}
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
                  reservation={reservation}
                  index={index}
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
