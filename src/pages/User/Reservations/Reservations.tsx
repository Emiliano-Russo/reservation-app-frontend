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

const limitPerPage = 7;

const Reservations = withAuth(
  withPageLayout(() => {
    const user = useSelector((state: any) => state.user.user);
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [loading, setLoading] = useState(true);

    const containerRef = useRef<any>(null); // Referencia al contenedor

    useEffect(() => {
      const getReservations = async () => {
        if (hasMoreData == false) return;
        const reservations = await reservationService.getReservationsByUserId(
          user.id,
          {
            limit: limitPerPage,
            page: page,
          },
        );
        setLoading(false);
        if (reservations.items.length > 0)
          setReservations((prev: any) => [...prev, ...reservations.items]);
        else setHasMoreData(false);
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
                  reservation={reservation}
                  index={index}
                  changeStatusReservation={changeStatusReservation}
                  isBusiness={false}
                />
              );
          })}
        </div>
      </>
    );
  }, '0px'),
);

export default Reservations;
