import React from 'react';
import { BusinessCreateState } from '.';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IAvailability } from '../../../interfaces/business/business.interface';
import { weekDayToSpanish } from '../../../utils/dateFormat';

export const Step4 = (businessData: BusinessCreateState) => {
  const logoFile = businessData.logo;
  const bannerFile = businessData.banner;

  const logoURL = logoFile ? URL.createObjectURL(logoFile) : null;
  const bannerURL = bannerFile ? URL.createObjectURL(bannerFile) : null;

  const businessTypeList = useSelector(
    (state: RootState) => state.business.businessTypes,
  );
  const businessTypeName = businessTypeList.find(
    (val) => val.id == businessData.typeID,
  )?.name;

  const aviabilityList: IAvailability[] = JSON.parse(
    businessData.availabilityStringify,
  );

  const days = aviabilityList.map((av) => weekDayToSpanish(av.day));

  return (
    <div style={{ padding: '20px', overflowY: 'scroll' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Información Básica</h3>
        <p>
          <strong>Nombre del negocio:</strong> {businessData.name}
        </p>
        <p>
          <strong>Tipo de negocio: </strong>
          {businessTypeName}
        </p>
        <p>
          <strong>Descripción:</strong> {businessData.description}
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Información de Ubicación</h3>
        <p>
          <strong>País:</strong> {businessData.country}
        </p>
        <p>
          <strong>Departamento:</strong> {businessData.department}
        </p>
        <p>
          <strong>Dirección:</strong> {businessData.address}
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Detalles de Reservación</h3>
        {aviabilityList.map((av) => (
          <div>
            <p>
              <strong>{weekDayToSpanish(av.day)}</strong>
            </p>
            <p>Apertura: {av.openingTime}</p>
            <p>Clausura: {av.closingTime}</p>
          </div>
        ))}
      </div>
      {logoURL && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Logo del negocio</h3>
          <img
            src={logoURL}
            alt="Logo"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
      {bannerURL && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Banner del negocio</h3>
          <img
            src={bannerURL}
            alt="Banner"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};
