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
import styles from './Profile.module.css';
import { StatusBar } from '@capacitor/status-bar';
import { useNavigate } from 'react-router-dom';
import { FadeFromTop } from '../../animations/FadeFromTop';
import { withAuth } from '../../wrappers/WithAuth';
import { useSelector } from 'react-redux';

const BasicProfileInfoWidget = ({ phone, email, docId, emailVerified }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <p>{phone}</p>
        <PhoneOutlined style={{ color: 'gray' }} />
      </div>
      <div className={styles.row}>
        <p style={{ color: emailVerified ? 'black' : 'red' }}>{email}</p>
        {emailVerified == false && <Button>Verificar</Button>}
        <MailOutlined style={{ color: 'gray' }} />
      </div>
      <div className={styles.row}>
        <p>{docId}</p>
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

interface PropsHeader {
  url: string;
  name: string;
}

const ProfileHeader = (props: PropsHeader) => {
  const nav = useNavigate();

  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <Avatar src={props.url} size={80}>
            E
          </Avatar>{' '}
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
        <button>
          <DownOutlined style={{ color: 'black' }} />
        </button>
      </div>
    </>
  );
};

export const Profile = withAuth(
  withPageLayout(() => {
    StatusBar.setBackgroundColor({ color: '#fd6f8e' });

    const user = useSelector((state: any) => state.user.user);
    console.log('user: ', user);

    return (
      <FadeFromTop>
        <ProfileHeader
          name={user.name}
          url={
            'https://i.pinimg.com/564x/66/44/b3/6644b34c91f57f8d40a4eaa94e3cb797.jpg'
          }
        />
        <SectionLine title={'Información'} />
        <BasicProfileInfoWidget
          phone={user.phone}
          email={user.email}
          docId={user.civilIdDoc}
          emailVerified={user.emailVerified}
        />
        <SectionLine title={'Puntos de Fidelidad'} />
        <LoyaltyPointsWidget />
      </FadeFromTop>
    );
  }, '0px'),
);
