import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Spin, message } from 'antd';
import { PushNotifications } from '@capacitor/push-notifications';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { BusinessTypeCard } from '../../components/BusinessTypeCard/BusinessTypeCard';
import styles from './HomeTwo.module.css';
import SearchInput from '../../components/SearchInput/SearchInput';
import { BusinessTypeService } from '../../services/businessType.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { FadeFromTop } from '../../animations/FadeFromTop';
import { RootState } from '../../redux/store';
import { UserService } from '../../services/user.service';
import { setBusinessTypes } from '../../redux/businessSlice';
import { useNavigate } from 'react-router-dom';

const userService = new UserService(REACT_APP_BASE_URL);

export const HomeTwo = withPageLayout(() => {
  const user = useSelector((state: RootState) => state.user.user);
  const nav = useNavigate();
  if (user) {
    console.log('si hay usuario');
    nav('/business');
  } else {
    console.log('no hay usuario nos quedamos en esta pantalla');
  }

  const businessTypeList = useSelector(
    (state: any) => state.business.businessTypes,
  );
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const service = new BusinessTypeService(REACT_APP_BASE_URL);
    service
      .getBusinessTypes({ limit: 20, page: 1 })
      .then((data) => {
        console.log('data: ', data);
        dispatch(setBusinessTypes(data.items));
      })
      .catch((error) => console.error('Error fetching business types:', error));
  }, []);

  const filteredBusinessTypes = businessTypeList.filter((type: any) => {
    return type.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <FadeFromTop>
        <div className={styles.greetingContainer}>
          <p className={styles.greetingText}>Hola, Bienvenido!</p>
        </div>
      </FadeFromTop>
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {businessTypeList.length === 0 && <Spin style={{ marginTop: '100px' }} />}
      <div className={styles.businessTypeContainer}>
        {filteredBusinessTypes.map((val: any, index: number) => (
          <BusinessTypeCard {...val} index={index} />
        ))}
      </div>
    </>
  );
}, '0px');
