import React, { useEffect, useState } from 'react';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import {
  Image,
  Typography,
  Rate,
  Tabs,
  Button,
  List,
  Avatar,
  Spin,
  Modal,
} from 'antd';
import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import styles from './Business.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { ReservationService } from '../../../services/reservation.service';
import { UserService } from '../../../services/user.service';
import {
  IAvailability,
  IBusiness,
} from '../../../interfaces/business/business.interface';
import { useSelector } from 'react-redux';
import { getDayValue, weekDayToSpanish } from '../../../utils/dateFormat';
import { IReservation } from '../../../interfaces/reservation/reservation.interface';
import { DayAvailability } from '../../../components/DayAvailability/DayAvailability';
import { WeekDays } from '../../../interfaces/weekday.enum';
import { RootState } from '../../../redux/store';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const businessService = new BusinessService(REACT_APP_BASE_URL);
const reservationService = new ReservationService(REACT_APP_BASE_URL);
const userService = new UserService(REACT_APP_BASE_URL);

export const Business = withPageLayout(
  () => {
    const { id } = useParams<any>(); // Obtener el id desde la URL
    const myUser = useSelector((state: RootState) => state.user.user);
    if (id === undefined) return <h1>No Business Found</h1>;
    const nav = useNavigate();
    const [business, setBusiness] = useState<IBusiness | null>(null);
    const [reservations, setReservations] = useState<IReservation[]>([]);
    const [reservationWithReview, setReservationWithReview] = useState<
      IReservation[]
    >([]);
    const [registerFirstModal, setRegisterFirstModal] = useState(false);
    const [loading, setLoading] = useState(true);
    // console.log('reservationWithReview ', reservationWithReview);
    console.log('RESERVATIONS: ', reservations);

    useEffect(() => {
      fetchBusinessDetails();
    }, [id]);

    if (business == null) {
      return (
        <>
          <Spin style={{ marginTop: '100px' }} />
        </>
      );
    }

    async function fetchBusinessDetails() {
      try {
        if (id) {
          const businessData = await businessService.getBusiness(id);
          setBusiness(businessData);
          const reservationData =
            await reservationService.getReservationsByBusinessId(
              businessData.id,
              { limit: 5, page: 1 },
            );
          const items = reservationData.items;
          setReservations(items);
          const listReview = items.filter((val) => val.rating != null);
          setReservationWithReview(listReview);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    }

    function formatDateToSpanish(dateString) {
      const date = new Date(dateString);
      const months = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sept',
        'Oct',
        'Nov',
        'Dic',
      ];

      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${day} ${month} ${year} ${hours}:${minutes}`;
    }

    return (
      <>
        <FadeFromTop>
          {!loading && <Image
            width="100%"
            height="40vh"
            src={business.banner}
            alt="Business Banner"
            style={{ objectFit: 'cover' }} /> }
          {loading && <Spin size='large' style={{ marginTop: '10rem' }} />}
          
        </FadeFromTop>

        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => nav(-1)}
          style={{
            position: 'absolute',
            color: 'black',
            top: 'calc(env(safe-area-inset-top) + 10px)',
            left: '10px',
          }}
        />

        <div className={styles.businessDetails}>
          <FadeFromTop>
            <Title level={2}>{business.name}</Title>
          </FadeFromTop>

          <FadeFromTop>
            <div className={styles.businessLocation}>
              <EnvironmentOutlined />
              <span>{business.address}</span>
            </div>
          </FadeFromTop>
          <FadeFromTop>
            <div style={{ marginTop: '15px' }}>
              <span style={{ marginRight: '10px'}}>
                {business.averageRating}
              </span>
              <Rate allowHalf defaultValue={business.averageRating} />
            </div>
          </FadeFromTop>
          <AnimatedFromLeft>
            <Tabs
              id="BusinessTabs"
              defaultActiveKey="1"
              className={styles.businessTabs}
            >
              <TabPane tab="Detalles" key="1">
                <Paragraph>{business.description}</Paragraph>
              </TabPane>

              <TabPane tab="Reseñas" key="2">
                <List
                  dataSource={reservationWithReview}
                  renderItem={(item: IReservation) => (
                    <div className={styles.review}>
                      <div className={styles.reviewHeader}>
                        <Avatar src={item.user.profileImage} />
                        <span className={styles.author}>{item.user.name}</span>
                        <Rate disabled defaultValue={item.rating} />
                      </div>
                      <p>{item.comment}</p>
                      <span className={styles.datetime}>
                        {formatDateToSpanish(item.createdAt)}
                      </span>
                    </div>
                  )}
                />
              </TabPane>

              <TabPane tab="Horarios" key="3">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: '0px 20px',
                  }}
                >
                  {business.availability
                    .sort((a, b) => getDayValue(a.day) - getDayValue(b.day))
                    .map((av) => (
                      <DayAvailability availability={av} />
                    ))}
                </div>
              </TabPane>
            </Tabs>
          </AnimatedFromLeft>

          <Button
            type="primary"
            style={{ margin: 'auto 0px 0px 0px' }}
            onClick={() => {
              if (myUser) {
                nav(`/new-reservation/${id}`);
              } else {
                setRegisterFirstModal(true);
              }
            }}
          >
            Reservar
          </Button>
          <Modal
            footer={
              <div>
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    setRegisterFirstModal(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    nav('/signin');
                  }}
                >
                  Unirme
                </Button>
              </div>
            }
            open={registerFirstModal}
            onCancel={() => {
              setRegisterFirstModal(false);
            }}
          >
            <h2>¡Únete a nuestra comunidad para hacer tus reservas!</h2>
          </Modal>
        </div>
      </>
    );
  },
  '0px',
  false,
);
