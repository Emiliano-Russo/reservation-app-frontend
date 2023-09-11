import React, { useEffect } from 'react';
import { Select, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './CreateBusiness.module.css';
import { mockCountries, mockDepartments } from '../../mocks/Countries';
import MyMap from '../../components/Map/Map';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';

const { Option } = Select;

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
          {mockCountries.map((country) => (
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
            {mockDepartments[country].map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
        )}

        <Input
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={styles.input}
        />

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
