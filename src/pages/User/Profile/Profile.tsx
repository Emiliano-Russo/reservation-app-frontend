import { Avatar, Button, Progress, Modal, Menu } from 'antd';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import {
  ContactsOutlined,
  DownOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from './Profile.module.css';
import { StatusBar } from '@capacitor/status-bar';
import { useNavigate } from 'react-router-dom';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { withAuth } from '../../../wrappers/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UserService } from '../../../services/user.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { BusinessService } from '../../../services/business.service';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { ModalAccountChanger } from '../../../components/ModalAccountChanger/ModalAccountChanger';
import { setBusinessList } from '../../../redux/businessSlice';
import { IBusiness } from '../../../interfaces/business/business.interface';
import { RootState } from '../../../redux/store';

interface IconInfo {
  icon: React.ReactNode;
  label: string;
  value: string | boolean;
  color?: string;
}

export const BasicProfileInfoWidget = ({ icons }: { icons: IconInfo[] }) => {
  return (
    <div className={styles.container}>
      {icons.map((iconInfo, index) => (
        <div key={index} className={styles.row}>
          <p style={{ color: iconInfo.color || 'black' }}>
            {typeof iconInfo.value === 'boolean'
              ? iconInfo.value
                ? 'Verificado'
                : 'No verificado'
              : iconInfo.value}
          </p>
          {iconInfo.icon}
        </div>
      ))}
    </div>
  );
};

export const SectionLine = ({ title }) => {
  return (
    <div className={styles.sectionLineContainer}>
      <hr className={styles.sectionLine} />
      <span className={styles.sectionLineText}>{title}</span>
      <hr className={styles.sectionLine} />
    </div>
  );
};

const LoyaltyPointsWidget = () => {
  return (
    <div className={styles.container}>
      <main>
        <p className={styles.loyaltyText}>90 de 200</p>
        <p className={styles.loyaltySubtext}>Nivel 2</p>
      </main>
      <Progress percent={30} />
    </div>
  );
};

interface PropsHeader {
  url: string;
  name: string;
}

const ProfileHeader = (props: PropsHeader) => {
  const nav = useNavigate();
  const user = useSelector((state: any) => state.user.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const businesses = useSelector((state: any) => state.business.myBusinesses);
  const businessService = new BusinessService(REACT_APP_BASE_URL);

  const dispatch = useDispatch();

  useEffect(() => {
    const getBusinessByOwnerId = () => {
      businessService
        .getBusinessesByOwnerId(user.id, { limit: 20, page: 1 })
        .then((data) => {
          dispatch(setBusinessList(data.items));
        });
    };
    getBusinessByOwnerId();
  }, []);

  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <Avatar src={props.url} size={80}>
            E
          </Avatar>
          {/* 96px */}
        </div>
        <div className={styles.messageButtonContainer}>
          <button style={{ color: 'black', background: 'white' }}>
            <MessageOutlined style={{ fontSize: '1.5rem' }} />
          </button>
        </div>
        <div className={styles.settingsButtonContainer}>
          <button
            style={{ color: 'black', background: 'white' }}
            onClick={() => {
              nav('/settings');
            }}
          >
            <SettingOutlined style={{ fontSize: '1.5rem' }} />
          </button>
        </div>
      </div>
      <div className={styles.profileName}>
        <p>{props.name}</p>
        <button
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          <DownOutlined style={{ color: 'black' }} />
        </button>
      </div>
      <ModalAccountChanger
        showUserAccount={false}
        nav={nav}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        businesses={businesses}
      />
    </>
  );
};

export const Profile = withAuth(
  withPageLayout(() => {
    StatusBar.setBackgroundColor({ color: '#fd6f8e' });

    const user = useSelector((state: any) => state.user.user);

    const icons = [
      {
        icon: <PhoneOutlined style={{ color: 'gray' }} />,
        label: 'Teléfono',
        value: user.phone,
      },
      {
        icon: <MailOutlined style={{ color: 'gray' }} />,
        label: 'Email',
        value: user.email,
        color: user.emailVerified ? 'black' : 'red',
      },
      {
        icon: <ContactsOutlined style={{ color: 'gray' }} />,
        label: 'Documento',
        value: user.civilIdDoc,
      },
    ];

    return (
      <FadeFromTop>
        <ProfileHeader
          name={user.name}
          url={
            user.profileImage
              ? user.profileImage
              : 'https://i.pinimg.com/564x/d1/51/62/d15162b27cd9712860b90abe58cb60e7.jpg'
          }
        />
        <SectionLine title={'Información'} />

        <BasicProfileInfoWidget icons={icons} />
        <SectionLine title={'Puntos de Fidelidad'} />
        <LoyaltyPointsWidget />
      </FadeFromTop>
    );
  }, '0px'),
);
