import React from 'react';
import { Card, Typography, Divider, Button } from 'antd';
import packageInfo from '../../../package.json';
import { FadeFromTop } from '../../animations/FadeFromTop';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';

const { Title, Paragraph } = Typography;

export const About = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <FadeFromTop>
        <BackNavigationHeader title={'Acerca De'} />
      </FadeFromTop>
      <GrowsFromLeft>
        <Card bordered={false}>
          <Title
            style={{ margin: '0px 0px 10px 0px', padding: '0px' }}
            level={3}
          >
            Acerca de ReservaApp
          </Title>

          <Paragraph>
            ReservaApp es una aplicación diseñada para facilitar el proceso de
            reservas en diferentes tipos de negocios. Nuestro objetivo es
            brindar una experiencia fluida y sencilla para usuarios y negocios
            por igual.
          </Paragraph>

          <Paragraph>
            Desarrollado con pasión por el equipo de ReservaTech, estamos
            comprometidos con la innovación y la excelencia en todo lo que
            hacemos.
          </Paragraph>

          <Title level={4}>Versión</Title>
          <Paragraph>{packageInfo.version}</Paragraph>

          <Title level={4}>Contacto</Title>
          <Paragraph>
            ¿Tienes preguntas o comentarios? No dudes en{' '}
            <a href="mailto:support@reservaapp.com">contactarnos</a>.
          </Paragraph>

          <Divider />
          <Button type="primary" href="https://reservaapp.com">
            Visita nuestro sitio web
          </Button>
        </Card>
      </GrowsFromLeft>
    </div>
  );
};
