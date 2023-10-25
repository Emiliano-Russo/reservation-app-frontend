import React, { useState, useEffect, useRef } from 'react';
import { ReservationService } from '../../../services/reservation.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { useSelector } from 'react-redux';
import { ReservationList } from '../../../components/ReservationList/ReservationList';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { RootState } from '../../../redux/store';
import { RegistrationPopUp } from '../../../components/RegistrationPopUp/RegistrationPopUp';

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export const UserReservations = withPageLayout(
  () => {
    const user = useSelector((state: RootState) => state.user.user);
    const userId = user != null ? useSelector((_) => user.id) : user;

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
      user != null ? <>
        <ReservationList
          id={userId}
          isBusiness={false}
          getReservationsBy={getReservationsByUserId}
        />
      </> : <RegistrationPopUp navigate={true} />
    );
  },
  '0px',
  true,
  false,
);
