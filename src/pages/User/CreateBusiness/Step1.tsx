import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './styles/CreateBusiness.module.css';
import { BusinessTypeService } from '../../../services/businessType.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { BusinessCreateState, PropsStep } from '.';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IBusinessType } from '../../../interfaces/businessType/businessType.interface';
import { Camera, CameraResultType } from '@capacitor/camera';
import { generateRandomFilename } from '../../../utils/generator';

const { Option } = Select;
const { TextArea } = Input;

const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);

export const Step1 = (props: PropsStep) => {
  const [logoFileName, setLogoFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');
  const [businessTypeList, setBusinessTypeList] = useState<IBusinessType[]>([]);

  const reduxBusinessTypeList = useSelector(
    (state: RootState) => state.business.businessTypes,
  );

  useEffect(() => {
    if (reduxBusinessTypeList.length == 0) {
      businessTypeService
        .getBusinessTypes({ limit: 100, page: 1 })
        .then((val) => {
          setBusinessTypeList(val.items);
        });
    } else setBusinessTypeList(reduxBusinessTypeList);
  }, []);

  const handleLogoChange = async () => {
    // Verificar si ya se tiene permiso para usar la cámara
    // Solicitar permisos de cámara con Capacitor
    // const permissions = await Camera.requestPermissions();

    // // Si los permisos no se otorgan, mostrar un mensaje
    // if (permissions.camera !== 'granted') {
    //   message.error('Permiso de cámara denegado.');
    //   return;
    // }
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });

    if (image.base64String) {
      const byteCharacters = atob(image.base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      setLogoFileName(imageUrl); // Actualiza el nombre del archivo de logo con la URL

      // Uso de la función para crear un nombre de archivo aleatorio
      const randomFilename = 'logo_' + generateRandomFilename(10) + '.jpg';
      const logoFile = new File([blob], randomFilename, {
        type: 'image/jpeg',
      });
      props.setBusinessData((prev) => {
        return { ...prev, logo: logoFile };
      });
    }
  };

  const handleBannerChange = async () => {
    // Verificar si ya se tiene permiso para usar la cámara
    // Solicitar permisos de cámara con Capacitor
    // const permissions = await Camera.requestPermissions();

    // // Si los permisos no se otorgan, mostrar un mensaje
    // if (permissions.camera !== 'granted') {
    //   message.error('Permiso de cámara denegado.');
    //   return;
    // }
    // Repite el proceso para la imagen del banner
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });

    if (image.base64String) {
      const byteCharacters = atob(image.base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const imageUrl = URL.createObjectURL(blob);
      setBannerFileName(imageUrl); // Actualiza el nombre del archivo de logo con la URL

      const randomFilename = 'banner_' + generateRandomFilename(10) + '.jpg';
      const logoFile = new File([blob], randomFilename, {
        type: 'image/jpeg',
      });
      props.setBusinessData((prev) => {
        return { ...prev, banner: logoFile };
      });
    }
  };

  return (
    <GrowsFromLeft>
      <div className={styles.container}>
        <label>Nombre</label>
        <Input
          style={{ marginTop: '5px' }}
          placeholder="Nombre del Negocio"
          value={props.businessData.name}
          maxLength={17}
          onChange={(e) => {
            props.setBusinessData((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
          className={styles.input}
        />

        <>
          <label style={{ marginTop: '20px' }}>Tipo</label>
          <Select
            style={{ marginTop: '5px' }}
            placeholder="Tipo de Negocio"
            value={
              businessTypeList.find((bt) => bt.id == props.businessData.typeID)
                ?.name
            }
            onChange={(idParam) => {
              props.setBusinessData((prev) => {
                return { ...prev, typeID: idParam };
              });
            }}
            className={styles.select}
          >
            {businessTypeList.map((businessType: IBusinessType) => (
              <Option key={businessType.id} value={businessType.id}>
                {businessType.name}
              </Option>
            ))}
          </Select>
        </>

        <>
          <label style={{ marginTop: '20px' }}>Descripción</label>
          <TextArea
            maxLength={200}
            style={{ marginTop: '5px' }}
            placeholder="Descripción del Negocio"
            value={props.businessData.description}
            onChange={(e) =>
              props.setBusinessData((prev) => {
                return { ...prev, description: e.target.value };
              })
            }
            className={styles.textArea}
            rows={4}
          />
        </>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={handleLogoChange}>Sube tu Logo</Button>
            <p style={{ marginLeft: '10px' }}>
              {logoFileName != '' ? 'Subido ✅' : null}
            </p>
          </div>
          <hr></hr>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={handleBannerChange}>Sube tu Banner</Button>
            <p style={{ marginLeft: '10px' }}>
              {bannerFileName != '' ? 'Subido ✅' : null}
            </p>
          </div>
        </div>
      </div>
    </GrowsFromLeft>
  );
};
