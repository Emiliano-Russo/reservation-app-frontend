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
} from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './Business.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { ReservationService } from '../../../services/reservation.service';
import { UserService } from '../../../services/user.service';
import { IBusiness } from '../../../interfaces/business/business.interface';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const businessService = new BusinessService(REACT_APP_BASE_URL);
const reservationService = new ReservationService(REACT_APP_BASE_URL);
const userService = new UserService(REACT_APP_BASE_URL);

export const Business = withPageLayout(
  () => {
    const { id } = useParams<any>(); // Obtener el id desde la URL
    const nav = useNavigate();
    const [business, setBusiness] = useState<IBusiness | null>(null);
    const [reservations, setReservations] = useState<any>(null);
    const [detailedReviews, setDetailedReviews] = useState<any[]>([]);

    useEffect(() => {
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
            setReservations(reservationData.items);
          }
        } catch (error) {
          console.error('Error fetching business data:', error);
        }
      }

      fetchBusinessDetails();
    }, [id]);

    useEffect(() => {
      if (reservations && reservations.length > 0) {
        const fetchUserDetailsForReviews = async () => {
          try {
            const userPromises = reservations.map(
              (reservation: any) => userService.getUser(reservation.userId), // Asumo que en 'review' hay un 'userId' que representa el autor de la reseña.
            );

            const userDetailsArray = await Promise.all(userPromises);
            console.log('tenemos todos los user: ', userDetailsArray);
            const mergedDetails = reservations.map(
              (review: any, index: number) => {
                return {
                  ...review,
                  author: userDetailsArray[index].name,
                  avatar: userDetailsArray[index].profileImage, // Asumo que la respuesta de 'getUser' contiene 'name' y 'profileImage'. Ajusta los nombres de acuerdo a tu API real.
                };
              },
            );

            setDetailedReviews(mergedDetails);
          } catch (error) {
            console.error('Error fetching user details for reviews:', error);
          }
        };

        fetchUserDetailsForReviews();
      }
    }, [reservations]);

    if (business == null) {
      return (
        <>
          <Spin style={{ marginTop: '100px' }} />
        </>
      );
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
          <Image
            width="100%"
            height="40vh"
            src={business.banner}
            alt="Business Banner"
            style={{ objectFit: 'cover' }}
          />
        </FadeFromTop>

        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => nav(-1)}
          style={{
            position: 'absolute',
            color: 'black',
            top: '10px',
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
            <div>
              <span style={{ marginRight: '10px' }}>
                {business.averageRating}
              </span>
              <Rate allowHalf defaultValue={business.averageRating} />
            </div>
          </FadeFromTop>
          <AnimatedFromLeft>
            <Tabs defaultActiveKey="1" className={styles.businessTabs}>
              <TabPane tab="Detalles" key="1">
                <Paragraph>{business.description}</Paragraph>
              </TabPane>

              <TabPane tab="Reseñas" key="2">
                <List
                  dataSource={detailedReviews}
                  renderItem={(item: any) => (
                    <div className={styles.review}>
                      <div className={styles.reviewHeader}>
                        <Avatar src={item.avatar} />
                        <span className={styles.author}>{item.author}</span>
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
            </Tabs>
          </AnimatedFromLeft>

          <Button
            type="primary"
            style={{ margin: 'auto 0px 0px 0px' }}
            onClick={() => {
              nav(`/new-reservation/${id}`);
            }}
          >
            Reservar
          </Button>
        </div>
      </>
    );
  },
  '0px',
  false,
);
