import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { iconLoyaltyPoints } from '../../../utils/config';
import LoyaltyPointsBadge from '../../../components/LoyaltyPointsBadge/LoyaltyPointsBadge';

export const ConfirmationModal = ({ doneModal, nav, setDoneModal }) => {
  return (
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
        <LoyaltyPointsBadge points={10} />

        <Button
          style={{ marginTop: '10px' }}
          onClick={() => {
            nav('/business');
          }}
        >
          Volver al Inicio
        </Button>
      </div>
    </Modal>
  );
};
