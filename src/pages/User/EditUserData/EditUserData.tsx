import React, { useState } from 'react';
import { Input, Avatar, Button, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateStringProperty } from '../../../redux/userSlice';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { UserService } from '../../../services/user.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { IUser, UpdateUserDto } from '../../../interfaces/user/user.interface';
import { countries } from '../../../utils/countries';
import { country_departments } from '../../../utils/country-departments';
import { Camera, CameraResultType } from '@capacitor/camera';
import { generateRandomFilename } from '../../../utils/generator';

const userService = new UserService(REACT_APP_BASE_URL);

const { Option } = Select;

export const EditUserData = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const user = useSelector((state: RootState) => state.user.user);
  const distpach = useDispatch();

  const handleAvatarChange = async () => {
    console.log('handle avatar change');
    let permissions;
    try {
      permissions = await Camera.requestPermissions();
    } catch (error: any) {
      message.error(error.message);
      console.error('Error al solicitar permisos:', error);
      return;
    }
    if (permissions.camera !== 'granted') {
      message.error('Permiso de cámara denegado.');
      return;
    }

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });

    if (image.base64String) {
      // Convertir base64 a Blob
      const byteCharacters = atob(image.base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });

      // Crear una URL de objeto a partir del Blob para visualización
      const imageUrl = URL.createObjectURL(blob);
      setAvatar(imageUrl); // Asignar la URL al estado 'avatar'

      const randomFilename = 'avatar_' + generateRandomFilename(10) + '.jpg';
      // Además, guardar el File para ser enviado al backend
      setFile(new File([blob], randomFilename, { type: 'image/jpeg' }));
    }
  };

  const dispatch = useDispatch();

  const onUpdateUser = () => {
    setLoading(true);
    const updateObj: UpdateUserDto = {
      name: user?.name,
      email: user?.email,
      userImage: file,
      country: user?.country,
      department: user?.department,
    };
    if (user)
      userService
        .updateUser(user.id, updateObj)
        .then((userRes: IUser) => {
          message.success('Usuario Actualizado!');
          // Iteramos sobre las propiedades del objeto y las actualizamos
          console.log('userRes: ', userRes);
          Object.keys(updateObj).forEach((property) => {
            if (property !== 'userImage' && userRes[property]) {
              dispatch(
                updateStringProperty({
                  property: property as
                    | 'token'
                    | 'name'
                    | 'email'
                    | 'phone'
                    | 'profileImage'
                    | 'country'
                    | 'department',
                  value: userRes[property],
                }),
              );
            }
          });
          dispatch(
            updateStringProperty({
              property: 'profileImage',
              value: userRes.profileImage,
            }),
          );
        })
        .catch((err) => {
          message.error('Error al actualizar!');
        })
        .finally(() => {
          setLoading(false);
        });
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FadeFromTop>
        <BackNavigationHeader title={'Editar'} />
      </FadeFromTop>
      <AnimatedFromLeft>
        <div style={{ padding: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Nombreee
          </label>
          <Input
            placeholder="Name"
            value={user?.name}
            onChange={(e) =>
              distpach(
                updateStringProperty({
                  property: 'name',
                  value: e.target.value,
                }),
              )
            }
            style={{ marginBottom: '15px' }}
          />
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <Input
            placeholder="Email"
            value={user?.email}
            onChange={(e) =>
              distpach(
                updateStringProperty({
                  property: 'email',
                  value: e.target.value,
                }),
              )
            }
            style={{ marginBottom: '15px' }}
          />

          <label style={{ display: 'block', marginBottom: '5px' }}>País</label>
          <Select
            placeholder="Selecciona tu país"
            value={user?.country}
            onChange={(val) =>
              dispatch(
                updateStringProperty({
                  property: 'country',
                  value: val,
                }),
              )
            }
            style={{ marginBottom: '20px', width: '100%' }}
          >
            {countries.map((country) => (
              <Option key={country} value={country}>
                {country}
              </Option>
            ))}
          </Select>

          {user?.country != '' && (
            <>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Zona
              </label>
              <Select
                placeholder="Selecciona un departamento"
                value={user?.department}
                style={{ width: '100%' }}
                onChange={(department) =>
                  dispatch(
                    updateStringProperty({
                      property: 'department',
                      value: department,
                    }),
                  )
                }
              >
                {user &&
                  country_departments[user.country].map((dept) => (
                    <Option key={dept} value={dept}>
                      {dept}
                    </Option>
                  ))}
              </Select>
            </>
          )}

          <hr></hr>

          <div style={{ marginTop: '30px' }}>
            <AnimatedFromLeft delay={0.4}>
              <div style={{ marginTop: '30px' }}>
                <Avatar
                  size={64}
                  src={
                    avatar ||
                    'https://i.pinimg.com/564x/d1/51/62/d15162b27cd9712860b90abe58cb60e7.jpg'
                  } // Utiliza el estado avatar aquí
                  style={{ marginBottom: '15px', marginRight: '10px' }}
                />
                <Button onClick={handleAvatarChange}>Sube tu Avatar</Button>
              </div>
            </AnimatedFromLeft>
          </div>
        </div>
      </AnimatedFromLeft>

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          marginTop: 'auto',
          marginBottom: '20px',
        }}
      >
        <GrowsFromLeft>
          <Button
            loading={loading}
            onClick={onUpdateUser}
            style={{ marginRight: '20px' }}
            type="primary"
          >
            Guardar
          </Button>
        </GrowsFromLeft>
      </div>
    </div>
  );
};
