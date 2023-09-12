import React, { useEffect, useState } from 'react';
import { Avatar, Spin } from 'antd';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { BusinessTypeCard } from '../../components/BusinessTypeCard/BusinessTypeCard';
import styles from './Home.module.css';
import SearchInput from '../../components/SearchInput/SearchInput';
import { BusinessTypeService } from '../../services/businessType.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { FadeFromTop } from '../../animations/FadeFromTop';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';
import { withAuth } from '../../wrappers/WithAuth';
import { useSelector } from 'react-redux';

export const Home = withAuth(
  withPageLayout(() => {
    const userState = useSelector((state: any) => state.user.user);
    const [businessTypes, setBusinessTypes] = useState([]);

    useEffect(() => {
      const service = new BusinessTypeService(REACT_APP_BASE_URL);
      service
        .mock_getBusinessTypes()
        .then((data) => setBusinessTypes(data))
        .catch((error) =>
          console.error('Error fetching business types:', error),
        );
    }, []);

    return (
      <>
        <FadeFromTop>
          <div className={styles.greetingContainer}>
            <Avatar size={64} className={styles.avatarStyle}>
              D
            </Avatar>
            <p className={styles.greetingText}>Hola, {userState.name}!</p>
          </div>
        </FadeFromTop>
        <SearchInput />
        {businessTypes.length == 0 && <Spin style={{ marginTop: '100px' }} />}
        <div className={styles.businessTypeContainer}>
          {businessTypes.map((val: any, index: number) => (
            <BusinessTypeCard {...val} index={index} />
          ))}
        </div>
      </>
    );
  }, '0px'),
);
