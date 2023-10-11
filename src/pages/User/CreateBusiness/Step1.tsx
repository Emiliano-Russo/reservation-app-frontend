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

  const handleUploadChange = (e, type) => {
    const fileName = e.nativeEvent.target.files[0].name;
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (type === 'logo') {
        setLogoFileName(fileName);
        props.setBusinessData((prev) => {
          return { ...prev, logo: selectedFile };
        });
      } else if (type === 'banner') {
        setBannerFileName(fileName);
        props.setBusinessData((prev) => {
          return { ...prev, banner: selectedFile };
        });
      }
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
              }}
            >
              Sube tu Banner
            </label>
            <p>{bannerFileName != '' ? bannerFileName : null}</p>
          </div>
        </div>
      </div>
    </GrowsFromLeft>
  );
};
