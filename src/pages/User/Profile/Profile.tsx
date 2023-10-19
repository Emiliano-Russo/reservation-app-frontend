import { Avatar, Button, Progress, Modal, Menu, message } from 'antd';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import {
  ContactsOutlined,
  DownOutlined,
  HomeOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import styles from './Profile.module.css';
import { StatusBar } from '@capacitor/status-bar';
import { useNavigate } from 'react-router-dom';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { withAuth } from '../../../wrappers/WithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserService } from '../../../services/user.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { BusinessService } from '../../../services/business.service';
import { GrowsFromLeft } from '../../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../../animations/AnimatedFromLeft';
import { ModalAccountChanger } from '../../../components/ModalAccountChanger/ModalAccountChanger';
import { setBusinessList } from '../../../redux/businessSlice';
import { IBusiness } from '../../../interfaces/business/business.interface';
import { RootState } from '../../../redux/store';
import { addUser } from '../../../redux/userSlice';
import { iconLoyaltyPoints } from '../../../utils/config';
import { MailService } from '../../../services/mail.service';

interface IconInfo {
  icon: React.ReactNode;
  label: string;
  value: string | boolean;
  color?: string;
  onTap?: () => void;
}

export const BasicProfileInfoWidget = ({ icons }: { icons: IconInfo[] }) => {
  return (
    <div className={styles.container}>
      {icons.map((iconInfo, index) => (
        <div key={index} className={styles.row} onClick={iconInfo.onTap}>
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

interface PropsLoyalty {
  points: number;
}

const LoyaltyPointsWidget = (props: PropsLoyalty) => {
  return (
    <div className={styles.containerLoyalty}>
      <img
        src={iconLoyaltyPoints}
        alt="Loyalty Points Icon"
        className={styles.iconLoyalty}
      />
      <p className={styles.pointsLoyalty}>{props.points}</p>
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
          <button
            style={{ color: 'black', background: 'white' }}
            onClick={() => {
              nav('/store');
            }}
          >
            <ShoppingCartOutlined style={{ fontSize: '1.5rem' }} />
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

interface PropsModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const RESEND_TIMEOUT = 5 * 60 * 1000; // 5 minutos

const ModalVerifyMail = (props: PropsModal) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((user: RootState) => user.user.user);
  const mailService = new MailService(REACT_APP_BASE_URL);

  // Obtener la próxima fecha de reenvío desde localStorage al montar el componente
  const [nextResend, setNextResend] = useState<Date | null>(() => {
    const storedDate = localStorage.getItem('nextResend');
    return storedDate ? new Date(storedDate) : null;
  });

  const canResend = !nextResend || new Date() > nextResend;

  useEffect(() => {
    // Guardar la próxima fecha de reenvío en localStorage cada vez que cambie
    if (nextResend) {
      localStorage.setItem('nextResend', nextResend.toISOString());
    } else {
      localStorage.removeItem('nextResend');
    }
  }, [nextResend]);

  if (!user)
    return (
      <Modal
        title="Verificación de correo"
        open={props.open}
        onCancel={() => props.setOpen(false)}
        footer={null}
      >
        <h1>No User...</h1>
      </Modal>
    );

  const handleResend = () => {
    if (!canResend) {
      message.info('Por favor, espera antes de reenviar.');
      return;
    }

    setLoading(true);
    mailService
      .sendConfirmationEmail(user.email)
      .then((val) => {
        message.success('Correo Enviado!');
        setNextResend(new Date(Date.now() + RESEND_TIMEOUT));
      })
      .catch((err) => {
        message.error('Error al enviar correo');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title="Verificación de correo"
      open={props.open}
      onCancel={() => props.setOpen(false)}
      footer={null}
    >
      <p>Tu dirección de correo no está verificada.</p>
      <p>
        Si deseas reenviar el correo de verificación, haz clic en el botón
        abajo.
      </p>
      <Button loading={loading} onClick={handleResend} disabled={!canResend}>
        Reenviar correo de verificación
      </Button>
    </Modal>
  );
};

const userService = new UserService(REACT_APP_BASE_URL);

export const Profile = withAuth(
  withPageLayout(() => {
    StatusBar.setBackgroundColor({ color: '#ffa500' });
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      fetchUser();
    }, []);

    if (!user) return <h1>No user</h1>;

    const fetchUser = async () => {
      userService
        .getUser(user.id)
        .then((user) => {
          dispatch(addUser(user));
        })
        .catch((err) => {
          message.error('Error al obtener datos del usuario');
        });
    };

    const onTapEmail = () => {
      console.log('email tapped');
      if (user.emailVerified == false) setOpen(true);
    };

    const icons = [
      {
        icon: <HomeOutlined style={{ color: 'gray' }} />,
        label: 'País',
        value: user.country,
      },
      {
        icon: <MailOutlined style={{ color: 'gray' }} />,
        label: 'Email',
        value: user.email,
        color: user.emailVerified ? 'black' : 'red',
        onTap: onTapEmail,
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
        <LoyaltyPointsWidget points={user.loyaltyPoints} />
        <ModalVerifyMail open={open} setOpen={setOpen} />
      </FadeFromTop>
    );
  }, '0px'),
);
