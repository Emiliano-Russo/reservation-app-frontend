import React, { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
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

const Reservations = withAuth(
  withPageLayout(() => {
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState<IReservation[]>([]); // Estado para las reservaciones
    const user = useSelector((state: any) => state.user.user);

    useEffect(() => {
      const reservationService = new ReservationService(REACT_APP_BASE_URL);

      // Obtenemos las reservaciones
      async function fetchReservations() {
        setLoading(true);
        try {
          reservationService
            .getReservationsByUserId(user.id)
            .then((userReservations) => {
              setReservations(userReservations);
            })
            .catch(() => {
              message.error('Error');
            })
            .finally(() => {
              setLoading(false);
            });
        } catch (error) {
          console.error('Error al obtener las reservaciones:', error);
        }
      }

      fetchReservations();
    }, [user.id]); // El hook se ejecuta cuando el componente se monta y cuando el userId cambie

    const sortedTickets = reservations.sort(
      (a: any, b: any) =>
        new Date(b.reservationDate).getTime() -
        new Date(a.reservationDate).getTime(),
    );

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
        {!loading && sortedTickets.length == 0 && (
          <p style={{ textAlign: 'center' }}>Sin Reservas</p>
        )}
        <div className={styles.ticketsContainer}>
          {sortedTickets.map((reservation: any, index: number) => {
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
  }, '0px'),
);

export default Reservations;
