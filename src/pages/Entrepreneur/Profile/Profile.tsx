import React, { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Spin } from 'antd';
import styles from './Profile.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { BusinessTypeService } from '../../../services/businessType.service';
import { DownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { ModalAccountChanger } from '../../../components/ModalAccountChanger/ModalAccountChanger';
import Footer from '../../../components/Footer/Footer';
import { withPageLayout } from '../../../wrappers/WithPageLayout';

const DayAvailability = ({ day, shifts }) => {
  return (
    <div className={styles.dayAvailability}>
      <strong>{day + ' '}</strong>
      {shifts.map((shift, index) => (
        <div key={index}>
          <p>{new Date(shift.openingTime).toLocaleString()}</p>
          <p>{new Date(shift.closingTime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export const BusinessProfile = withPageLayout(
  () => {
    const business = useSelector(
      (state: any) => state.business.currentBusiness,
    );
    const businesses = useSelector((state: any) => state.business.myBusinesses);
    console.log('## my business: ', business);
    const [loading, setLoading] = useState(false);
    const [availabilityModal, setAvailabilityModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log('business: ', business);
    const nav = useNavigate();
    const businessTypeList = useSelector(
      (state: any) => state.business.businessTypes,
    );

    if (loading)
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <h1>Cargando Perfil</h1>
          <Spin style={{ marginTop: '100px' }} />
        </div>
      );

    return (
      <div className={styles.businessProfileContainer}>
        <div
          style={{
            backgroundImage: ` url(${business.multimediaURL[0]})`,
          }}
          className={styles.banner}
        >
          {/* Aquí puedes poner una imagen de fondo para el banner */}
          <Avatar
            style={{
              position: 'absolute',
              top: '30px',
              left: '50%',
              transform: 'translate(-50%, 0)',
            }}
            src={business?.logoURL || ''}
            alt="Foto de perfil"
            className={styles.avatar}
            size={100}
          />
        </div>
        <div className={styles.profileContent}>
          <div className={styles.profileName}>
            <p>{business.name}</p>
            <button
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              <DownOutlined style={{ color: 'black' }} />
            </button>
          </div>
          <p className={styles.description}>
            <strong>Descripción</strong>
            <br></br>
            {business?.description}
          </p>
          <p className={styles.businessType}>
            <strong>Tipo de Negocio</strong>
            <br></br>
            {businessTypeList.find((type) => type.id == business.typeId).name}
          </p>{' '}
          <p className={styles.location}>
            <strong>Direccion</strong>
            <br></br>
            {business?.address}
          </p>
          <div className={styles.availability}>
            <Button
              style={{ marginTop: '20px' }}
              onClick={() => {
                setAvailabilityModal(true);
              }}
            >
              Ver Disponibilidad
            </Button>
            <Modal
              footer={null}
              onCancel={() => {
                setAvailabilityModal(false);
              }}
              open={availabilityModal}
            >
              <div className={styles.availability}>
                <p>
                  <strong>Disponibilidad</strong>
                </p>
                <div
                  style={{
                    overflowY: 'scroll',
                    maxHeight: '300px',
                    padding: '40px',
                  }}
                >
                  {business?.availability.map(
                    (avail, index) =>
                      avail.open && (
                        <DayAvailability
                          key={index}
                          day={avail.day}
                          shifts={avail.shifts}
                        />
                      ),
                  )}
                </div>
              </div>
            </Modal>
            {businesses != undefined ? (
              <ModalAccountChanger
                showUserAccount={true}
                nav={nav}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                businesses={businesses}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  },
  '0px',
  true,
  true,
);
