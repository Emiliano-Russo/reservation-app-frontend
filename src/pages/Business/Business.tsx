import React, { useEffect, useState } from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
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
import { BusinessService } from '../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { motion } from 'framer-motion';

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

// Las animaciones
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideInLeft = {
  hidden: { x: '-100vw' },
  visible: { x: 0 },
};

const slideInUp = {
  hidden: { y: '100vh' },
  visible: { y: 0 },
};

const pulse = {
  hidden: { scale: 0.95 },
  visible: { scale: 1 },
};

export const Business = withPageLayout(
  () => {
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
          <Spin style={{ marginTop: '100px' }} />
        </>
      );
    }

    return (
      <>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <Image
            width="100%"
            height="40vh"
            src={business.multimediaURL[0]}
            alt="Business Banner"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>

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

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInLeft}
          transition={{ duration: 0.5 }}
          className={styles.businessDetails}
        >
          <Title level={2}>{business.name}</Title>

          <div className={styles.businessLocation}>
            <EnvironmentOutlined />
            <motion.span variants={slideInLeft}>{business.address}</motion.span>
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
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className={styles.review}
                  >
                    <div className={styles.reviewHeader}>
                      <Avatar src={item.avatar} />
                      <span className={styles.author}>{item.author}</span>
                      <Rate disabled defaultValue={item.rating} />
                    </div>
                    <p>{item.content}</p>
                    <span className={styles.datetime}>{item.datetime}</span>
                  </motion.div>
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
        </motion.div>
      </>
    );
  },
  '0px',
  false,
);
