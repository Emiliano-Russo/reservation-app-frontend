import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ReservationCard } from '../../components/ReservationCard/ReservationCard';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import Footer from '../../components/Footer/Footer';
import SearchInput from '../../components/SearchInput/SearchInput';
import styles from './Reservations.module.css';
import { ReservationService } from '../../services/reservation.service';
import { REACT_APP_BASE_URL } from '../../../env';

const Reservations = withPageLayout(() => {
  const [reservations, setReservations] = useState([]); // Estado para las reservaciones
  const userId = 'diego123'; // Aquí debes obtener el userId, ya sea desde el contexto, props o cualquier otro método que utilices

  useEffect(() => {
    // Creamos una instancia del servicio
    const reservationService = new ReservationService(REACT_APP_BASE_URL); // Asegúrate de reemplazar 'BASE_URL' por la URL base de tu backend

    // Obtenemos las reservaciones
    async function fetchReservations() {
      try {
        const userReservations =
          await reservationService.mock_getReservationsByUserId(userId);
        console.log(
          'the reservations with the user id: ',
          userId,
          ' are : ',
          userReservations,
        );
        setReservations(userReservations);
      } catch (error) {
        console.error('Error al obtener las reservaciones:', error);
      }
    }

    fetchReservations();
  }, [userId]); // El hook se ejecuta cuando el componente se monta y cuando el userId cambie

  const sortedTickets = reservations.sort(
    (a: any, b: any) =>
      b.reservationDate.getTime() - a.reservationDate.getTime(),
  );

  return (
    <>
      <div className={styles.header}>
        <p className={styles.headerText}>Reservas Solicitadas</p>
        <button>Filtros</button>
      </div>
      <SearchInput />
      <div className={styles.ticketsContainer}>
        {sortedTickets.map((reservation: any) => (
          <ReservationCard key={reservation.id} {...reservation} />
        ))}
      </div>
      <Footer style={{ margin: 'auto 1.25rem 1.25rem 1.25rem' }} />
    </>
  );
}, '0px');

export default Reservations;
