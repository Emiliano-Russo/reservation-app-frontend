import React, { useState } from 'react';
import { Input, Avatar, Button, message } from 'antd';
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

const userService = new UserService(REACT_APP_BASE_URL);

export const EditUserData = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const user = useSelector((state: RootState) => state.user.user);
  const distpach = useDispatch();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const dispatch = useDispatch();

  const onUpdateUser = () => {
    setLoading(true);
    const updateObj: UpdateUserDto = {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      civilIdDoc: user?.civilIdDoc,
      userImage: file,
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
                    | 'civilIdDoc'
                    | 'profileImage',
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
          <Input
            placeholder="Phone"
            value={user?.phone}
            onChange={(e) =>
              distpach(
                updateStringProperty({
                  property: 'phone',
                  value: e.target.value,
                }),
              )
            }
            style={{ marginBottom: '15px' }}
          />
          <Input
            placeholder="Cédula"
            value={user?.civilIdDoc}
            onChange={(e) =>
              distpach(
                updateStringProperty({
                  property: 'civilIdDoc',
                  value: e.target.value,
                }),
              )
            }
            style={{ marginBottom: '15px' }}
          />
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

          <div style={{ marginTop: '30px' }}>
            <Avatar
              size={64}
              src={user?.profileImage}
              style={{ marginBottom: '15px' }}
            />
            {/* Input oculto */}
            <input
              style={{ display: 'none' }}
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => handleAvatarChange(e)}
            />

            {/* Label personalizado */}
            <label
              htmlFor="fileInput"
              style={{
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'none',
                marginLeft: '20px',
              }}
            >
              Sube tu Avatar
            </label>
            <p
              style={{
                textOverflow: 'ellipsis',
                maxWidth: '150px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {avatar}
            </p>
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
