import React, { useState } from 'react';
import { withPageLayout } from '../../../wrappers/WithPageLayout';
import { Button, Input, message } from 'antd';
import { BackNavigationHeader } from '../../../components/BackNavigationHeader/BackNavigationHeader';
import { UserService } from '../../../services/user.service';
import { REACT_APP_BASE_URL } from '../../../../env';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ReservationService } from '../../../services/reservation.service';
import { removeUserAndToken } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const reservationService = new ReservationService(REACT_APP_BASE_URL);

export const DeleteAccount = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const user = useSelector((state: RootState) => state.user.user);
  const nav = useNavigate();
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div>
        <BackNavigationHeader title={'Eliminar'} />
        <h1 style={{ textAlign: 'center' }}>Sin Usuario</h1>
      </div>
    );
  }

  const handleDeleteAccount = () => {
    // Aquí es donde enviarías la solicitud para eliminar la cuenta
    console.log('Solicitud para eliminar la cuenta enviada');
    setLoading(true);
    reservationService
      .deleteUser(user.id)
      .then(() => {
        message.success('Cuenta eliminada con éxito');
        dispatch(removeUserAndToken());
        nav('/signin');
      })
      .catch(() => {
        message.error('No se pudo eliminar la cuenta');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <BackNavigationHeader title={'Eliminar'} />
      <h1 style={{ textAlign: 'center' }}>Eliminar Cuenta</h1>
      <div style={{ margin: '20px' }}>
        <p style={{ textAlign: 'center' }}>
          ¿Estás seguro de que deseas eliminar tu cuenta? Escribe "Eliminar"
          para confirmar.
        </p>
        <Input
          onChange={(e) => setConfirmationText(e.target.value)}
          value={confirmationText}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '10px',
          }}
        >
          <Button
            loading={loading}
            type="primary"
            danger
            onClick={handleDeleteAccount}
            disabled={confirmationText.toLocaleLowerCase() !== 'eliminar'}
          >
            Sí, eliminar mi cuenta
          </Button>
        </div>
      </div>
    </div>
  );
};
