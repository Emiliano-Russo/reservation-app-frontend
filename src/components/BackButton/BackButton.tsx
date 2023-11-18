import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

const BackButtonHandler: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = () => {
      navigate(-1);
    };

    CapacitorApp.addListener('backButton', handleBackButton);

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [navigate]);

  return null;
};

export default BackButtonHandler;
