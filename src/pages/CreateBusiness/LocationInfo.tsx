import React, { useState } from 'react';
import { Input, Select } from 'antd';
import styles from './CreateBusiness.module.css';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';

const { Option } = Select;

// Esto es solo un mock, puedes reemplazarlo con tus datos reales
const mockCountries = [
  'Uruguay',
  'Argentina',
  'Mexico',
  'Chile',
  'Peru',
  'Colombia',
];

const mockDepartments = {
  Uruguay: [
    'Montevideo',
    'Canelones',
    'Rocha',
    'Salto',
    'Paysandú',
    'Maldonado',
    'Tacuarembó',
    'Colonia',
    'Rivera',
  ],
  Argentina: [
    'Buenos Aires',
    'Córdoba',
    'Santa Fe',
    'Mendoza',
    'Neuquén',
    'Salta',
    'Chaco',
    'Corrientes',
    'Bariloche',
    'Mar del Plata',
  ],
  Mexico: [
    'Ciudad de México',
    'Guadalajara',
    'Monterrey',
    'Puebla',
    'Toluca',
    'León',
    'Querétaro',
    'Mérida',
    'Acapulco',
  ],
  Chile: [
    'Santiago',
    'Valparaíso',
    'Concepción',
    'La Serena',
    'Antofagasta',
    'Temuco',
    'Rancagua',
    'Iquique',
    'Talca',
    'Arica',
  ],
  Peru: [
    'Lima',
    'Arequipa',
    'Trujillo',
    'Chiclayo',
    'Piura',
    'Iquitos',
    'Cusco',
    'Huancayo',
    'Pucallpa',
    'Tacna',
  ],
  Colombia: [
    'Bogotá',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Cartagena',
    'Cúcuta',
    'Bucaramanga',
    'Pereira',
    'Santa Marta',
    'Ibagué',
  ],
};

export const LocationInfo = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  return (
    <GrowsFromLeft>
      <div className={styles.container}>
        <Select
          placeholder="Selecciona un país"
          value={country}
          onChange={(value) => {
            setCountry(value);
            setDepartment(null); // Reinicia el departamento cuando cambias el país
          }}
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
            onChange={(value) => setDepartment(value)}
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
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <Input
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.input}
        />
      </div>
    </GrowsFromLeft>
  );
};
