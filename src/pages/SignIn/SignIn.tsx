import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withGuest } from '../../wrappers/WithGuest';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAndToken } from '../../redux/userSlice';
import { AuthService } from '../../services/auth.service';
import { Button, Input, message } from 'antd';
import { REACT_APP_BASE_URL } from '../../../env';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';

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

  const banner =
    'https://i.pinimg.com/564x/6f/91/9f/6f919f28cb7a830481f9b0866fc2c15b.jpg';

  return (
    <GrowsFromLeft>
      <div>
        <div
          style={{
            height: '40vh',
            overflow: 'hidden',
            display: 'flex', // Nuevo: Convertir este contenedor en flex
            alignItems: 'center', // Nuevo: Centrar verticalmente
            justifyContent: 'center', // Nuevo: Centrar horizontalmente
          }}
        >
          <img
            src={banner}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Neon Mountains"
          />
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '20px',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <h1
              style={{
                color: 'white',
                margin: 0,
                fontSize: '2rem',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Tu Mejor Reserva
            </h1>
          </div>
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1 style={{ fontWeight: 'bold', color: 'black' }}>¡Bienvenido!</h1>
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

          <Button
            loading={loading}
            style={{ width: '10rem', background: '#DA0063' }}
            type="primary"
            onClick={() => {
              const user = { email, password };
              handleLocalLogin(user);
            }}
          >
            Acceder
          </Button>

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
        </div>
        <hr style={{ background: 'white', width: '60%' }} />
      </div>
    </GrowsFromLeft>
  );
});
