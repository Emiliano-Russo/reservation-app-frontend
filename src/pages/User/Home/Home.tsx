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

    const [searchValue, setSearchValue] = useState(''); // 1. Estado local para el valor de búsqueda

    useEffect(() => {
      const service = new BusinessTypeService(REACT_APP_BASE_URL);
      service
        .getBusinessTypes({ limit: 20, page: 1 })
        .then((data) => {
          console.log('data: ', data);
          dispatch(setBusinessTypes(data.items));
        })
        .catch((error) =>
          console.error('Error fetching business types:', error),
        );
    }, []);

    const filteredBusinessTypes = businessTypeList.filter((type: any) => {
      return type.name.toLowerCase().includes(searchValue.toLowerCase()); // 2. Filtrar la lista basada en el valor de búsqueda
    });

    return (
      <>
        <FadeFromTop>
          <div className={styles.greetingContainer}>
            <Avatar
              src={
                userState.profileImage
                  ? userState.profileImage
                  : 'https://i.pinimg.com/564x/d1/51/62/d15162b27cd9712860b90abe58cb60e7.jpg'
              }
              size={64}
              className={styles.avatarStyle}
            ></Avatar>
            <p className={styles.greetingText}>Hola, {userState.name}!</p>
          </div>
        </FadeFromTop>
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)} // Actualizar el estado local con el valor del input
        />
        {businessTypeList.length == 0 && (
          <Spin style={{ marginTop: '100px' }} />
        )}
        <div className={styles.businessTypeContainer}>
          {filteredBusinessTypes.map(
            (
              val: any,
              index: number, // 3. Renderizar solo los elementos filtrados
            ) => (
              <BusinessTypeCard {...val} index={index} />
            ),
          )}
        </div>
      </>
    );
  }, '0px'),
);
