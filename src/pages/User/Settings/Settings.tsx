import React from 'react';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import styles from './Settings.module.css';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { withAuth } from '../../../wrappers/WithAuth';
import { useDispatch } from 'react-redux';
import { removeUserAndToken } from '../../../redux/userSlice';

export const Settings = withAuth(
  withPageLayout(
    () => {
      const nav = useNavigate();
      const dispatch = useDispatch();

      return (
        <>
          <FadeFromTop>
            <BackNavigationHeader title={'Ajustes'} />
          </FadeFromTop>
          <FadeFromTop>
            <Button className={styles.button}>Editar Datos</Button>
            <Button
              className={styles.button}
              onClick={() => {
                nav('/create-business');
              }}
            >
              Abrir mi Negocio
            </Button>
            <Button className={styles.button}>Notificaciones</Button>
            <Button className={styles.button}>Idioma y Región</Button>
            <Button className={styles.button}>Preferencias de Reserva</Button>
            <Button className={styles.button}>Métodos de Pago</Button>
            <Button className={styles.button}>Seguridad y Acceso</Button>
            <Button className={styles.button}>Ayuda y Soporte</Button>
            <Button className={styles.button}>Acerca De</Button>
            <Button className={styles.button}>Personalización</Button>
            <Button
              danger
              className={styles.button}
              onClick={() => {
                dispatch(removeUserAndToken());
              }}
            >
              Cerrar Sesión
            </Button>
          </FadeFromTop>
        </>
      );
    },
    '0px',
    false,
  ),
);
