import React, { useState, useEffect, useRef } from 'react';
import { ReservationService } from '../../../services/reservation.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { useSelector } from 'react-redux';
import { ReservationList } from '../../../components/ReservationList/ReservationList';
import { withPageLayout } from '../../../wrappers/WithPageLayout';

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export const UserReservations = withPageLayout(
  () => {
    const userId = useSelector((state: any) => state.user.user.id);

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
          id={userId}
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
