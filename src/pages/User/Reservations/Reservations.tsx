import React, { useState, useEffect, useRef } from 'react';
import { Button, Spin, message } from 'antd';
import { ReservationCard } from '../../../components/ReservationCard/ReservationCard';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import SearchInput from '../../../components/SearchInput/SearchInput';
import styles from './Reservations.module.css';
import { ReservationService } from '../../../services/reservation.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { withAuth } from '../../../wrappers/WithAuth';
import { useSelector } from 'react-redux';
import { ReservationStatus } from '../../../interfaces/reservation.status';
import { NegotiableCard } from '../../../components/NegotiableCard/NegotiableCard';
import { IReservation } from '../../../interfaces/reservation.interface';

const reservationService = new ReservationService(REACT_APP_BASE_URL);

const limitPerPage = '5';

interface LastKey {
  userId: string;
  id: string;
  createdAt: number;
}

const Reservations = withAuth(
  withPageLayout(() => {
    const user = useSelector((state: any) => state.user.user);
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState<IReservation[]>([]); // Estado para las reservaciones
    const lastKeyRef = useRef<undefined | LastKey>(undefined);
    const [isFetching, setIsFetching] = useState(false);

    async function fetchReservations() {
      if (isFetching) return; // Si ya está cargando, no hagas nada

      setIsFetching(true);
      console.log('we are about to stringify key: ', lastKeyRef.current);

      try {
        const userReservations =
          await reservationService.getReservationsByUserId(
            user.id,
            limitPerPage,
            JSON.stringify(lastKeyRef.current),
          );

        console.log('# User Reservations', userReservations);

        if (userReservations.lastKey) {
          console.log('setting lastKey.....', userReservations.lastKey);
          lastKeyRef.current = userReservations.lastKey;
        } else {
          lastKeyRef.current = undefined;
        }

        setReservations((prev) => [...prev, ...userReservations.items]);
      } catch (error) {
        //message.error('Error');
        console.error('Error al obtener las reservaciones:', error);
      } finally {
        setIsFetching(false);
      }
    }

    const containerRef = useRef<any>(null); // Referencia al contenedor

    useEffect(() => {
      fetchReservations();
      console.log('bottom screen');
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
        fetchReservations();
      }
    };

    // const sortedTickets = reservations.sort(
    //   (a: any, b: any) =>
    //     new Date(b.reservationDate).getTime() -
    //     new Date(a.reservationDate).getTime(),
    // );

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
        setReservations(updatedReservations);
      }
    };

    return (
      <>
        <FadeFromTop>
          <div className={styles.header}>
            <p className={styles.headerText}>Reservas Solicitadas</p>
            <button>Filtros</button>
          </div>
        </FadeFromTop>
        <SearchInput />

        {loading && <Spin style={{ marginTop: '100px' }} />}
        {!loading && reservations.length == 0 && (
          <p style={{ textAlign: 'center' }}>Sin Reservas</p>
        )}
        <div className={styles.ticketsContainer} ref={containerRef}>
          {reservations.map((reservation: any, index: number) => {
            if (reservation.negotiable)
              return (
                <NegotiableCard
                  index={index}
                  isBusiness={false}
                  reservation={reservation}
                  setReservations={setReservations}
                />
              );
            else
              return (
                <ReservationCard
                  {...reservation}
                  index={index}
                  changeStatusReservation={changeStatusReservation}
                />
              );
          })}
        </div>
      </>
    );
  }, '0px'),
);

export default Reservations;
