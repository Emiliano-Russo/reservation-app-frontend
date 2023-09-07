import React, { useEffect, useState } from 'react';
import { Avatar, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { BusinessTypeCard } from '../../components/BusinessTypeCard/BusinessTypeCard';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.css';
import { StatusBar } from '@capacitor/status-bar';
import SearchInput from '../../components/SearchInput/SearchInput';
import { BusinessTypeService } from '../../services/businessType.service';
import { REACT_APP_BASE_URL } from '../../../env';
import AnimatedRouteWrapper from '../../wrappers/AnimatedRouteWrapper';

export const Home = withPageLayout(() => {
  const [userName, setUsername] = useState('Diego');
  const [businessTypes, setBusinessTypes] = useState([]); // Añadir estado para guardar los tipos de negocio

  useEffect(() => {
    const service = new BusinessTypeService(REACT_APP_BASE_URL); // Asumiendo que no necesitas una baseUrl para las funciones mockeadas
    service
      .mock_getBusinessTypes()
      .then((data) => setBusinessTypes(data))
      .catch((error) => console.error('Error fetching business types:', error));
  }, []); // Se ejecuta una vez cuando el componente se monta

  return (
    <>
      <div className={styles.greetingContainer}>
        <Avatar size={64} className={styles.avatarStyle}>
          D
        </Avatar>
        <p className={styles.greetingText}>Hola, {userName}!</p>
      </div>
      <SearchInput />
      <div className={styles.businessTypeContainer}>
        {businessTypes.map((val: any, index: number) => (
          <BusinessTypeCard {...val} index={index} />
        ))}
      </div>
    </>
  );
}, '0px');
