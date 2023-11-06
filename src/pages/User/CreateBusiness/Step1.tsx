import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './styles/CreateBusiness.module.css';
import { BusinessTypeService } from '../../../services/businessType.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { BusinessCreateState, PropsStep } from '.';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IBusinessType } from '../../../interfaces/businessType/businessType.interface';
import { Camera, CameraResultType } from '@capacitor/camera';

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

      const logoFile = new File([blob], 'logo.jpg', { type: 'image/jpeg' });
      props.setBusinessData((prev) => {
        return { ...prev, logo: logoFile };
      });
    }
  };

  const handleBannerChange = async () => {
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

      const logoFile = new File([blob], 'banner.jpg', { type: 'image/jpeg' });
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
            alignItems: 'center',
          }}
        >
          <div>
            <Button onClick={handleLogoChange}>Sube tu Logo</Button>
            <p>{logoFileName != '' ? logoFileName : null}</p>
          </div>
          <hr></hr>
          <div>
            <Button onClick={handleBannerChange}>Sube tu Banner</Button>
            <p>{bannerFileName != '' ? bannerFileName : null}</p>
          </div>
        </div>
      </div>
    </GrowsFromLeft>
  );
};
