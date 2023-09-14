import { useState } from 'react';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { Welcome } from './Welcome';
import { BasicInfo } from './BasicInfo';
import { ReservationDetails } from './ReservationDetails';
import { LocationInfo } from './LocationInfo';
import { DataReview } from './DataReview';
import { Button, Modal, message } from 'antd';
import dayjs from 'dayjs';
import { BusinessService } from '../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { FadeFromTop } from '../../animations/FadeFromTop';
import { useSelector } from 'react-redux';
import {
  IAvailability,
  IShift,
  WeekDays,
  mapDayToEnglish,
} from '../../interfaces/interfaces';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const CreateBusiness = withPageLayout(
  () => {
    const businessServices = new BusinessService(REACT_APP_BASE_URL);

    const nav = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [businessData, setBusinessData] = useState<any>({
      businessName: '',
      businessType: {
        id: null,
        name: null,
      },
      businessDescription: '',
      logoFileList: [''],
      bannerFileList: [''],
      welcomeData: {},
      locationInfo: {
        country: null,
        department: null,
        email: '',
        address: '',
        selectedLocation: null,
      },
      reservationDetails: {
        openingTime: null,
        closingTime: null,
        daysAvailable: [],
      },
    });

    const user = useSelector((state: any) => state.user.user);

    const handleReservationDetailsChange = (key, value) => {
      setBusinessData((prevData) => {
        const updatedData = {
          ...prevData,
          reservationDetails: {
            ...prevData.reservationDetails,
            [key]: value,
          },
        };
        console.log('Prev data:', prevData);
        console.log('Updated data:', updatedData);
        return updatedData;
      });
    };

    const handleLocationInfoChange = (key, value) => {
      setBusinessData((prevData) => ({
        ...prevData,
        locationInfo: {
          ...prevData.locationInfo,
          [key]: value,
        },
      }));
    };

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleModalOk = () => {
      setIsModalVisible(false);
    };

    const handleModalCancel = () => {
      setIsModalVisible(false);
    };

    const handleBusinessNameChange = (value) => {
      setBusinessData((prevData) => ({ ...prevData, businessName: value }));
    };

    const handleBusinessTypeChange = (value) => {
      console.log('value businessType: ', value);
      setBusinessData((prevData) => ({ ...prevData, businessType: value }));
    };

    const handleBusinessDescriptionChange = (value) => {
      setBusinessData((prevData) => ({
        ...prevData,
        businessDescription: value,
      }));
    };

    const handleLogoFileListChange = (list) => {
      console.log('on logo file list: ', list);
      setBusinessData((prevData) => ({ ...prevData, logoFileList: list }));
    };

    const handleBannerFileListChange = (list) => {
      console.log('on banner file list: ', list);
      setBusinessData((prevData) => ({ ...prevData, bannerFileList: list }));
    };

    const updateBusinessData = (data) => {
      setBusinessData((prevData) => ({ ...prevData, ...data }));
    };

    const createBusiness = () => {
      console.log('creating business: ', businessData);
      const availabilityTransformed = transformToAvailability(
        businessData.reservationDetails,
      );
      const obj = {
        ownerId: user.id,
        typeId: businessData.businessType.id,
        name: businessData.businessName,
        description: businessData.businessDescription,
        country: businessData.locationInfo.country,
        department: businessData.locationInfo.department,
        address: businessData.locationInfo.address,
        coordinates: businessData.locationInfo.selectedLocation,
        availability: availabilityTransformed,
      };
      console.log('final obj: ', obj);
      console.log('logo: ', businessData.logoFileList);
      console.log('banner: ', businessData.bannerFileList);
      businessServices
        .registerBusiness(
          obj,
          businessData.logoFileList[0],
          businessData.bannerFileList[0],
        )
        .then(() => {
          showModal();
        })
        .catch(() => {
          message.error('error creating business');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    function transformToAvailability(reservationDetails: any): IAvailability[] {
      const shifts: IShift[] = [
        {
          openingTime: reservationDetails.openingTime,
          closingTime: reservationDetails.closingTime,
        },
      ];

      const availability: IAvailability[] =
        reservationDetails.daysAvailable.map((dayInSpanish: string) => ({
          day: mapDayToEnglish(dayInSpanish),
          shifts: shifts,
          open: true,
        }));

      return availability;
    }

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
            <BasicInfo
              businessName={businessData.businessName}
              businessType={businessData.businessType}
              businessDescription={businessData.businessDescription}
              logoFileList={businessData.logoFileList}
              bannerFileList={businessData.bannerFileList}
              onBusinessNameChange={handleBusinessNameChange}
              onBusinessTypeChange={handleBusinessTypeChange}
              onBusinessDescriptionChange={handleBusinessDescriptionChange}
              onLogoFileListChange={handleLogoFileListChange}
              onBannerFileListChange={handleBannerFileListChange}
            />
          );

        case 3:
          return (
            <LocationInfo
              country={businessData.locationInfo.country}
              department={businessData.locationInfo.department}
              email={businessData.locationInfo.email}
              address={businessData.locationInfo.address}
              onCountryChange={(value) => {
                handleLocationInfoChange('country', value);
                handleLocationInfoChange('department', null);
              }}
              onDepartmentChange={(value) =>
                handleLocationInfoChange('department', value)
              }
              onEmailChange={(value) =>
                handleLocationInfoChange('email', value)
              }
              onAddressChange={(value) =>
                handleLocationInfoChange('address', value)
              }
              onMarkerPlace={(location) =>
                handleLocationInfoChange('selectedLocation', location)
              }
            />
          );

        case 4:
          return (
            <ReservationDetails
              openingTime={businessData.reservationDetails.openingTime}
              closingTime={businessData.reservationDetails.closingTime}
              daysAvailable={businessData.reservationDetails.daysAvailable}
              onOpeningTimeChange={(date) => {
                handleReservationDetailsChange('openingTime', date);
              }}
              onClosingTimeChange={(date) => {
                handleReservationDetailsChange('closingTime', date);
              }}
              onDaysAvailableChange={(value) =>
                handleReservationDetailsChange('daysAvailable', value)
              }
            />
          );

        case 5:
          return <DataReview businessData={businessData} />;

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
              background: '#a0d911',
              color: 'white',
            }}
            onClick={() => {
              setLoading(true);
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
