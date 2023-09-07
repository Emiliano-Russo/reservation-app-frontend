import { useState } from 'react';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { Welcome } from './Welcome';
import { BasicInfo } from './BasicInfo';
import { ReservationDetails } from './ReservationDetails';
import { LocationInfo } from './LocationInfo';
import { Final } from './Final';
import { Button } from 'antd';

export const CreateBusiness = withPageLayout(
  () => {
    const [step, setStep] = useState(1);

    const renderScreen = () => {
      switch (step) {
        case 1:
          return (
            <Welcome
              onNext={() => {
                setStep((prev) => prev + 1);
              }}
            />
          );
          break;

        case 2:
          return <BasicInfo />;
          break;

        case 3:
          return <LocationInfo />;
          break;

        case 4:
          return <ReservationDetails />;
          break;

        case 5:
          return <Final />;
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
            padding: '20px',
            alignContent: 'center',
            justifyContent: 'space-between',
            margin: 'auto 0px 10px 0px',
          }}
        >
          <Button
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
            style={{ visibility: step == 5 ? 'hidden' : 'visible' }}
          >
            Siguiente
          </Button>
        </div>
      </>
    );
  },
  '0px',
  false,
);
