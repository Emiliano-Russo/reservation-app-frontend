import React, { useState } from 'react';
import { Input, Button, Avatar, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IBusiness } from '../../../interfaces/business/business.interface';
import { updateCurrentBusiness } from '../../../redux/businessSlice';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';
import { countries } from '../../../utils/countries';
import { country_departments } from '../../../utils/country-departments';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { Camera, CameraResultType } from '@capacitor/camera';
import { generateRandomFilename } from '../../../utils/generator';

const { Option } = Select;

const businessService = new BusinessService(REACT_APP_BASE_URL);

export const EditBusinessProfile = () => {
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File>();
  const [bannerFile, setBannerFile] = useState<File>();

  const [avatarLogo, setAvatarLogo] = useState<undefined | string>(undefined);
  const [avatarBanner, setAvatarBanner] = useState<undefined | string>(
    undefined,
  );

  const business = useSelector(
    (state: RootState) => state.business.currentBusiness,
  );
  console.log('current business: ', business);
  const dispatch = useDispatch();

  const handleInputChange = (property: keyof IBusiness, value: any) => {
    dispatch(updateCurrentBusiness({ [property]: value }));
  };

  const handleBannerChange = async () => {
    const permissions = await Camera.requestPermissions();
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
      setAvatarBanner(imageUrl); // Asignar la URL al estado 'avatar'

      const randomFilename = 'banner_' + generateRandomFilename(10) + '.jpg';
      // Además, guardar el File para ser enviado al backend
      setBannerFile(new File([blob], randomFilename, { type: 'image/jpeg' }));
    }
  };

  const handleLogoChange = async () => {
    const permissions = await Camera.requestPermissions();
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
      setAvatarLogo(imageUrl); // Asignar la URL al estado 'avatar'

      const randomFilename = 'logo_' + generateRandomFilename(10) + '.jpg';
      // Además, guardar el File para ser enviado al backend
      setLogoFile(new File([blob], randomFilename, { type: 'image/jpeg' }));
    }
  };

  const onUpdateBusiness = () => {
    if (!business) return;
    setLoading(true);

    const objToSend = {
      id: business.id,
      name: business.name,
      address: business.address,
      description: business.description,
      country: business.country,
      department: business.department,
    };

    console.log('sending obj... ');
    businessService
      .editBusiness(objToSend, logoFile, bannerFile)
      .then((businessRes: IBusiness) => {
        message.success('Negocio Actualizado!');
        dispatch(updateCurrentBusiness({ ['banner']: businessRes.banner }));
        dispatch(updateCurrentBusiness({ ['logoURL']: businessRes.logoURL }));
        console.log('BusinessREs:', businessRes);
      })
      .catch((err) => {
        message.error('Error Al Actualizar!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <FadeFromTop>
        <BackNavigationHeader title={'Edit Business'} />
      </FadeFromTop>
      <div style={{ padding: '20px' }}>
        <Input
          placeholder="Name"
          value={business?.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          style={{ marginBottom: '15px' }}
        />

        <Input
          placeholder="Address"
          value={business?.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          style={{ marginBottom: '15px' }}
        />
        <Input
          placeholder="Description"
          value={business?.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          style={{ marginBottom: '15px' }}
        />
        <Select
          placeholder="Selecciona tu país"
          value={business?.country}
          onChange={(val) => handleInputChange('country', val)}
          style={{ marginBottom: '5px', width: '100%' }}
        >
          {countries.map((country) => (
            <Option key={country} value={country}>
              {country}
            </Option>
          ))}
        </Select>

        {business?.country && (
          <Select
            placeholder="Selecciona un departamento"
            value={business?.department}
            style={{ width: '100%', marginBottom: '15px' }}
            onChange={(department) =>
              handleInputChange('department', department)
            }
          >
            {country_departments[business.country].map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
        )}

        <div>
          <Avatar
            size={64}
            src={avatarLogo || business?.logoURL}
            style={{ marginBottom: '15px', marginRight: '10px' }}
          />
          <Button onClick={handleLogoChange}>Sube tu Logo</Button>
        </div>
        <div>
          <Avatar
            size={64}
            src={avatarBanner || business?.banner}
            style={{ marginBottom: '15px', marginRight: '10px' }}
          />
          <Button onClick={handleBannerChange}>Sube tu Banner</Button>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          marginTop: 'auto',
          marginBottom: '20px',
        }}
      >
        <Button
          loading={loading}
          onClick={onUpdateBusiness}
          style={{ marginRight: '20px' }}
          type="primary"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};
