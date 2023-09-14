import { Avatar, Button, Modal } from 'antd';
import AnimatedFromLeft from '../../animations/AnimatedFromLeft';

export const ModalAccountChanger = ({
  businesses,
  isModalVisible,
  setIsModalVisible,
  nav,
  showUserAccount,
}) => {
  return (
    <Modal
      title="Elige una cuenta"
      open={isModalVisible}
      onOk={() => {}}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      footer={null}
    >
      {businesses?.length == 0 && (
        <div>
          <h4>No tienes negocios todavía!</h4>
          <Button
            onClick={() => {
              nav('/create-business');
            }}
          >
            Abrir mi Negocio
          </Button>
        </div>
      )}
      {businesses != undefined
        ? businesses.map((business, index) => {
            return (
              <AnimatedFromLeft delay={index * 0.1}>
                <div
                  onClick={() => {
                    nav(`/businessPrivateProfile/${business.id}`);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                    margin: '20px 0px',
                    borderRadius: '10px',
                  }}
                >
                  <Avatar src={business.logoURL}></Avatar>
                  <p>{business.name}</p>
                  <Avatar
                    style={{ visibility: 'hidden' }}
                    src={business.logoURL}
                  ></Avatar>
                </div>
              </AnimatedFromLeft>
            );
          })
        : null}
      <Button
        style={{ display: showUserAccount ? 'inherit' : 'none' }}
        onClick={() => {
          nav('/profile');
        }}
      >
        Volver a mi Usuario
      </Button>
    </Modal>
  );
};
