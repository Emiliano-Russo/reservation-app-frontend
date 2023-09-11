import React, { useState } from 'react';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';
import { Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './CreateBusiness.module.css';
import { mock_businessType } from '../../mocks/businessType';

const { Option } = Select;
const { TextArea } = Input;

export const BasicInfo = ({
  businessName,
  businessType,
  businessDescription,
  logoFileList,
  bannerFileList,
  onBusinessNameChange,
  onBusinessTypeChange,
  onBusinessDescriptionChange,
  onLogoFileListChange,
  onBannerFileListChange,
}) => {
  const [logoFileName, setLogoFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');

  const handleUploadChange = (e, type) => {
    console.log('type: ', type);
    const fileName = e.nativeEvent.target.files[0].name;
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Hacer lo que necesites con el archivo seleccionado.
      // Si solo deseas almacenar una referencia al archivo para subirlo más tarde, puedes simplemente almacenarlo en el estado.
      if (type === 'logo') {
        console.log('logooo');
        setLogoFileName(fileName);
        onLogoFileListChange([selectedFile]);
      } else if (type === 'banner') {
        console.log('banner!');
        setBannerFileName(fileName);
        onBannerFileListChange([selectedFile]);
      }
    }
  };

  return (
    <GrowsFromLeft>
      <div className={styles.container}>
        <Input
          placeholder="Nombre del Negocio"
          value={businessName}
          onChange={(e) => onBusinessNameChange(e.target.value)}
          className={styles.input}
        />

        <Select
          placeholder="Tipo de Negocio"
          value={businessType}
          onChange={(value) => onBusinessTypeChange(value)}
          className={styles.select}
        >
          {mock_businessType.map((business: any) => (
            <Option key={business.id} value={business.name}>
              {business.name}
            </Option>
          ))}
        </Select>

        <TextArea
          placeholder="Descripción del Negocio"
          value={businessDescription}
          onChange={(e) => onBusinessDescriptionChange(e.target.value)}
          className={styles.textArea}
          rows={4}
        />

        <div>
          {/* Input oculto */}
          <input
            style={{ display: 'none' }}
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(info) => handleUploadChange(info, 'logo')}
          />

          {/* Label personalizado */}
          <label
            htmlFor="fileInput"
            style={{
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'underline',
            }}
          >
            Sube tu Logo
          </label>
          <p>{logoFileName != '' ? logoFileName : null}</p>
        </div>
        <hr></hr>
        <div>
          {/* Input oculto */}
          <input
            style={{ display: 'none' }}
            id="bannerFileInput"
            type="file"
            accept="image/*"
            onChange={(info) => handleUploadChange(info, 'banner')}
          />
          {}

          {/* Label personalizado */}
          <label
            htmlFor="bannerFileInput"
            style={{
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'underline',
            }}
          >
            Sube tu Banner
          </label>
          <p>{bannerFileName != '' ? bannerFileName : null}</p>
        </div>
      </div>
    </GrowsFromLeft>
  );
};
