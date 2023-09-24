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

const businessService = new BusinessService(REACT_APP_BASE_URL);
const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);

const limitPerPage = 10;

export const BusinessList = withPageLayout(
  () => {
    const { type } = useParams();
    if (!type) return <h1>Error</h1>;

    const [businessTypeName, setBusinessTypeName] = useState('');
    const [businesses, setBusinesses] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const containerRef = useRef<any>(null);
    const nav = useNavigate();

    useEffect(() => {
      fetchBusinessTypeName();
    }, [type]);

    useEffect(() => {
      fetchBusinesses(searchValue);
    }, [page]);

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

    useEffect(() => {
      setPage(1);
      setBusinesses([]);
      fetchBusinesses(searchValue);
    }, [searchValue]);

    async function fetchBusinesses(searchTerm = '') {
      setLoading(true);
      if (!type) return;
      const res = await businessService.getBusinessesByTypeId(
        type,
        {
          limit: limitPerPage,
          page: page,
        },
        searchTerm,
      );
      setLoading(false);
      if (res.items.length == 0) {
        setHasMoreData(false);
        return;
      }
      setBusinesses((prev) => [...prev, ...res.items]);
    }

    async function fetchBusinessTypeName() {
      if (!type) return;
      const businessType = await businessTypeService.getBusinessType(type);
      setBusinessTypeName(businessType.name);
    }

    const handleScroll = (e) => {
      const container = e.target;
      if (
        container.scrollHeight - container.scrollTop ===
        container.clientHeight
      ) {
        if (hasMoreData) setPage((prev) => prev + 1);
      }
    };

    const filteredBusinesses = businesses.filter((business: any) => {
      return business.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    return (
      <>
        <AnimatedFromLeft>
          <BackNavigationHeader title={businessTypeName} />
          <div style={{ height: '20px' }}></div>
        </AnimatedFromLeft>
        <SearchInput
          placeholder="Buscar negocios..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {loading && <Spin style={{ marginTop: '100px' }} />}
        <div className={styles.businessContainer} ref={containerRef}>
          {filteredBusinesses.map((business: any, index) => (
            <AnimatedFromLeft delay={index * 0.1} key={index}>
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
