import React, { useState, useEffect } from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { IonDatetime } from '@ionic/react';
import { Button, Input, Modal, Select, message } from 'antd';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import styles from './NewReservation.module.css';
import { BusinessService } from '../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { useNavigate, useParams } from 'react-router-dom';
import { BusinessTypeService } from '../../services/businessType.service';
import { GrowsFromLeft } from '../../animations/GrowsFromLeft';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';
import { FadeFromTop } from '../../animations/FadeFromTop';
import { useSelector } from 'react-redux';
import { ReservationService } from '../../services/reservation.service';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const reservationService = new ReservationService(REACT_APP_BASE_URL);
const businessService = new BusinessService(REACT_APP_BASE_URL);
const businessTypeService = new BusinessTypeService(REACT_APP_BASE_URL);

const Counter = ({ min, max, label, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <Input
        type="number"
        min={min.toString()}
        max={max.toString()}
        onChange={(e) => onChange(label, e.target.value)}
      />
    </div>
  );
};

const Selector = ({ label, options, onChange }) => {
  return (
    <div className={styles.fieldsContainer}>
      <div className={styles.selectContainer}>
        <label>{label}</label>
        <Select
          placeholder="Seleccione una preferencia"
          className={styles.fullWidth}
          onChange={(value) => onChange(label, value)}
        >
          {options.map((val) => (
            <Option key={val} value={val}>
              {val}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

const Controls = ({ controls, setControlValues }) => {
  if (controls == null) return null;

  const handleValueChange = (label, value) => {
    const obj = {
      label,
      value,
      labelFirst: true,
    };
    setControlValues((prevState) => {
      // Filtrar el array para quitar el elemento con el mismo label
      const newExtras = prevState.extras?.filter(
        (item) => item.label !== label,
      );

      if (newExtras) {
        // Pushear el nuevo objeto al array
        newExtras.push(obj);

        return {
          ...prevState,
          extras: newExtras,
        };
      } else
        return {
          ...prevState,
          extras: [obj],
        };
    });
  };

  return (
    <>
      {controls.map((val) => {
        switch (val.type) {
          case 'select-one':
            return (
              <Selector
                label={val.label}
                options={val.options}
                onChange={handleValueChange}
              />
            );
          case 'counter':
            return (
              <Counter
                min={val.min}
                max={val.max}
                label={val.label}
                onChange={handleValueChange}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} • ${hours}:${minutes}`;
};

export const NewReservation = withPageLayout(
  () => {
    const [controlValues, setControlValues] = useState<any>({});
    const [step, setStep] = useState(1);
    const [business, setBusiness] = useState<any>(null);
    const [businessType, setBusinessType] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [innerHeight, setInnerHeight] = useState<number>(0);
    const [doneModal, setDoneModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { id } = useParams<any>();
    const user = useSelector((state: any) => state.user.user);
    const nav = useNavigate();

    useEffect(() => {
      console.log('setting inner height');
      setInnerHeight(window.innerHeight);
    }, []);

    useEffect(() => {
      async function fetchBusinessDetails() {
        try {
          if (id) {
            const businessData = await businessService.getBusiness(id);
            setBusiness(businessData);
            businessTypeService
              .getBusinessType(businessData.typeId)
              .then((val) => {
                setBusinessType(val);
              })
              .catch((err) => {});
          }
        } catch (error) {
          console.error('Error fetching business data:', error);
        }
      }

      fetchBusinessDetails();
    }, [id]);

    const createReservation = () => {
      setLoading(true);
      const create_dto = {
        date: controlValues.date,
        userId: user.id,
        businessId: business.id,
        status: 'Pending',
        extras: controlValues.extras,
      };
      reservationService
        .createReservation(create_dto)
        .then(() => {
          setModalOpen(false);
          setDoneModal(true);
        })
        .catch(() => {
          message.error('Error!');
        });
    };

    return (
      <>
        <GrowsFromLeft>
          <BackNavigationHeader title={business ? business.name : 'Reserva'} />
        </GrowsFromLeft>
        <AnimatedFromLeft>
          <div
            style={{ display: step === 2 ? 'none' : 'flex' }}
            className={styles.calendarContainer}
          >
            <IonDatetime
              className={styles.calendarStyle}
              placeholder="Seleccione una fecha"
              onIonChange={(e) => {
                setControlValues((prevState) => ({
                  ...prevState,
                  date: e.detail.value,
                }));
              }}
            ></IonDatetime>
          </div>
        </AnimatedFromLeft>
        {(step == 2 || (step == 1 && innerHeight >= 680)) &&
        businessType &&
        businessType[0] &&
        businessType[0].controls ? (
          <FadeFromTop>
            <Controls
              controls={businessType[0].controls}
              setControlValues={setControlValues}
            />
          </FadeFromTop>
        ) : null}

        {step == 2 && (
          <>
            {/* Botones */}
            <div className={styles.buttonsContainer}>
              <Button onClick={() => setStep(1)}>Atrás</Button>
              <Button
                type="primary"
                onClick={() => {
                  if (controlValues.date && controlValues.date != null)
                    setModalOpen(true);
                  else message.error('Porfavor selecciona una fecha');
                }}
              >
                Enviar
              </Button>
            </div>
          </>
        )}

        {step === 1 && innerHeight < 680 ? (
          <div className={styles.buttonsContainer}>
            <Button onClick={() => setStep(2)}>Siguiente</Button>
          </div>
        ) : step === 1 ? (
          <div className={styles.buttonsContainer}>
            <Button loading={loading} style={{ visibility: 'hidden' }}>
              Enviar
            </Button>
            <Button
              loading={loading}
              type="primary"
              onClick={() => {
                if (controlValues.date && controlValues.date != null)
                  setModalOpen(true);
                else message.error('Porfavor selecciona una fecha');
              }}
            >
              Enviar
            </Button>
          </div>
        ) : null}

        <Modal
          open={modalOpen}
          onCancel={() => {
            if (loading == false) setModalOpen(false);
          }}
          bodyStyle={{ padding: 0 }}
          footer={
            <div>
              <Button
                danger
                onClick={() => {
                  if (loading == false) setModalOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="primary" onClick={createReservation}>
                Confimar
              </Button>
            </div>
          }
        >
          <div className={styles.modalContent}>
            <h3>{business?.name}</h3>
            <p>Fecha</p>
            <span>{formatDate(controlValues.date)}</span>
            {controlValues.extras?.map((val) => {
              console.log('extra: ', val);
              return (
                <>
                  <p>{val.label}</p>
                  <span>{val.value}</span>
                </>
              );
            })}
          </div>
        </Modal>

        <Modal
          open={doneModal}
          onCancel={() => {
            setDoneModal(false);
          }}
          footer={null}
          centered
          closable={false}
        >
          <div style={{ textAlign: 'center' }}>
            <CheckCircleOutlined style={{ fontSize: '72px', color: 'green' }} />
            <h2>Reserva Lista</h2>
            <p>Tu reserva ha sido enviada con éxito!</p>
            <Button
              onClick={() => {
                nav('/business');
              }}
            >
              Volver al Inicio
            </Button>
          </div>
        </Modal>
      </>
    );
  },
  '0px',
  false,
);
