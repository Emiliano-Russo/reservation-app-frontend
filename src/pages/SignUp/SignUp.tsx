import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withGuest } from '../../wrappers/WithGuest';
import { UserService } from '../../services/user.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { Input, Select, Button, message, Modal, Avatar } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAndToken } from '../../redux/userSlice';
import { countries } from '../../utils/countries';
import { country_departments } from '../../utils/country-departments';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';

export const SignUp = withGuest(() => {
  const nav = useNavigate();
  const { Option } = Select;
  const userService = new UserService(REACT_APP_BASE_URL!);
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user.user);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    department: '',
    provider: 'local',
    emailVerified: false,
  });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToken, setUserToken] = useState<any>();

  useEffect(() => {
    if (userState) {
      nav('/business');
    }
  }, [userState, nav]);

  const handleSubmit = async () => {
    setLoading(true);

    const allFieldsFilled = Object.values(formData).every((value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''; // Verifica que no sea una cadena vacía
      }
      return value !== null && value !== undefined; // Verifica que no sea null o undefined
    });

    if (!allFieldsFilled) {
      message.error('Por favor, completa todos los campos');
      setLoading(false);
      return;
    }

    try {
      const res = await userService.registerUser(formData);
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

  return (
    <GrowsFromLeft>
      <div>
        <div
          style={{
            paddingTop: 'calc(env(safe-area-inset-top) + 10px)',
            height: '15vh',
            overflow: 'hidden',
            background: '#ffa500',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '2%',
              left: '50%',
              transform: 'translate(-50%, 0)',
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
              style={{
                background: 'transparent',
                color: 'white',
                border: 'none',
              }}
              onClick={() => {
                nav(-1);
              }}
            ></Button>
            <h1
              style={{
                color: 'white',
                margin: 0,
                letterSpacing: '2px',
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
            <AnimatedFromLeft delay={0.1}>
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
            </AnimatedFromLeft>

            <AnimatedFromLeft delay={0.2}>
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
            </AnimatedFromLeft>

            <AnimatedFromLeft delay={0.3}>
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
            </AnimatedFromLeft>

            <div>
              <AnimatedFromLeft delay={0.4}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  País
                </label>
                <Select
                  placeholder="Selecciona tu país"
                  value={formData.country}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      country: value,
                      department: '',
                    })
                  }
                  style={{ marginBottom: '20px', width: '100%' }}
                >
                  {countries.map((country) => (
                    <Option key={country} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </AnimatedFromLeft>

              {formData.country != '' && (
                <>
                  {' '}
                  <label style={{ display: 'block', marginBottom: '5px' }}>
                    Zona
                  </label>
                  <Select
                    placeholder="Selecciona un departamento"
                    value={formData.department}
                    style={{ width: '100%' }}
                    onChange={(department) =>
                      setFormData((prev) => {
                        return { ...prev, department };
                      })
                    }
                  >
                    {country_departments[formData.country].map((dept) => (
                      <Option key={dept} value={dept}>
                        {dept}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            </div>
          </div>
          <Button
            loading={loading}
            type="primary"
            onClick={() => handleSubmit()}
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
