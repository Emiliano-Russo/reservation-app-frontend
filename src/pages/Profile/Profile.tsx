import { Avatar, Button, Progress } from 'antd';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import {
  ContactsOutlined,
  DownOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Footer from '../../components/Footer/Footer';
import styles from './Profile.module.css';
import { StatusBar } from '@capacitor/status-bar';
import { useNavigate } from 'react-router-dom';

const BasicProfileInfoWidget = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <p>092 084 834</p>
        <PhoneOutlined style={{ color: 'gray' }} />
      </div>
      <div className={styles.row}>
        <p>emiliano@gmail.com</p>
        <MailOutlined style={{ color: 'gray' }} />
      </div>
      <div className={styles.row}>
        <p>4870685-4</p>
        <ContactsOutlined style={{ color: 'gray' }} />
      </div>
    </div>
  );
};

const SectionLine = ({ title }) => {
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

const ProfileHeader = () => {
  const nav = useNavigate();

  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <Avatar size={80}>E</Avatar> {/* 96px */}
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
        <p>Emiliano Russo</p>
        <button>
          <DownOutlined style={{ color: 'black' }} />
        </button>
      </div>
    </>
  );
};

export const Profile = withPageLayout(() => {
  StatusBar.setBackgroundColor({ color: '#fd6f8e' });

  return (
    <>
      <ProfileHeader />
      <SectionLine title={'Información'} />
      <BasicProfileInfoWidget />
      <SectionLine title={'Puntos de Fidelidad'} />
      <LoyaltyPointsWidget />
      <Footer style={{ margin: 'auto 1.25rem 1.25rem 1.25rem' }} />
    </>
  );
}, '0px');
