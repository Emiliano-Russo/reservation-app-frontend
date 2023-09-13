import React, { useEffect, useState } from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { Typography, Input, Avatar, Spin } from 'antd';
import { StarFilled } from '@ant-design/icons';
import styles from './BusinessList.module.css';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useNavigate, useParams } from 'react-router-dom';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import { BusinessService } from '../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../env';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';
import { BusinessTypeService } from '../../services/businessType.service';

const { Title } = Typography;
const Search = Input.Search;

const businessService = new BusinessService(REACT_APP_BASE_URL);
const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);

export const BusinessList = withPageLayout(
  () => {
    const nav = useNavigate();
    const { type } = useParams(); // Aquí estamos obteniendo el typeId desde la URL
    console.log('we got the typeId: ', type);

    const [businessTypeName, setBusinessTypeName] = useState('');
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchBusinesses() {
        if (type) {
          const businessType = await businessTypeService.getBusinessType(type);
          console.log('we got businessType: ', businessType);
          setBusinessTypeName(businessType[0].name);
          const businessesByType =
            await businessService.getBusinessesByTypeId(type);
          console.log('business: ', businessesByType);
          setBusinesses(businessesByType);
        } else {
          setBusinesses([]);
        }
        setLoading(false);
      }

      fetchBusinesses();
    }, [type]); // Agregamos typeId como dependencia para que useEffect se ejecute nuevamente si cambia.

    return (
      <>
        <AnimatedFromLeft>
          <BackNavigationHeader title={businessTypeName} />
          <div style={{ height: '20px' }}></div>
        </AnimatedFromLeft>
        <SearchInput placeholder="Buscar negocios..." />
        {loading == false && businesses.length == 0 ? (
          <h6 style={{ textAlign: 'center' }}>
            Todavía no tenemos negocios registrados. ¡Pero estamos en ello!
          </h6>
        ) : null}

        {loading && <Spin style={{ marginTop: '100px' }} />}
        <div className={styles.businessContainer}>
          {businesses.map((business: any, index: number) => (
            <AnimatedFromLeft delay={index * 0.1} key={business.id}>
              <div
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
                  <p>{business.averageRating}</p>
                </div>
              </div>
            </AnimatedFromLeft>
          ))}
        </div>
      </>
    );
  },
  '0px',
  false,
);
