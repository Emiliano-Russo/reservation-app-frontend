import React, { useState, useEffect } from 'react';
import { withPageLayout } from '../../wrappers/WithPageLayout';
import { IonDatetime } from '@ionic/react';
import { Button, Input, Modal, Select } from 'antd';
import { BackNavigationHeader } from '../../components/BackNavigationHeader/BackNavigationHeader';
import styles from './NewReservation.module.css';
import { BusinessService } from '../../services/business.service';
import { REACT_APP_BASE_URL } from '../../../env';
import { useParams } from 'react-router-dom';
import { BusinessTypeService } from '../../services/businessType.service';

const { Option } = Select;

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
    setControlValues((prevState) => ({
      ...prevState,
      [label]: value,
    }));
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

export const NewReservation = withPageLayout(() => {
  const [controlValues, setControlValues] = useState<any>({});
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState<any>(null);
  const [businessType, setBusinessType] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [innerHeight, setInnerHeight] = useState<number>(0);

  const { id } = useParams<any>(); // Obtener el id desde la URL

  useEffect(() => {
    console.log('setting inner height');
    setInnerHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        if (id) {
          const businessData = await businessService.mock_GetBusiness(id);
          setBusiness(businessData);
          businessTypeService
            .mock_getBusinessType(businessData.typeId)
            .then((val) => {
              console.log('this is the value business type ', val);
              setBusinessType(val);
            })
            .catch((err) => {
              console.log('wtf an error');
            });
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    }

    fetchBusinessDetails();
  }, [id]);

  console.log('control values! ', controlValues);

  return (
    <>
      <BackNavigationHeader title={'Reserva'} />
      <div
        style={{ display: step === 2 ? 'none' : 'flex' }}
        className={styles.calendarContainer}
      >
        <IonDatetime
          className={styles.calendarStyle}
          placeholder="Seleccione una fecha"
          onIonChange={(e) =>
            setControlValues((prevState) => ({
              ...prevState,
              date: e.detail.value,
            }))
          }
        ></IonDatetime>
      </div>

      {(step == 2 || (step == 1 && innerHeight >= 680)) &&
      businessType &&
      businessType.controls ? (
        <>
          <Controls
            controls={businessType.controls}
            setControlValues={setControlValues}
          />
        </>
      ) : null}

      {step == 2 && (
        <>
          {/* Botones */}
          <div className={styles.buttonsContainer}>
            <Button onClick={() => setStep(1)}>Atrás</Button>
            <Button
              type="primary"
              onClick={() => {
                setModalOpen(true);
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
          <Button>Cancelar</Button>
          <Button
            type="primary"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Enviar
          </Button>
        </div>
      ) : null}

      {modalOpen && (
        <Modal
          open={modalOpen}
          onCancel={() => {
            setModalOpen(false);
          }}
          bodyStyle={{ padding: 0 }}
          footer={
            <div>
              <Button
                danger
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  //con el servicio de reserva enviar una
                }}
              >
                Confimar
              </Button>
            </div>
          }
        >
          <div className={styles.modalContent}>
            <h3>{business.name}</h3>
            <p>Fecha</p>
            <span>{formatDate(controlValues.date)}</span>
            {businessType.controls.map((val) => {
              return (
                <>
                  <p key={val.label}>{val.label}</p>
                  <span>{controlValues[val.label]}</span>
                </>
              );
            })}
          </div>
        </Modal>
      )}
    </>
  );
}, '0px');
