import React, { useState, useEffect } from 'react';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { Button, message, DatePicker, Spin } from 'antd';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessTypeService } from '../../../services/businessType.service';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { useSelector } from 'react-redux';
import { ReservationService } from '../../../services/reservation.service';
import { ReservationModal } from './ReservationModal';
import { ConfirmationModal } from './ConfirmationModal';
import { useBusinessDetails } from '../../../hooks/useBusinessDetails';
import { SingleStepReservation } from './SingleStepReservation';
import { ReservationType } from './ReservationType';
import { INegotiable } from '../../../interfaces/reservation/negotiable.interace';

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export interface ControlValue {
  date?: Date;
  extras: any[];
  negotiable?: INegotiable;
}

export const NewReservation = withPageLayout(
  () => {
    const [controlValues, setControlValues] = useState<
      ControlValue | undefined
    >(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    const [innerHeight, setInnerHeight] = useState<number>(0);
    const [doneModal, setDoneModal] = useState(false);
    const [creatingReservation, setCreatingReservation] = useState(false);
    const [dayTypeSelection, setTypeDaySelection] = useState(null);
    const [hourTypeSelection, setHourTypeSelection] = useState(null);

    const { id } = useParams<any>();
    const user = useSelector((state: any) => state.user.user);
    const nav = useNavigate();
    const { business, businessType, loading, error } = useBusinessDetails(id);

    useEffect(() => {
      setInnerHeight(window.innerHeight);
    }, []);

    if (loading) {
      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
          }}
        >
          <Spin />
        </div>
      );
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    const createReservation = () => {
      if (!controlValues) return;
      setCreatingReservation(true);
      const create_dto = {
        date: controlValues.date,
        userId: user.id,
        businessId: business.id,
        extras: controlValues.extras,
        negotiable: controlValues.negotiable,
      };
      reservationService
        .createReservation(create_dto)
        .then((data) => {
          setModalOpen(false);
          setDoneModal(true);
        })
        .catch((err) => {
          setModalOpen(false);
          console.error('$$$$$$$$$$ Error!', err);
        });
    };

    if (!hourTypeSelection || !dayTypeSelection)
      return (
        <ReservationType
          setDayTypeSelection={setTypeDaySelection}
          setHourTypeSelection={setHourTypeSelection}
        />
      );

    return (
      <>
        <GrowsFromLeft>
          <BackNavigationHeader title={business ? business.name : 'Reserva'} />
        </GrowsFromLeft>

        <SingleStepReservation
          businessType={businessType}
          controlValues={controlValues}
          creatingReservation={creatingReservation}
          setControlValues={setControlValues}
          setModalOpen={setModalOpen}
          hourTypeSelection={hourTypeSelection}
          dayTypeSelection={dayTypeSelection}
        />

        <ReservationModal
          creatingReservation={creatingReservation}
          business={business}
          controlValues={controlValues}
          createReservation={createReservation}
          loading={creatingReservation}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
        <ConfirmationModal
          doneModal={doneModal}
          nav={nav}
          setDoneModal={setModalOpen}
        />
      </>
    );
  },
  '0px',
  false,
);
