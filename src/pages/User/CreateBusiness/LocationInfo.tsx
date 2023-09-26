import React, { useEffect } from 'react';
import { Select, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './CreateBusiness.module.css';
import MyMap from '../../../components/Map/Map';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { BusinessTypeService } from '../../../services/businessType.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { countries } from '../../../utils/countries';
import { country_departments } from '../../../utils/country-departments';

const { Option } = Select;

const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);

export const LocationInfo = ({
  country,
  department,
  email,
  address,
  onCountryChange,
  onDepartmentChange,
  onEmailChange,
  onAddressChange,
  onMarkerPlace,
}) => {
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
        <Select
          placeholder="Selecciona un país"
          value={country}
          onChange={onCountryChange}
          className={styles.select}
        >
          {countries.map((country) => (
            <Option key={country} value={country}>
              {country}
            </Option>
          ))}
        </Select>

        {country && (
          <Select
            placeholder="Selecciona un departamento"
            value={department}
            onChange={onDepartmentChange}
            className={styles.select}
          >
            {country_departments[country].map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
        )}

        <Input
          placeholder="Dirección"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          className={styles.input}
        />

        <div
          style={{ margin: '0 auto', width: '100%', background: 'transparent' }}
        >
          <p>{t('Selecciona la ubicacion')}</p>
          <MyMap onMarkerPlace={onMarkerPlace} />
        </div>
      </div>
    </GrowsFromLeft>
  );
};
