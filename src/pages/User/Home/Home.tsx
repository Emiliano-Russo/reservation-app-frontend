import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Spin, message } from 'antd';
import { PushNotifications } from '@capacitor/push-notifications';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { BusinessTypeCard } from '../../../components/BusinessTypeCard/BusinessTypeCard';
import styles from './Home.module.css';
import SearchInput from '../../../components/SearchInput/SearchInput';
import { BusinessTypeService } from '../../../services/businessType.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { RootState } from '../../../redux/store';
import { UserService } from '../../../services/user.service';
import { setBusinessTypes } from '../../../redux/businessSlice';
import { withAuth } from '../../../wrappers/WithAuth';
import { updateStringProperty } from '../../../redux/userSlice';
import LoadingAvatar from '../../../components/LoadingAvatar/LoadingAvatar';

const userService = new UserService(REACT_APP_BASE_URL);

export const Home = withAuth(
  withPageLayout(() => {
    const userState = useSelector((state: RootState) => state.user.user);
    const businessTypeList = useSelector(
      (state: any) => state.business.businessTypes,
    );
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('');
    const [isPushInitialized, setPushInitialized] = useState(false); // Nuevo estado para rastrear la inicialización

    useEffect(() => {
      if (isPushInitialized) {
        return; // Si ya está inicializado, no hagas nada
      }

      const initPush = async () => {
        // Solicitar permiso
        const { receive } = await PushNotifications.requestPermissions();

        if (receive) {
          // Registrar el dispositivo
          await PushNotifications.register();

          // Manejar notificaciones recibidas
          PushNotifications.addListener(
            'pushNotificationReceived',
            (notification) => {
              console.log('Notificación recibida:', notification);
            },
          );

          // Manejar notificaciones abiertas
          PushNotifications.addListener(
            'pushNotificationActionPerformed',
            (action) => {
              console.log('Notificación abierta:', action);
            },
          );

          // Obtener y enviar el token al backend
          PushNotifications.addListener('registration', (token) => {
            console.log('Token de registro:', token.value);
            const userId = userState!.id;
            if (userState!.fcmToken !== token.value) {
              userService.updateFCMToken(userId, token.value).then(() => {
                dispatch(
                  updateStringProperty({
                    property: 'fcmToken',
                    value: token.value,
                  }),
                );
                message.success('¡Bienvenido!');
              });
            }
          });

          // Manejar errores
          PushNotifications.addListener('registrationError', (error) => {
            console.error(
              'Error al registrar para notificaciones push:',
              error,
            );
          });

          // Después de inicializar, establece isPushInitialized en true
          setPushInitialized(true);
        }
      };

      initPush();

      // Función de limpieza
      return () => {
        // Aquí puedes eliminar oyentes si es necesario
        PushNotifications.removeAllListeners();
      };
    }, [isPushInitialized]);

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
      return type.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    return (
      <>
        <FadeFromTop>
          <div className={styles.greetingContainer}>
            <LoadingAvatar
              src={
                userState!.profileImage
                  ? userState!.profileImage
                  : 'https://i.pinimg.com/564x/d1/51/62/d15162b27cd9712860b90abe58cb60e7.jpg'
              }
              spinStyle={{ marginRight: '1rem' }}
              size={64}
              className={styles.avatarStyle}
            />
            <p className={styles.greetingText}>Hola, {userState!.name}!</p>
          </div>
        </FadeFromTop>
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {businessTypeList.length === 0 && (
          <Spin style={{ marginTop: '100px' }} />
        )}
        <div className={styles.businessTypeContainer}>
          {filteredBusinessTypes.map((val: any, index: number) => (
            <BusinessTypeCard {...val} index={index} />
          ))}
        </div>
      </>
    );
  }, '0px'),
);
