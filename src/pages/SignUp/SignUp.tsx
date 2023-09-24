import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withGuest } from '../../wrappers/WithGuest';
import { UserService } from '../../services/user.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { Input, Select, Button, message, Modal } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAndToken } from '../../redux/userSlice';

export const SignUp = withGuest(() => {
  const nav = useNavigate();
  const { Option } = Select;
  const userService = new UserService(REACT_APP_BASE_URL!);
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user.user);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    civilIdDoc: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToken, setUserToken] = useState<any>();

  useEffect(() => {
    if (userState) {
      nav('/business');
    }
  }, [userState, nav]);

  const handleSubmit = async (user) => {
    setLoading(true);
    user.provider = 'local';
    user.emailVerified = false;
    user.isPrivate = false;

    try {
      const res = await userService.registerUser(user);
      const userRes = res.data.user;
      const tokenRes = res.data.token;

      if (res.status === 201) {
        setIsModalVisible(true); // Muestra el modal
        setUserToken({ user: userRes, token: tokenRes });
        //dispatch(addUserAndToken({ user: userRes, token: tokenRes }));
      } else {
        message.error('Hubo un error en el registro');
      }
    } catch (error) {
      message.error('Error en el registro');
    }
    setLoading(false);
  };

  const banner =
    'https://i.pinimg.com/564x/6f/91/9f/6f919f28cb7a830481f9b0866fc2c15b.jpg';

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      // Asegura que solo se estén introduciendo números
      setFormData({ ...formData, phone: value });
    }
  };

  return (
    <GrowsFromLeft>
      <div>
        <div style={{ height: '15vh', overflow: 'hidden' }}>
          <img
            src={banner}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Neon Mountains"
          />
          <div
            style={{
              position: 'absolute',
              top: '2%',
              left: '50%',
              transform: 'translate(-50%, 0)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1);
              }}
            ></Button>
            <h1
              style={{
                color: 'white',
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Registrarse
            </h1>
            <Button style={{ visibility: 'hidden' }} icon={<LeftOutlined />} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 'calc(85vh - 3rem)',
            width: '60%',
            margin: '2rem auto 0 auto',
            paddingBottom: '2rem',
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Nombre
            </label>
            <Input
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{ marginBottom: '15px' }}
            />

            <label style={{ display: 'block', marginBottom: '5px' }}>
              Teléfono
            </label>
            <Input
              type="tel"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handlePhoneChange}
              style={{ marginBottom: '15px' }}
            />

            <label style={{ display: 'block', marginBottom: '5px' }}>
              Correo Electrónico
            </label>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{ marginBottom: '15px' }}
            />

            <label style={{ display: 'block', marginBottom: '5px' }}>
              Contraseña
            </label>
            <Input.Password
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              style={{ marginBottom: '15px' }}
            />

            <label style={{ display: 'block', marginBottom: '5px' }}>
              Documento de Identidad
            </label>
            <Input
              placeholder="Documento de Identidad"
              value={formData.civilIdDoc}
              onChange={(e) =>
                setFormData({ ...formData, civilIdDoc: e.target.value })
              }
              style={{ marginBottom: '15px' }}
            />

            <label style={{ display: 'block', marginBottom: '5px' }}>
              País
            </label>
            <Select
              placeholder="Selecciona tu país"
              value={formData.country}
              onChange={(value) => setFormData({ ...formData, country: value })}
              style={{ marginBottom: '20px', width: '100%' }}
            >
              <Option value="Argentina">Argentina</Option>
              <Option value="Brasil">Brasil</Option>
              <Option value="Chile">Chile</Option>
              <Option value="Uruguay">Uruguay</Option>
            </Select>
          </div>

          <Button
            loading={loading}
            type="primary"
            onClick={() => handleSubmit(formData)}
            style={{ width: '100%' }}
          >
            Registrarse
          </Button>
        </div>
      </div>
      <Modal
        title="¿Qué tipo de usuario eres?"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        closable={false}
      >
        <Button
          block
          type="primary"
          onClick={() => {
            nav('/business');
            dispatch(addUserAndToken(userToken));
          }}
        >
          Usuario Corriente
        </Button>
        <Button
          block
          style={{ marginTop: '10px' }}
          onClick={() => {
            dispatch(addUserAndToken(userToken));
            nav('/create-business');
          }}
        >
          Negocio
        </Button>
      </Modal>
    </GrowsFromLeft>
  );
});
