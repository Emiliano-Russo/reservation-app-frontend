import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withGuest } from '../../wrappers/WithGuest';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAndToken } from '../../redux/userSlice';
import { AuthService } from '../../services/auth.service';
import { Button, Input, message } from 'antd';
import { REACT_APP_BASE_URL } from '../../../env';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';
import portada from '../../assets/agendafacilnobackground.png';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';
import { FadeFromTop } from '../../animations/FadeFromTop';

export const SignIn = withGuest(() => {
  const nav = useNavigate();
  const myUser = useSelector((state: any) => state.user.user); // <-- Añadido .user para acceder al objeto del usuario
  const dispatch = useDispatch();
  const authService = new AuthService(REACT_APP_BASE_URL!);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (myUser) {
      nav('/business');
    }
  }, [myUser, nav]);

  const handleGoogleSuccess = async (response: any) => {
    authService
      .googleLogin(response.credential)
      .then((data) => {
        const jwtToken = data.access_token;
        const user = data.user;
        dispatch(addUserAndToken({ user, token: jwtToken }));
      })
      .catch((err) => {
        message.error('Error');
        message.info(err.message);
        message.error(err);
        console.log(err);
        console.error('+++++++++++++++++++++TREMENDO ERROR: ', err);
      });
  };

  const handleLocalLogin = async (user: any) => {
    authService
      .login(user)
      .then((data) => {
        const jwtToken = data.access_token;
        const user = data.user;
        dispatch(addUserAndToken({ user, token: jwtToken }));
      })
      .catch((err) => {
        message.error('Credenciales Incorrectas');
      });
  };

  const banner = portada;

  return (
    <GrowsFromLeft>
      <div style={{ background: '#ffa500' }}>
        <GrowsFromLeft>
          <div
            style={{
              height: '35vh',
              overflow: 'hidden',
              display: 'flex', // Nuevo: Convertir este contenedor en flex
              alignItems: 'center', // Nuevo: Centrar verticalmente
              justifyContent: 'center', // Nuevo: Centrar horizontalmente
              background: '#ffa500',
            }}
          >
            <img
              src={banner}
              style={{ width: '250px', objectFit: 'fill' }}
              alt="Neon Mountains"
            />
          </div>
        </GrowsFromLeft>
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            background: 'white',
            borderTopLeftRadius: '50px',
            borderTopRightRadius: '50px',
            height: '100%',
          }}
        >
          <h3 style={{ color: 'black', marginTop: '50px' }}>¡Bienvenido!</h3>
          <Input
            type="email"
            value={email} // Enlazar el valor del campo de entrada con el estado
            onChange={(e) => setEmail(e.target.value)} // Actualizar el estado cuando cambie el valor del campo
            placeholder="Correo electrónico"
            style={{ width: '80%', marginBottom: '10px', marginTop: '0.5rem' }}
          />
          <Input.Password
            value={password} // Enlazar el valor del campo de entrada con el estado
            onChange={(e) => setPassword(e.target.value)} // Actualizar el estado cuando cambie el valor del campo
            placeholder="Contraseña"
            style={{ width: '80%', marginBottom: '20px' }}
          />
          <AnimatedFromLeft>
            <Button
              loading={loading}
              style={{ width: '10rem', background: '#FFA500' }}
              type="primary"
              onClick={() => {
                const user = { email, password };
                handleLocalLogin(user);
              }}
            >
              Acceder
            </Button>
          </AnimatedFromLeft>
          <AnimatedFromLeft delay={0.1}>
            <div style={{ marginTop: '10px' }}>
              <Button
                loading={loading}
                style={{ width: '10rem' }}
                onClick={() => {
                  nav('/signup');
                }}
              >
                Soy Nuevo
              </Button>
            </div>
          </AnimatedFromLeft>

          <AnimatedFromLeft delay={0.2}>
            <div style={{ marginTop: '10px' }}>
              <Button
                style={{ fontSize: '12px' }}
                type="link"
                onClick={() => {
                  nav('/request-password-reset');
                }}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
          </AnimatedFromLeft>
        </div>
        <hr style={{ background: 'white', width: '60%' }} />
      </div>
    </GrowsFromLeft>
  );
});
