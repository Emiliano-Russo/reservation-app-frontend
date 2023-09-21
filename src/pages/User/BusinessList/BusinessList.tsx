import React, { useState, useEffect, useRef } from 'react';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { Typography, Input, Avatar, Spin } from 'antd';
import { StarFilled } from '@ant-design/icons';
import styles from './BusinessList.module.css';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { useNavigate, useParams } from 'react-router-dom';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { BusinessTypeService } from '../../../services/businessType.service';
import { useDynamoLazyLoading } from '../../../hooks/useDynamoLazyLoading';

const { Title } = Typography;
const Search = Input.Search;

const businessService = new BusinessService(REACT_APP_BASE_URL);
const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);

const limitPerPage = '10';

export const BusinessList = withPageLayout(
  () => {
    const { type } = useParams();
    if (!type) return <h1>Error</h1>;

    const [businessTypeName, setBusinessTypeName] = useState('');
    const containerRef = useRef<any>(null);
    const nav = useNavigate();

    const {
      data: businesses,
      loading,
      loadMoreData,
    } = useDynamoLazyLoading({
      initialData: [],
      fetchData: async (lastKey) => {
        const result = await businessService.getBusinessesByTypeId(
          type,
          limitPerPage,
          lastKey?.id,
        );
        return result;
      },
    });

    useEffect(() => {
      async function fetchBusinessTypeName() {
        if (!type) return;
        const businessType = await businessTypeService.getBusinessType(type);
        setBusinessTypeName(businessType.name);
      }
      fetchBusinessTypeName();
    }, [type]);

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
      }
      return () => {
        if (container) {
          container.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);

    const handleScroll = (e) => {
      const container = e.target;
      if (
        container.scrollHeight - container.scrollTop ===
        container.clientHeight
      ) {
        loadMoreData();
      }
    };

    return (
      <>
        <AnimatedFromLeft>
          <BackNavigationHeader title={businessTypeName} />
          <div style={{ height: '20px' }}></div>
        </AnimatedFromLeft>
        <SearchInput placeholder="Buscar negocios..." />
        {loading && <Spin style={{ marginTop: '100px' }} />}
        <div className={styles.businessContainer} ref={containerRef}>
          {businesses.map((business: any, index) => (
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
