import { IonLoading } from '@ionic/react';

const SplashScreen: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    return (
        <IonLoading
            isOpen={isOpen}
            message={'Iniciando...'}
            spinner="circular"
        />
    );
};

export default SplashScreen;
