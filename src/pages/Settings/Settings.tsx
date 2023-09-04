import React from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './Settings.module.css';

export const Settings = withPageLayout(() => {
  const nav = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => nav(-1)}
        />
        <h1>Settings</h1>
        <Button
          style={{
            visibility: 'hidden',
          }}
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => nav(-1)}
        />
      </header>
      <div className={styles.buttonContainer}>
        <Button className={styles.button}>Editar Datos</Button>
        <Button className={styles.button}>Abrir mi Negocio</Button>
        <Button className={styles.button}>Notificaciones</Button>
        <Button className={styles.button}>Idioma y Región</Button>
        <Button className={styles.button}>Preferencias de Reserva</Button>
        <Button className={styles.button}>Métodos de Pago</Button>
        <Button className={styles.button}>Seguridad y Acceso</Button>
        <Button className={styles.button}>Ayuda y Soporte</Button>
        <Button className={styles.button}>Acerca De</Button>
        <Button className={styles.button}>Personalización</Button>
        <Button className={styles.button}>Cerrar Sesión</Button>
      </div>
    </>
  );
}, '0px');
