import React, { useEffect, useState } from 'react';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { Typography, Input, Avatar, Spin, Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import styles from './BusinessList.module.css';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { useNavigate, useParams } from 'react-router-dom';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { BusinessTypeService } from '../../../services/businessType.service';

const { Title } = Typography;
const Search = Input.Search;

const businessService = new BusinessService(REACT_APP_BASE_URL);
const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);

const limitPerPage = '6';

interface PagHistory {
  nro: number;
  lastKey: null | string;
}

export const BusinessList = withPageLayout(
  () => {
    const nav = useNavigate();
    const { type } = useParams(); // Aquí estamos obteniendo el typeId desde la URL

    const [businessTypeName, setBusinessTypeName] = useState('');
    const [businesses, setBusinesses] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [pagHistory, setPagHistory] = useState<PagHistory[]>([
      { nro: 0, lastKey: null },
    ]);
    const [actualPageNro, setActualPageNro] = useState(0);
    const [showLastButton, setShowLastButton] = useState(true);

    async function fetchBusinesses() {
      if (!type) return setBusinesses([]);
      setLoading(true);
      const businessType = await businessTypeService.getBusinessType(type);
      setBusinessTypeName(businessType.name);

      const lastKey = pagHistory.find((val) => val.nro == actualPageNro)
        ?.lastKey;

      if (lastKey == undefined && actualPageNro > 0) {
        setLoading(false);
        setShowLastButton(false);
        return;
      } else {
        setShowLastButton(true);
      }
      const businessesByType = await businessService.getBusinessesByTypeId(
        type,
        limitPerPage,
        lastKey,
      );

      if (businessesByType.lastKey)
        setPagHistory((prev) => {
          const index = prev.findIndex(
            (val) => val.lastKey == businessesByType.lastKey.id,
          );
          const list = [
            {
              nro: prev[prev.length - 1].nro + 1,
              lastKey: businessesByType.lastKey.id,
            },
          ];
          if (index == -1) return [...prev, ...list];
          return prev;
        });

      setBusinesses(businessesByType.items);

      setLoading(false);
    }

    useEffect(() => {
      fetchBusinesses();
    }, [type, actualPageNro]);

    const handlePreviousPage = () => {
      if (actualPageNro > 0) {
        setBusinesses([]);
        setActualPageNro((prev) => prev - 1);
      }
    };

    const handleNextPage = () => {
      setBusinesses([]);
      setActualPageNro((prev) => prev + 1);
    };

    return (
      <>
        <AnimatedFromLeft>
          <BackNavigationHeader title={businessTypeName} />
          <div style={{ height: '20px' }}></div>
        </AnimatedFromLeft>
        <SearchInput placeholder="Buscar negocios..." />
        {loading == false &&
        businesses.length == 0 &&
        pagHistory.length == 0 ? (
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 'auto',
            marginBottom: '10px',
          }}
        >
          <Button
            loading={loading}
            style={{ visibility: actualPageNro > 0 ? 'visible' : 'hidden' }}
            onClick={handlePreviousPage}
          >
            Atras
          </Button>
          <Button
            style={{
              visibility: !showLastButton ? 'hidden' : 'visible',
            }}
            loading={loading}
            onClick={handleNextPage}
          >
            Siguiente
          </Button>
        </div>
      </>
    );
  },
  '0px',
  false,
);
