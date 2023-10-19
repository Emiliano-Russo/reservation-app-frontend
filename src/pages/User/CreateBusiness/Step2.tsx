import React, { useEffect } from 'react';
import { Select, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './styles/CreateBusiness.module.css';
import MyMap from '../../../components/Map/Map';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { BusinessTypeService } from '../../../services/businessType.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { countries } from '../../../utils/countries';
import { country_departments } from '../../../utils/country-departments';
import { PropsStep } from '.';

const { Option } = Select;

export const Step2 = (props: PropsStep) => {
  const { t } = useTranslation();

  useEffect(() => {
    const applyStyles = (elements, style) => {
      elements.forEach((el) => {
        if (el) {
          Object.entries(style).forEach(([property, value]) => {
            el.style[property] = value;
          });
        }
      });
    };

    const html = document.querySelector('html');
    const body = document.querySelector('body');
    const ionContent = document.querySelector('ion-content');

    // Aplica el estilo cuando el componente se monte
    applyStyles([html, body, ionContent], {
      backgroundColor: 'transparent',
    });

    // Revertir el estilo cuando el componente se desmonte
    return () => {
      applyStyles([html, body, ionContent], {
        backgroundColor: '',
      });
    };
  }, []);

  return (
    <GrowsFromLeft>
      <div className={styles.locationContainer}>
        <label>País</label>
        <Select
          style={{ marginTop: '5px' }}
          placeholder="Selecciona un país"
          value={props.businessData.country}
          onChange={(val) => {
            props.setBusinessData((prev) => {
              return { ...prev, country: val };
            });
          }}
          className={styles.select}
        >
          {countries.map((country) => (
            <Option key={country} value={country}>
              {country}
            </Option>
          ))}
        </Select>

        {props.businessData.country && props.businessData.country != '' && (
          <>
            <label style={{ marginTop: '20px' }}>Zona</label>
            <Select
              style={{ marginTop: '5px' }}
              placeholder="Selecciona un departamento"
              value={props.businessData.department}
              onChange={(dep) => {
                props.setBusinessData((prev) => {
                  return { ...prev, department: dep };
                });
              }}
              className={styles.select}
            >
              {country_departments[props.businessData.country].map((dept) => (
                <Option key={dept} value={dept}>
                  {dept}
                </Option>
              ))}
            </Select>
          </>
        )}

        <>
          <label style={{ marginTop: '20px' }}>Dirección</label>
          <Input
            style={{ marginTop: '5px' }}
            placeholder="Dirección"
            value={props.businessData.address}
            onChange={(e) =>
              props.setBusinessData((prev) => {
                return { ...prev, address: e.target.value };
              })
            }
            className={styles.input}
          />
        </>

        {/* <div
          style={{ margin: '0 auto', width: '100%', background: 'transparent' }}
        >
          <p>{t('Selecciona la ubicacion')}</p>
          <MyMap
            onMarkerPlace={(event) => {
              props.setBusinessData((prev) => {
                const coordinatesJSON = {
                  pointX: event.latitude,
                  pointY: event.longitude,
                };
                return {
                  ...prev,
                  coordinatesStringify: JSON.stringify(coordinatesJSON),
                };
              });
            }}
          />
        </div> */}
      </div>
    </GrowsFromLeft>
  );
};
