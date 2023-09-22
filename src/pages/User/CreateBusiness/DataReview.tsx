import React from 'react';

export const DataReview = ({ businessData }) => {
  const logoFile = businessData.logoFileList[0];
  const bannerFile = businessData.bannerFileList[0];

  const logoURL = logoFile ? URL.createObjectURL(logoFile) : null;
  const bannerURL = bannerFile ? URL.createObjectURL(bannerFile) : null;

  return (
    <div style={{ padding: '20px', overflowY: 'scroll' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Información Básica</h3>
        <p>
          <strong>Nombre del negocio:</strong> {businessData.businessName}
        </p>
        <p>
          <strong>Tipo de negocio:</strong> {businessData.businessType.name}
        </p>
        <p>
          <strong>Descripción:</strong> {businessData.businessDescription}
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Información de Ubicación</h3>
        <p>
          <strong>País:</strong> {businessData.locationInfo.country}
        </p>
        <p>
          <strong>Departamento:</strong> {businessData.locationInfo.department}
        </p>
        <p>
          <strong>Dirección:</strong> {businessData.locationInfo.address}
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Detalles de Reservación</h3>
        <p>
          <strong>Hora de apertura: </strong>
          {businessData.reservationDetails.openingTime?.format('HH:mm')}
        </p>
        <p>
          <strong>Hora de cierre: </strong>
          {businessData.reservationDetails.closingTime?.format('HH:mm')}
        </p>
        <p>
          <strong>Días disponibles: </strong>
          {businessData.reservationDetails.daysAvailable.join(', ')}
        </p>
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
