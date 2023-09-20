import React, { useState, useEffect } from 'react';
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

const limitPerPage = '1';

interface PagHistory {
  nro: number;
  lastKey: undefined | string;
}

const Reservations = withAuth(
  withPageLayout(() => {
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState<IReservation[]>([]); // Estado para las reservaciones
    const [pagHistory, setPagHistory] = useState<PagHistory[]>([
      { nro: 0, lastKey: undefined },
    ]);
    const [actualPageNro, setActualPageNro] = useState(0);
    const [showLastButton, setShowLastButton] = useState(true);

    const user = useSelector((state: any) => state.user.user);

    // Obtenemos las reservaciones
    async function fetchReservations() {
      console.log('---------------------------');
      setLoading(true);

      const lastKey = pagHistory.find((val) => val.nro == actualPageNro)
        ?.lastKey;

      if (lastKey == undefined && actualPageNro > 0) {
        setLoading(false);
        setShowLastButton(false);
      } else {
        setShowLastButton(true);
      }

      console.log('finding with limit', limitPerPage, ' lastkey ', lastKey);
      reservationService
        .getReservationsByUserId(user.id, limitPerPage, lastKey)
        .then((userReservations) => {
          console.log('data: ', userReservations);

          if (userReservations.lastKey)
            setPagHistory((prev) => {
              console.log('###### setting pag history #########');
              const index = prev.findIndex(
                (val) => val.lastKey == userReservations.lastKey.id,
              );
              console.log('index found ', index == -1 ? 'false' : 'true');

              const list = [
                {
                  nro: prev[prev.length - 1].nro + 1,
                  lastKey: userReservations.lastKey.id,
                },
              ];
              console.log('new list: ', list);
              if (index == -1) return [...prev, ...list];
              console.log('sending only prev');
              return prev;
            });
          setReservations(userReservations.items);
        })
        .catch(() => {
          message.error('Error');
        })
        .finally(() => {
          setLoading(false);
        });
    }

    useEffect(() => {
      fetchReservations();
    }, [user.id, actualPageNro]);

    const handlePreviousPage = () => {
      if (actualPageNro > 0) {
        setReservations([]);
        setActualPageNro((prev) => prev - 1);
      }
    };

    const handleNextPage = () => {
      setReservations([]);
      setActualPageNro((prev) => prev + 1);
    };

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 'auto',
            marginBottom: '10px',
          }}
        >
          <Button
            loading={loading}
            style={{ visibility: actualPageNro > 0 ? 'visible' : 'hidden' }}
            onClick={handlePreviousPage}
          >
            Atras
          </Button>
          <Button
            style={{
              visibility: !showLastButton ? 'hidden' : 'visible',
            }}
            loading={loading}
            onClick={handleNextPage}
          >
            Siguiente
          </Button>
        </div>
      </>
    );
  }, '0px'),
);

export default Reservations;
