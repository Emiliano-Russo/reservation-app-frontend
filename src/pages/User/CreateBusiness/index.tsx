import { Dispatch, SetStateAction, useState } from 'react';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { Welcome } from './Welcome';
import { Step1 } from './Step1';
import { Step3 } from './Step3';
import { Step2 } from './Step2';
import { Step4 } from './Step4';
import { Button, Modal, message } from 'antd';
import { BusinessService } from '../../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  BusinessStatus,
  IAvailability,
} from '../../../interfaces/business/business.interface';
import { mapDayToEnglish } from '../../../utils/dateFormat';
import { IBusinessCreateDto } from './dto/create-business.dto';
import { RootState } from '../../../redux/store';

export interface PropsStep {
  businessData: BusinessCreateState;
  setBusinessData: Dispatch<SetStateAction<BusinessCreateState>>;
}

export interface BusinessCreateState {
  name: string;
  typeID: string;
  description: string;
  logo?: File;
  banner?: File;
  country: string;
  department: string;
  address: string;
  coordinatesStringify: string;
  availabilityStringify: string;
}

export const CreateBusiness = withPageLayout(
  () => {
    const businessServices = new BusinessService(REACT_APP_BASE_URL);

    const nav = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [businessData, setBusinessData] = useState<BusinessCreateState>({
      address: '',
      availabilityStringify: '',
      banner: undefined,
      coordinatesStringify: '',
      country: '',
      department: '',
      description: '',
      name: '',
      typeID: '',
      logo: undefined,
    });

    const user = useSelector((state: RootState) => state.user.user);

    if (user == null) return <h1>Error no tenemos usuario!</h1>;

    const updateBusinessData = (data) => {
      setBusinessData((prevData) => ({ ...prevData, ...data }));
    };

    const createBusiness = () => {
      console.log('ALL BUSINESS DATA: ', businessData);
      setLoading(true);
      const createDto: IBusinessCreateDto = {
        address: businessData.address,
        availabilityStringify: businessData.availabilityStringify,
        coordinatesStringify: businessData.coordinatesStringify,
        country: businessData.country,
        department: businessData.department,
        description: businessData.description,
        name: businessData.name,
        ownerId: user.id,
        status: BusinessStatus.Pending,
        typeId: businessData.typeID,
      };
      businessServices
        .registerBusiness(createDto, businessData.logo, businessData.banner)
        .then((res) => {
          setIsModalVisible(true);
        })
        .catch((err) => {
          message.error('Error al registrar');
        })
        .catch(() => {
          setLoading(false);
        });
    };

    const renderScreen = () => {
      switch (step) {
        case 1:
          return (
            <Welcome
              onNext={(data) => {
                updateBusinessData({ welcomeData: data });
                setStep((prev) => prev + 1);
              }}
            />
          );

        case 2:
          return (
            <Step1
              businessData={businessData}
              setBusinessData={setBusinessData}
            />
          );

        case 3:
          return (
            <Step2
              businessData={businessData}
              setBusinessData={setBusinessData}
            />
          );

        case 4:
          return (
            <Step3
              businessData={businessData}
              setBusinessData={setBusinessData}
            />
          );

        case 5:
          return <Step4 {...businessData} />;

        default:
          break;
      }
    };

    return (
      <>
        <BackNavigationHeader title={'Tu Negocio'} />
        {renderScreen()}
        <div
          style={{
            display: 'flex',
            padding: '20px 40px',
            alignContent: 'center',
            justifyContent: 'space-between',
            margin: 'auto auto 10px auto',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            width: '100%',
            borderRadius: '10px',
          }}
        >
          <Button
            loading={loading}
            onClick={() => {
              setStep((prev) => {
                if (prev == 1) return 1;
                else return prev - 1;
              });
            }}
            style={{ visibility: step == 1 ? 'hidden' : 'visible' }}
          >
            Atras
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setStep((prev) => {
                return prev + 1;
              });
            }}
            style={{ display: step == 5 ? 'none' : 'block' }}
          >
            Siguiente
          </Button>
          <Button
            loading={loading}
            type="primary"
            style={{
              display: step == 5 ? 'block' : 'none',
              background: '#389e0d',
              color: 'white',
            }}
            onClick={() => {
              createBusiness();
            }}
          >
            Crear Negocio
          </Button>
          <Modal footer={null} closable={false} open={isModalVisible}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <h2>Negocio Creado</h2>
              <CheckCircleOutlined
                style={{ fontSize: '72px', color: 'green' }}
              />
              <p>¡Tu negocio ha sido creado satisfactoriamente!</p>
              <Button
                onClick={() => {
                  nav('/business');
                }}
              >
                Volver al Inicio
              </Button>
            </div>
          </Modal>
        </div>
      </>
    );
  },
  '0px',
  false,
);
