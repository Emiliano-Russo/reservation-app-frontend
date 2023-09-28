import { Tabs, List, Avatar, Rate, Typography } from 'antd';
import Footer from '../../../components/Footer/Footer';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import styles from './Home.module.css';
import {
  BasicProfileInfoWidget,
  SectionLine,
} from '../../User/Profile/Profile';
import { FeedbackCard } from '../../../components/FeedbackCard/FeedBackCard';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { useEffect, useState } from 'react';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { ReservationService } from '../../../services/reservation.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { iconLoyaltyPoints } from '../../../utils/config';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const reservationService = new ReservationService(REACT_APP_BASE_URL);

const Summary = () => {
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [amountReservations, setAmountReservations] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [lastReview, setLastReview] = useState<
    | { avatarUrl: string; name: string; rating: number; comment: string }
    | undefined
  >(undefined);

  const business = useSelector(
    (state: RootState) => state.business.currentBusiness,
  );

  const user = useSelector((state: RootState) => state.user.user);

  if (!business || !user) return <h1>Error sin datos</h1>;

  useEffect(() => {
    console.log('setting inner height');
    fetchReservationsForToday();
    fetchTotalReservations();
    setInnerHeight(window.innerHeight);
    fetchLastReview();
  }, []);

  const fetchReservationsForToday = () => {
    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
    ).toISOString();
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    ).toISOString();
    reservationService
      .getReservationsByBusinessId(
        business.id,
        { limit: 10, page: 1 },
        '',
        startDate,
        endDate,
      )
      .then((list) => {
        console.log('LIST', list);
        setAmountReservations(list.items.length);
      });
  };

  const fetchTotalReservations = () => {
    reservationService
      .getReservationsByBusinessId(business.id, { limit: 1, page: 1 })
      .then((val) => {
        setTotalReservations(val.total);
      });
  };

  const fetchLastReview = () => {
    reservationService.getLastReviewByBusinessId(business.id).then((val) => {
      if (!val) return;
      console.log('setteando el objeto jiji');
      const obj = {
        avatarUrl: val.user.profileImage,
        name: val.user.name,
        rating: val.rating,
        comment: val.comment,
      };
      console.log(obj);

      setLastReview(obj);

      // name={'Pepito'}
      // rating={3}
      // comment={'El lugar es normal, pero lindo'}
    });
  };

  const icons = [
    {
      icon: (
        <p style={{ fontSize: '18px', color: 'red' }}>{totalReservations}</p>
      ),
      label: 'Reservas',
      value: 'Reservas Totales',
    },
    {
      icon: (
        <p
          style={{
            fontSize: '18px',
            color: 'red',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {user.loyaltyPoints}{' '}
          <img
            src={iconLoyaltyPoints}
            alt="Loyalty Points Icon"
            style={{ width: '24px', marginLeft: '5px' }}
          />
        </p>
      ),
      label: 'XP',
      value: 'Puntos de Fidelidad',
    },
  ];

  return (
    <div className={styles.summary}>
      <AnimatedFromLeft>
        <div
          id="amount"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10px',
            padding: '0px 10px',
          }}
        >
          <p
            style={{
              fontSize: innerHeight > 700 ? '60px' : '40px',
              margin: '0px',
              marginRight: '30px',
              color: ' #fd6f8e',
            }}
          >
            {amountReservations}
          </p>
          <div id="verticalBar"></div>
          <p style={{ margin: '0px' }}>Reservas para el dia de hoy</p>
        </div>
      </AnimatedFromLeft>
      <GrowsFromLeft>
        <BasicProfileInfoWidget icons={icons} />
      </GrowsFromLeft>
      <AnimatedFromLeft>
        <SectionLine title={'Feedback'} />
      </AnimatedFromLeft>
      <GrowsFromLeft>
        {lastReview ? (
          <FeedbackCard
            avatarUrl={lastReview.avatarUrl}
            name={lastReview.name}
            rating={lastReview.rating}
            comment={lastReview.comment}
          />
        ) : (
          <p style={{ textAlign: 'center' }}>Aún no hay feedback</p>
        )}
      </GrowsFromLeft>
    </div>
  );
};

export const BusinessHome = withPageLayout(
  () => {
    return (
      <div style={{ padding: '0px 10px' }}>
        <GrowsFromLeft>
          <Tabs
            defaultActiveKey="1"
            style={{
              height: '80vh',
              marginTop: '30px',
              padding: '10px',
            }}
          >
            <TabPane tab="Resumen" key="1">
              <Summary />
            </TabPane>

            <TabPane tab="Estadísticas" key="2">
              <FadeFromTop>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <img
                    src="https://img.icons8.com/external-justicon-lineal-justicon/64/external-working-working-from-home-justicon-lineal-justicon.png"
                    alt="Trabajando en ello"
                    style={{ width: '64px', marginBottom: '20px' }}
                  />
                  <Paragraph>
                    <strong>
                      Estamos trabajando en las estadísticas para ti.
                    </strong>
                  </Paragraph>
                  <Paragraph>
                    ¡Gracias por tu paciencia! Muy pronto tendrás acceso a datos
                    interesantes y útiles.
                  </Paragraph>
                </div>
              </FadeFromTop>
            </TabPane>
          </Tabs>
        </GrowsFromLeft>
      </div>
    );
  },
  '0px',
  true,
  true,
);
