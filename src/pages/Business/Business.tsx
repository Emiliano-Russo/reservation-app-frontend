import React from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { Image, Typography, Rate, Tabs, Button, List, Avatar } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import styles from './Business.module.css';

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

export const Business = withPageLayout(() => {
  return (
    <>
      {/* Banner Image */}
      <Image
        width="100%"
        height="40vh"
        src="https://media-cdn.tripadvisor.com/media/photo-s/16/eb/43/cc/hard-rock-cafe-montevideo.jpg"
        alt="Business Banner"
        style={{ objectFit: 'cover' }}
      />

      {/* Business Details */}
      <div className={styles.businessDetails}>
        <Title level={2}>Hard Rock Cafe</Title>
        <div className={styles.businessLocation}>
          <EnvironmentOutlined />
          <span>Av. Saborcito 1234</span>
        </div>
        <Rate allowHalf defaultValue={4.5} />
        <Tabs defaultActiveKey="1" className={styles.businessTabs}>
          <TabPane tab="Detalles" key="1">
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              accumsan leo a velit convallis, eu hendrerit velit fermentum.
              Fusce at accumsan ligula, eget consequat nisl. Sed eu lacinia
              orci. ... Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed accumsan leo a velit convallis, eu hendrerit velit fermentum.
              Fusce at accumsan ligula, eget consequat nisl. Sed eu lacinia
              orci.
            </Paragraph>
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
        <Button type="primary" style={{ margin: 'auto 0px 0px 0px' }}>
          Reservar
        </Button>
      </div>
    </>
  );
}, '0px');
