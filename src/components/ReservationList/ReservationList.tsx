import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Spin, message } from 'antd'; // Asumiendo que estás usando Ant Design
import styles from './ReservationList.module.css';
import {
  IReservation,
  ReservationStatus,
} from '../../interfaces/reservation/reservation.interface';
import { FadeFromTop } from '../../animations/FadeFromTop';
import SearchInput from '../SearchInput/SearchInput';
import { ModalReservationsFilters } from '../ModalReservationFilters/ModalReservationFilters';
import { NegotiableCard } from '../NegotiableCard/NegotiableCard';
import { ReservationCard } from '../ReservationCard/ReservationCard';
import { PaginatedResponse } from '../../interfaces/pagination.dto';
import { RootState } from '../../redux/store';

const limitPerPage = 7;

interface Props {
  id: string;
  isBusiness: boolean;
  getReservationsBy: (
    id: any,
    options: any,
    searchTerm: any,
    start: any,
    end: any,
    status: any,
  ) => Promise<PaginatedResponse<IReservation>>;
}

export const ReservationList = (props: Props) => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const userState = useSelector((state: RootState) => state.user.user);

  const containerRef = useRef<any>(null);

  useEffect(() => {
    getReservations(searchValue, startDate, endDate, selectedStatus);
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

  useEffect(() => {
    setPage(1);
    setReservations([]);
    console.log('setting true');
    setHasMoreData(true);
    getReservations(searchValue, startDate, endDate, selectedStatus);
  }, [searchValue]);

  const getReservations = async (
    searchTerm = '',
    start = '',
    end = '',
    status = '',
  ) => {
    console.log('has more data: ', hasMoreData ? 'true' : 'false');
    if (hasMoreData == false && searchTerm != '') return;
    const reservations = await props.getReservationsBy(
      props.id,
      {
        limit: limitPerPage,
        page: page,
      },
      searchTerm,
      start,
      end,
      status,
    );
    setLoading(false);
    if (reservations.items.length > 0) {
      setReservations((prev: any) => {
        const combined = [...prev, ...reservations.items];
        return combined.filter(
          (reservation, index, self) =>
            index === self.findIndex((r) => r.id === reservation.id),
        );
      });
    } else {
      setHasMoreData(false);
      console.log('setting false');
    }
  };

  const handleScroll = (e) => {
    const container = e.target;
    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      if (hasMoreData) setPage((prev) => prev + 1);
      else setLoading(false);
    }
  };

  const changeStatusReservation = (
    reservationId: string,
    status: ReservationStatus,
  ) => {
    const index = reservations.findIndex(
      (res: any) => res.id === reservationId,
    );
    const updatedReservations: any = [...reservations];
    if (index !== -1) {
      updatedReservations[index].status = status;
    }
    setReservations(updatedReservations);
  };

  const applyFilters = (
    start: Date | null,
    end: Date | null,
    status: ReservationStatus | null,
  ) => {
    setHasMoreData(true);
    if (start && end) {
      setStartDate(start.toISOString());
      setEndDate(end.toISOString());
    }
    if (status) setSelectedStatus(status);
    setPage(1);
    setReservations([]);
    getReservations(
      searchValue,
      start?.toISOString(),
      end?.toISOString(),
      status ? status : '',
    );
    setModalOpen(false);
  };

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedStatus('');
    setHasMoreData(true);
    setPage(1);
    setReservations([]);
    getReservations(searchValue, '', '', '');
    setModalOpen(false);
  };

  const addRateReservation = (id: string, rating: number, comment: string) => {
    // Encuentra el índice del ticket que ha sido cancelado
    const index = reservations.findIndex((res: any) => res.id === id);

    // Crea una copia del array de reservaciones
    const updatedReservations = [...reservations];

    // Actualiza el estado del ticket cancelado
    if (index !== -1) {
      updatedReservations[index].rating = rating;
      updatedReservations[index].comment = comment;
    }

    // Actualiza el estado con el nuevo array
    setReservations(updatedReservations);
  };

  return (
    <>
      <FadeFromTop>
        <div className={styles.header}>
          <p className={styles.headerText}>Reservas Solicitadas</p>
          <button onClick={() => setModalOpen(true)}>Filtros</button>
        </div>
      </FadeFromTop>
      <SearchInput
        placeholder="Buscar reservas..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {loading && <Spin style={{ marginTop: '100px' }} />}
      {!loading && reservations.length === 0 && (
        <p style={{ textAlign: 'center' }}>Sin Reservas</p>
      )}
      <div className={styles.ticketsContainer} ref={containerRef}>
        {reservations.map((reservation, index) => {
          if (reservation.negotiable) {
            return (
              <NegotiableCard
                setReservations={setReservations}
                index={index}
                isBusiness={props.isBusiness}
                reservation={reservation}
              />
            );
          } else {
            return (
              <ReservationCard
                isBusiness={props.isBusiness}
                key={reservation.id}
                reservation={reservation}
                index={index}
                changeStatusReservation={changeStatusReservation}
                addRateReservation={addRateReservation}
              />
            );
          }
        })}
      </div>
      <ModalReservationsFilters
        open={modalOpen}
        setModalOpen={setModalOpen}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
    </>
  );
};
