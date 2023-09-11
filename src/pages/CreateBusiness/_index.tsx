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

export const CreateBusiness = withPageLayout(
  () => {
    const businessServices = new BusinessService(REACT_APP_BASE_URL);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [businessData, setBusinessData] = useState({
      businessName: '',
      businessType: null,
      businessDescription: '',
      logoFileList: [],
      bannerFileList: [],
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
              businessServices
                .mock_RegisterBusiness(businessData)
                .then(() => {
                  showModal(); // Muestra el modal en lugar de un mensaje
                })
                .catch(() => {
                  message.error('error creating business');
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            Crear Negocio
          </Button>
          <Modal
            title="Negocio Creado"
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            <p>¡Tu negocio ha sido creado satisfactoriamente!</p>
          </Modal>
        </div>
      </>
    );
  },
  '0px',
  false,
);
