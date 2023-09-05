import React from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { Button, Typography, Input, Rate, Card, Avatar } from 'antd';
import { ArrowLeftOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import styles from './BusinessList.module.css';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useNavigate } from 'react-router-dom';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import { businesses } from '../../mocks/businessList';

const { Title } = Typography;
const Search = Input.Search;

// Datos de ejemplo para los negocios

export const BusinessList = withPageLayout(() => {
  const nav = useNavigate();

  return (
    <>
      <BackNavigationHeader title={'Restaurante'} />
      <div style={{ height: '20px' }}></div>
      <SearchInput placeholder="Buscar negocios..." />
      <div className={styles.businessContainer}>
        {businesses.map((business) => (
          <div className={styles.businessCard}>
            <div>
              <Avatar src={business.image} size={42}>
                E
              </Avatar>
              <p>{business.name}</p>
            </div>
            <div className={styles.rating}>
              <StarFilled style={{ color: 'gold' }} />
              <p>{business.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}, '0px');
