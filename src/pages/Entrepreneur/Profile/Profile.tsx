import React, { useEffect, useState } from 'react';
import { Avatar, Button, Modal, Spin } from 'antd';
import styles from './Profile.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { BusinessTypeService } from '../../../services/businessType.service';
import {
  ClockCircleOutlined,
  DownOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { ModalAccountChanger } from '../../../components/ModalAccountChanger/ModalAccountChanger';
import Footer from '../../../components/Footer/Footer';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import { RootState } from '../../../redux/store';
import { WeekDays } from '../../../interfaces/weekday.enum';
import { weekDayToSpanish } from '../../../utils/dateFormat';
import { IAvailability } from '../../../interfaces/business/business.interface';
import { DayAvailability } from '../../../components/DayAvailability/DayAvailability';
import LoadingAvatar from '../../../components/LoadingAvatar/LoadingAvatar';

interface Props {
  availability: IAvailability;
}

export const BusinessProfile = withPageLayout(
  () => {
    const business = useSelector(
      (state: RootState) => state.business.currentBusiness,
    );
    console.log('business: ', business);
    const businesses = useSelector((state: any) => state.business.myBusinesses);
    console.log('businesses list: ', businesses);
    const [loading, setLoading] = useState(false);
    const [availabilityModal, setAvailabilityModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const nav = useNavigate();
    const businessTypeList = useSelector(
      (state: any) => state.business.businessTypes,
    );

    const LoadingImage = ({ src, children, ...props }) => {
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const image = new Image();
        image.src = src;
        image.onload = () => setLoading(false);
      }, [src]);
    
      if (loading) {
        return <Spin size='large' />;
      }
    
      return <div
              style={{
                backgroundImage: ` url(${src})`,
              }}
              
              {...props}
             > 
             {children}
             </div>
    };  

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

    if (!business) return <h1>No Business</h1>;

    return (
      <GrowsFromLeft>
        <div className={styles.businessProfileContainer}>
        <LoadingImage
            src={business.banner} 
            style={{
              backgroundImage: ` url(${business.banner})`,
            }}
            className={styles.banner}
            children={<LoadingAvatar
              spinStyle={{}}
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
            />} />
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
                icon={<ClockCircleOutlined />}
                style={{ marginTop: '20px' }}
                onClick={() => {
                  setAvailabilityModal(true);
                }}
              >
                Horarios
              </Button>
              <Button
                style={{ marginTop: '10px' }}
                icon={<EditOutlined />}
                onClick={() => {
                  nav('/edit-business-profile');
                }}
              >
                Editar
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
                    {business?.availability.map((avail, index) => (
                      <DayAvailability key={index} availability={avail} />
                    ))}
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
      </GrowsFromLeft>
    );
  },
  '0px',
  true,
  true,
);
