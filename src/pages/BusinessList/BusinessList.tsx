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
import { motion } from 'framer-motion';

const { Title } = Typography;
const Search = Input.Search;

const businessService = new BusinessService(REACT_APP_BASE_URL);

export const BusinessList = withPageLayout(
  () => {
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
        <motion.div
          initial={{ x: -400, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ ease: 'easeOut', duration: 0.2, delay: 0.2 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          <BackNavigationHeader title={'Restaurante'} />
          <div style={{ height: '20px' }}></div>
          <SearchInput placeholder="Buscar negocios..." />
        </motion.div>
        {businesses.length == 0 && <Spin style={{ marginTop: '100px' }} />}
        <div className={styles.businessContainer}>
          {businesses.map((business: any, index: number) => (
            <motion.div
              initial={{ x: -400, opacity: 0, scale: 0.8 }} // Configuración inicial: movido hacia la izquierda, casi invisible y ligeramente reducido
              animate={{ x: 0, opacity: 1, scale: 1 }} // Configuración final: posición original, completamente visible y a tamaño original
              transition={{
                ease: 'easeOut',
                duration: 0.8,
                delay: index * 0.1,
              }} // Retraso basado en el id para dar un efecto en cascada
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
            </motion.div>
          ))}
        </div>
      </>
    );
  },
  '0px',
  false,
);
