import React, { useState, useEffect, useRef } from 'react';
import { ReservationService } from '../../../services/reservation.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { useSelector } from 'react-redux';
import { ReservationList } from '../../../components/ReservationList/ReservationList';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { RootState } from '../../../redux/store';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export const UserReservations = withPageLayout(
  () => {
    const user = useSelector((state: RootState) => state.user.user);
    const nav = useNavigate();

    if (user == null) {
      return (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', // <-- Cambiado de 'alignContent' a 'alignItems'
          }}
        >
          <GrowsFromLeft>
            <h1 style={{ textAlign: 'center' }}>
              ¡Regístrese ahora para visualizar sus reservas!
            </h1>
          </GrowsFromLeft>
          <Button
            type="primary"
            onClick={() => {
              nav('/signin');
            }}
          >
            Unirme
          </Button>
        </div>
      );
    }

    const getReservationsByUserId = (
      id,
      options,
      searchTerm,
      start,
      end,
      status,
    ) => {
      return reservationService.getReservationsByUserId(
        id,
        options,
        searchTerm,
        start,
        end,
        status,
      );
    };

    return (
      <>
        <ReservationList
          id={user.id}
          isBusiness={false}
          getReservationsBy={getReservationsByUserId}
        />
      </>
    );
  },
  '0px',
  true,
  false,
);
