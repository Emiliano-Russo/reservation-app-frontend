import React, { useState, useEffect } from 'react';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { IonDatetime } from '@ionic/react';
import { Button, message, DatePicker, Spin } from 'antd';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';
import styles from './NewReservation.module.css';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessTypeService } from '../../../services/businessType.service';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { useSelector } from 'react-redux';
import { ReservationService } from '../../../services/reservation.service';
import { Controls } from './Controls';
import { ReservationModal } from './ReservationModal';
import { ConfirmationModal } from './ConfirmationModal';
import { useBusinessDetails } from '../../../hooks/useBusinessDetails';
import { TwoStepReservation } from './TwoStepReservation';
import { SingleStepReservation } from './SingleStepReservation';
const { RangePicker } = DatePicker;

const reservationService = new ReservationService(REACT_APP_BASE_URL);
const businessService = new BusinessService(REACT_APP_BASE_URL);
const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);

export const NewReservation = withPageLayout(
  () => {
    const [controlValues, setControlValues] = useState<any>(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    const [innerHeight, setInnerHeight] = useState<number>(0);
    const [doneModal, setDoneModal] = useState(false);
    const [creatingReservation, setCreatingReservation] = useState(false);

    const { id } = useParams<any>();
    const user = useSelector((state: any) => state.user.user);
    const nav = useNavigate();
    const { business, businessType, loading, error } = useBusinessDetails(id);

    useEffect(() => {
      console.log('setting inner height');
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

    console.log('business: ', business);
    console.log('businessType: ', businessType);

    const createReservation = () => {
      setCreatingReservation(true);
      const create_dto = {
        date: controlValues.date,
        userId: user.id,
        businessId: business.id,
        status: 'Pending',
        extras: controlValues.extras,
      };
      reservationService
        .createReservation(create_dto)
        .then((data) => {
          console.log('listo!');
          setModalOpen(false);
          setDoneModal(true);
        })
        .catch(() => {
          setModalOpen(false);
          message.error('Error!');
        });
    };

    console.log('control values: ', controlValues);

    return (
      <>
        <GrowsFromLeft>
          <BackNavigationHeader title={business ? business.name : 'Reserva'} />
        </GrowsFromLeft>

        {innerHeight < 680 && businessType[0].controls ? (
          <TwoStepReservation
            businessType={businessType}
            controlValues={controlValues}
            creatingReservation={creatingReservation}
            setControlValues={setControlValues}
            setModalOpen={setModalOpen}
          />
        ) : (
          <SingleStepReservation
            businessType={businessType}
            controlValues={controlValues}
            creatingReservation={creatingReservation}
            setControlValues={setControlValues}
            setModalOpen={setModalOpen}
          />
        )}

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
