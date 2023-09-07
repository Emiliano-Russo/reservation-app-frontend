import React, { useState } from 'react';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';
import { Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './CreateBusiness.module.css';
import { mock_businessType } from '../../mocks/businessType';

const { Option } = Select;
const { TextArea } = Input;

export const BasicInfo = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState(null);
  const [businessDescription, setBusinessDescription] = useState('');
  const [logoFileList, setLogoFileList] = useState<any>([]);
  const [bannerFileList, setBannerFileList] = useState<any>([]);

  const handleUploadChange = (info, type) => {
    if (type === 'logo') {
      setLogoFileList([...info.fileList]);
    } else if (type === 'banner') {
      setBannerFileList([...info.fileList]);
    }
  };

  return (
    <GrowsFromLeft>
      <div className={styles.container}>
        <Input
          placeholder="Nombre del Negocio"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className={styles.input}
        />

        <Select
          placeholder="Tipo de Negocio"
          value={businessType}
          onChange={(value) => setBusinessType(value)}
          className={styles.select}
        >
          {mock_businessType.map((business: any) => (
            <Option key={business.id} value={business.id}>
              {business.name}
            </Option>
          ))}
        </Select>

        <TextArea
          placeholder="Descripción del Negocio"
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          className={styles.textArea}
          rows={4}
        />

        <Upload
          fileList={logoFileList}
          onChange={(info) => handleUploadChange('logo', info)}
          className={styles.upload}
        >
          <Button icon={<UploadOutlined />}>Sube tu Logo</Button>
        </Upload>

        <Upload
          fileList={bannerFileList}
          onChange={(info) => handleUploadChange('banner', info)}
          className={styles.upload}
        >
          <Button icon={<UploadOutlined />}>Sube tu Banner</Button>
        </Upload>
      </div>
    </GrowsFromLeft>
  );
};
