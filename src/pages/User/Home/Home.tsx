import React, { useEffect, useState } from 'react';
import { Avatar, Spin } from 'antd';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { BusinessTypeCard } from '../../../components/BusinessTypeCard/BusinessTypeCard';
import styles from './Home.module.css';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { BusinessTypeService } from '../../../services/businessType.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { withAuth } from '../../../wrappers/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setBusinessTypes } from '../../../redux/businessSlice';

export const Home = withAuth(
  withPageLayout(() => {
    const userState = useSelector((state: any) => state.user.user);
    const businessTypeList = useSelector(
      (state: any) => state.business.businessTypes,
    );
    const dispatch = useDispatch();

    useEffect(() => {
      const service = new BusinessTypeService(REACT_APP_BASE_URL);
      service
        .getBusinessTypes()
        .then((data) => {
          console.log('data: ', data);
          dispatch(setBusinessTypes(data.items));
          setBusinessTypes(data.items);
        })
        .catch((error) =>
          console.error('Error fetching business types:', error),
        );
    }, []);

    return (
      <>
        <FadeFromTop>
          <div className={styles.greetingContainer}>
            <Avatar
              src={userState.profileImage}
              size={64}
              className={styles.avatarStyle}
            >
              D
            </Avatar>
            <p className={styles.greetingText}>Hola, {userState.name}!</p>
          </div>
        </FadeFromTop>
        <SearchInput />
        {businessTypeList.length == 0 && (
          <Spin style={{ marginTop: '100px' }} />
        )}
        <div className={styles.businessTypeContainer}>
          {businessTypeList.map((val: any, index: number) => (
            <BusinessTypeCard {...val} index={index} />
          ))}
        </div>
      </>
    );
  }, '0px'),
);
