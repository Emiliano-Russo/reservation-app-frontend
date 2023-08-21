import React from 'react';
import { useNavigate } from 'react-router-dom';
import { withGuest } from '../wrappers/WithGuest';
import { UserService } from '../services/user.service';
import { REACT_APP_BASE_URL } from "../../env";
import { Input, Select, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

export const SignUp = withGuest(() => {
    const nav = useNavigate();
    const { Option } = Select;

    const userService = new UserService(REACT_APP_BASE_URL!);

    const handleSubmit = async (user: any) => {
        user.provider = 'local';
        user.emailVerified = false;
        user.isPrivate = false;

        try {
            const res = await userService.registerUser(user);

            if (res.status === 201) {
                nav('/signin');
            } else {
                console.error('Hubo un error en el registro');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    return <div>
        <div style={{ height: '15vh', overflow: 'hidden' }}>
            <img
                src='https://c4.wallpaperflare.com/wallpaper/559/103/755/stars-fantasy-city-art-starry-wallpaper-preview.jpg'
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                alt='Neon Mountains'
            />
            <div style={{
                position: 'absolute',
                top: '2%',
                left: '50%',
                transform: 'translate(-50%, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '100%',
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",

            }}>
                <Button icon={<LeftOutlined />} onClick={() => {
                    nav(-1)
                }}>

                </Button>
                <h1 style={{
                    color: 'white',
                    margin: 0,
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}>
                    Registrarse
                </h1>
                <Button style={{ visibility: "hidden" }} icon={<LeftOutlined />} />
            </div>

        </div>
        <div style={{ width: "60%", margin: "0 auto", marginTop: "3rem" }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Nombre</label>
            <Input placeholder="Nombre" style={{ marginBottom: '15px' }} />

            <label style={{ display: 'block', marginBottom: '5px' }}>Apellido</label>
            <Input placeholder="Apellido" style={{ marginBottom: '15px' }} />

            <label style={{ display: 'block', marginBottom: '5px' }}>Correo Electrónico</label>
            <Input type="email" placeholder="Correo electrónico" style={{ marginBottom: '15px' }} />

            <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña</label>
            <Input.Password placeholder="Contraseña" style={{ marginBottom: '15px' }} />

            <label style={{ display: 'block', marginBottom: '5px' }}>Documento de Identidad</label>
            <Input placeholder="Documento de Identidad" style={{ marginBottom: '15px' }} />

            <label style={{ display: 'block', marginBottom: '5px' }}>País</label>
            <Select placeholder="Selecciona tu país" style={{ marginBottom: '20px', width: '100%' }}>
                <Option value="Argentina">Argentina</Option>
                <Option value="Brasil">Brasil</Option>
                <Option value="Chile">Chile</Option>
                <Option value="Uruguay">Uruguay</Option>
                {/* Agregar más países según sea necesario */}
            </Select>

            <Button type="primary" style={{ width: '100%', marginTop: "3rem" }}>Registrarse</Button>
        </div>
    </div>;
});