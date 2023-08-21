import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { withGuest } from '../wrappers/WithGuest';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { AuthService } from '../services/auth.service';
import { Button, Input, message } from 'antd';
import { REACT_APP_BASE_URL } from "../../env";

export const SignIn = withGuest(() => {
    const nav = useNavigate();
    const myUser = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const authService = new AuthService(REACT_APP_BASE_URL!);

    useEffect(() => {
        if (myUser) {
            nav('/home');
        }
    }, [myUser, nav]);

    const handleGoogleSuccess = async (response: any) => {
        authService
            .googleLogin(response.credential)
            .then(data => {
                const jwtToken = data.access_token;
                const user = data.user;
                localStorage.setItem('jwtToken', jwtToken);
                dispatch(addUser(user));
            })
            .catch(err => {
                message.error('Error');
            });
    };

    const handleLocalLogin = async (user: any) => {
        authService
            .login(user)
            .then(data => {
                const jwtToken = data.access_token;
                const user = data.user;
                localStorage.setItem('jwtToken', jwtToken);
                dispatch(addUser(user));
            })
            .catch(err => {
                message.error('Error');
            });
    };

    const handleGoogleError = () => { };

    return (
        <div>
            <div style={{ height: '40vh', overflow: 'hidden' }}>
                <img
                    src='https://c4.wallpaperflare.com/wallpaper/559/103/755/stars-fantasy-city-art-starry-wallpaper-preview.jpg'
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    alt='Neon Mountains'
                />
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translate(-50%, 0)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    width: '80%',
                }}>
                    <h1 style={{
                        color: 'white',
                        margin: 0,
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}>
                        Tu Mejor Reserva
                    </h1>
                </div>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ fontWeight: "bold" }}>Bienvenido!</h2>
                <Input
                    type="email"
                    placeholder="Correo electrónico"
                    style={{ width: '80%', marginBottom: '10px', marginTop: "3rem" }}
                />
                <Input.Password
                    placeholder="Contraseña"
                    style={{ width: '80%', marginBottom: '20px' }}
                />
                <Button style={{ width: "10rem" }} type="primary">Ingresar</Button>
                <div style={{ marginTop: '10px' }}> {/* Añadir un div para una nueva línea */}
                    <Button style={{ width: "10rem" }} onClick={() => {
                        nav('/signup');
                    }}>Soy Nuevo</Button>
                </div>
            </div>
            <hr style={{ background: "white", width: "60%" }} />
        </div>
    );

});