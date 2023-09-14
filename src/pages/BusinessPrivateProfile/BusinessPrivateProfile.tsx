import React, { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Spin } from 'antd';
import styles from './BusinessPrivateProfile.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessService } from '../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { BusinessTypeService } from '../../services/businessType.service';
import { DownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { ModalAccountChanger } from '../../components/ModalAccountChanger/ModalAccountChanger';

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

export const BusinessPrivateProfile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<any>();
  const [businessType, setBusinessType] = useState<any>();
  const [availabilityModal, setAvailabilityModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [businesses, setBusinesses] = useState<any>([]);
  const businessService = new BusinessService(REACT_APP_BASE_URL);
  const user = useSelector((state: any) => state.user.user);

  useEffect(() => {
    const getBusinessByOwnerId = () => {
      businessService.getBusinessesByOwnerId(user.id).then((data) => {
        console.log('business by owner id: ', data);
        setBusinesses(data);
      });
    };
    getBusinessByOwnerId();
  }, []);

  const nav = useNavigate();
  console.log('businessId: ', id);

  useEffect(() => {
    const businessService = new BusinessService(REACT_APP_BASE_URL);
    const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);
    const getBusiness = async () => {
      if (id)
        businessService.getBusiness(id).then((data) => {
          console.log('got business data: ', data);
          setBusiness(data);
          businessTypeService
            .getBusinessType(data.typeId)
            .then((data) => {
              console.log('businessType: ', data);
              setBusinessType(data[0]);
            })
            .finally(() => {
              setLoading(false);
            });
        });
    };
    getBusiness();
  }, []);

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
          {businessType?.name}
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
};
