import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

interface RegistrationPropUpProps {
  navigate: boolean;
}

export const RegistrationPopUp: React.FC<RegistrationPropUpProps> = (props) => {
  const [open, setOpen] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const nav = useNavigate();

  const handleOk = () => {
    setConfirmLoading(true);
    nav('/signin');
  };

  const handleCancel = () => {
    props.navigate ? nav('/business') : "";
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>To continue, you must to sing up</p>
      </Modal>
    </>
  );
};
