import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import styles from './CreateBusiness.module.css';
import { mock_businessType } from '../../mocks/businessType';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';

const { Meta } = Card;

export const Welcome = ({ onNext }) => {
  const businessTypes = mock_businessType;

  return (
    <GrowsFromLeft>
      <div className={styles.background}>
        <div className={styles.content}>
          <h1 className={styles.title}>Bienvenido a </h1>
          <h1>Tu Mejor Reserva</h1>
          <p className={styles.description}>
            Empieza a crear y gestionar tu negocio con nosotros. v6!
          </p>
          <Button onClick={onNext} type="primary">
            Empezar
          </Button>
        </div>
      </div>
    </GrowsFromLeft>
  );
};
