import React, { useState } from 'react';
import { Collapse } from 'antd';
import { FadeFromTop } from '../../../animations/FadeFromTop';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';

const { Panel } = Collapse;

export const Help: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | string[]>('');

  const handlePanelChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  return (
    <div>
      <FadeFromTop>
        <BackNavigationHeader title={'Ayuda'} />
      </FadeFromTop>
      <FadeFromTop>
        <Collapse activeKey={activeKey} onChange={handlePanelChange}>
          <Panel header="¿Cómo hago una reserva?" key="1">
            <div>
              <p>Para hacer una reserva:</p>
              <ol>
                <li>
                  Desde la pantalla principal, navega a través de las categorías
                  de negocios disponibles.
                </li>
                <li>Selecciona la categoría que te interese.</li>
                <li>
                  Se te mostrará una lista de negocios relacionados con esa
                  categoría. Elige el negocio que prefieras.
                </li>
                <li>
                  Dentro del perfil del negocio, encontrarás detalles sobre el
                  mismo, así como la opción de "Reservar".
                </li>
                <li>
                  Haz clic en "Reservar" y sigue las instrucciones para
                  completar tu reserva.
                </li>
              </ol>
            </div>
          </Panel>
          <Panel header="¿Cómo cancelo una reserva?" key="2">
            <div>
              <ol>
                <li>
                  Primero, debes dirigirte a la sección titulada "Reservas".
                  Esta sección está diseñada para mostrar todas las reservas que
                  has realizado a través de la aplicación. Es el lugar central
                  donde puedes gestionar y ver el estado de tus reservas.
                </li>
                <li>
                  Una vez estés en la sección de reservas, busca la reserva
                  específica que deseas cancelar.
                </li>
                <li>
                  Dentro de la ventana desplegada, deberías ver una opción que
                  te permita cancelar la reserva
                </li>
                <li>
                  Es importante recordar que cancelar una reserva, especialmente
                  si ya ha sido confirmada, puede tener consecuencias. En este
                  caso, se menciona que cancelar reservas confirmadas puede
                  resultar en la pérdida de puntos de fidelidad.
                </li>
              </ol>
            </div>
          </Panel>
          <Panel header="¿Qué hago si tengo problemas con mi reserva?" key="3">
            <div>
              <p>Si encuentras problemas con tu reserva:</p>
              <ol>
                <li>
                  Asegúrate de haber seguido todos los pasos correctamente al
                  hacer la reserva.
                </li>
                <li>
                  Verifica que hayas recibido una confirmación de tu reserva.
                </li>
                <li>
                  Si el problema persiste o tienes otras inquietudes, te
                  recomendamos contactar directamente al negocio o al soporte
                  técnico de la aplicación.
                </li>
              </ol>
            </div>
          </Panel>
        </Collapse>
      </FadeFromTop>
    </div>
  );
};
