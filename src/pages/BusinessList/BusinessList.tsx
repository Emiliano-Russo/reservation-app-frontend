import React, { useEffect, useState } from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { Typography, Input, Avatar } from 'antd';
import { StarFilled } from '@ant-design/icons';
import styles from './BusinessList.module.css';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useNavigate, useParams } from 'react-router-dom';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import { BusinessService } from '../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../env';

const { Title } = Typography;
const Search = Input.Search;

const businessService = new BusinessService(REACT_APP_BASE_URL);

export const BusinessList = withPageLayout(() => {
  const nav = useNavigate();
  const { type } = useParams(); // Aquí estamos obteniendo el typeId desde la URL
  console.log('we got the typeId: ', type);

  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    async function fetchBusinesses() {
      if (type) {
        const businessesByType =
          await businessService.mock_GetBusinessesByTypeId(type);
        setBusinesses(businessesByType);
      } else {
        setBusinesses([]);
      }
    }

    fetchBusinesses();
  }, [type]); // Agregamos typeId como dependencia para que useEffect se ejecute nuevamente si cambia.

  return (
    <>
      <BackNavigationHeader title={'Restaurante'} />
      <div style={{ height: '20px' }}></div>
      <SearchInput placeholder="Buscar negocios..." />
      <div className={styles.businessContainer}>
        {businesses.map((business: any) => (
          <div
            key={business.id}
            className={styles.businessCard}
            onClick={() => {
              nav(`/business/${type}/${business.id}`);
            }}
          >
            <div>
              <Avatar src={business.logoURL} size={42}>
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
