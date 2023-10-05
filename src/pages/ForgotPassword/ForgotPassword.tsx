import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { UserService } from '../../services/user.service'; // Asegúrate de importar tu servicio
import { REACT_APP_BASE_URL } from '../../../env';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import { FadeFromTop } from '../../animations/FadeFromTop';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const userService = new UserService(REACT_APP_BASE_URL!);

  const handlePasswordReset = async () => {
    setLoading(true);
    await userService
      .requestPasswordReset(email)
      .then(() => {
        message.success(
          'Se ha enviado un correo para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada.',
        );
        setEmail(''); // Limpia el campo de entrada
      })
      .catch((err) => {
        console.log(err.response.data.message);
        message.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <FadeFromTop>
        <BackNavigationHeader title={'Restablecer Contraseña'} />
      </FadeFromTop>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          height: '100vh',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <GrowsFromLeft>
          <p style={{ marginTop: '20px' }}>
            Ingresa tu correo electrónico para recibir un enlace de
            restablecimiento de contraseña.
          </p>
        </GrowsFromLeft>
        <GrowsFromLeft>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            style={{ width: '300px', marginBottom: '20px' }}
          />
        </GrowsFromLeft>
        <AnimatedFromLeft>
          <Button
            loading={loading}
            type="primary"
            onClick={handlePasswordReset}
          >
            Enviar
          </Button>
        </AnimatedFromLeft>
      </div>
    </>
  );
};
