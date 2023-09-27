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

const { Option } = Select;

const businessService = new BusinessService(REACT_APP_BASE_URL);

export const EditBusinessProfile = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [bannerFile, setBannerFile] = useState<File>();
  const business = useSelector(
    (state: RootState) => state.business.currentBusiness,
  );
  console.log('current business: ', business);
  const dispatch = useDispatch();

  const handleInputChange = (property: keyof IBusiness, value: any) => {
    dispatch(updateCurrentBusiness({ [property]: value }));
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setBannerFile(file);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const onUpdateBusiness = () => {
    //setLoading(true);
    if (!business) return;
    console.log('tenemos todos los datos? ', file, '###', bannerFile);

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
      .editBusiness(objToSend, file, bannerFile)
      .then((businessRes: IBusiness) => {
        message.success('Negocio Actualizado!');
        dispatch(updateCurrentBusiness({ ['banner']: businessRes.banner }));
        dispatch(updateCurrentBusiness({ ['logoURL']: businessRes.logoURL }));
        console.log(businessRes);
      })
      .catch((err) => {
        message.error('Error Al Actualizar!');
      });

    // Aquí deberías llamar a tu servicio para actualizar el perfil del negocio
    // Una vez que se haya completado la actualización, puedes actualizar el estado de Redux y mostrar un mensaje al usuario

    // Ejemplo:
    // businessService.updateBusiness(business.id, updateObj).then(() => {
    //   message.success('Perfil del negocio actualizado!');
    //   dispatch(updateBusinessProfile(updateObj));
    // }).catch(() => {
    //   message.error('Error al actualizar!');
    // }).finally(() => {
    //   setLoading(false);
    // });
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

        <div style={{ marginTop: '20px' }}>
          <Avatar
            size={64}
            src={business?.logoURL}
            style={{ marginBottom: '15px' }}
          />
          <input
            style={{ display: 'none' }}
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => handleLogoChange(e)}
          />
          <label
            htmlFor="fileInput"
            style={{
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'none',
              marginLeft: '20px',
            }}
          >
            Sube tu Logo {file?.name}
          </label>
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}
        >
          <img src={business?.banner} style={{ maxHeight: '100px' }}></img>
          <input
            style={{ display: 'none' }}
            id="bannerInput"
            type="file"
            accept="image/*"
            onChange={(e) => handleBannerChange(e)}
          />
          <label
            htmlFor="bannerInput"
            style={{
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'none',
              marginLeft: '20px',
            }}
          >
            Sube tu Banner {bannerFile?.name}
          </label>
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
