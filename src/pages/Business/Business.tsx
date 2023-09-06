import React, { useEffect, useState } from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { Image, Typography, Rate, Tabs, Button, List, Avatar } from 'antd';
import { ArrowLeftOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './Business.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessService } from '../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../env';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

// Datos de ejemplo para las reseñas
const reviews = [
  {
    author: 'Juan Pérez',
    avatar: 'URL_DEL_AVATAR',
    content: '¡Gran lugar! La comida y el ambiente son increíbles.',
    datetime: 'Hace 3 días',
    rating: 4,
  },
  {
    author: 'Saborcito Orgaz',
    avatar: 'URL_DEL_AVATAR',
    content: '¡Gran lugar! La comida y el ambiente son increíbles.',
    datetime: 'Hace 3 días',
    rating: 4,
  },
];

const businessService = new BusinessService(REACT_APP_BASE_URL);

export const Business = withPageLayout(() => {
  const { id } = useParams<any>(); // Obtener el id desde la URL
  const nav = useNavigate();
  const [business, setBusiness] = useState<any>(null);

  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        if (id) {
          const businessData = await businessService.mock_GetBusiness(id);
          setBusiness(businessData);
          console.log('businessData ', businessData);
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    }

    fetchBusinessDetails();
  }, [id]);

  if (business == null) {
    return (
      <>
        <h1>No se encontro el negocio</h1>
      </>
    );
  }

  return (
    <>
      {/* Banner Image */}
      <Image
        width="100%"
        height="40vh"
        src={business.multimediaURL[0]}
        alt="Business Banner"
        style={{ objectFit: 'cover' }}
      />
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

      {/* Business Details */}
      <div className={styles.businessDetails}>
        <Title level={2}>{business.name}</Title>
        <div className={styles.businessLocation}>
          <EnvironmentOutlined />
          <span>{business.address}</span>
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>{business.rating}</span>
          <Rate allowHalf defaultValue={business.rating} />
        </div>
        <Tabs defaultActiveKey="1" className={styles.businessTabs}>
          <TabPane tab="Detalles" key="1">
            <Paragraph>{business.description}</Paragraph>
          </TabPane>
          <TabPane tab="Reseñas" key="2">
            <List
              dataSource={reviews}
              renderItem={(item) => (
                <div className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <Avatar src={item.avatar} />
                    <span className={styles.author}>{item.author}</span>
                    <Rate disabled defaultValue={item.rating} />
                  </div>
                  <p>{item.content}</p>
                  <span className={styles.datetime}>{item.datetime}</span>
                </div>
              )}
            />
          </TabPane>
        </Tabs>
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
}, '0px');
