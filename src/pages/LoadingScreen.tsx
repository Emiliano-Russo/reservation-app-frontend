import { IonLoading } from '@ionic/react';

const LoadingScreen: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    return (
        <IonLoading
            isOpen={isOpen}
            message={'Iniciando...'}
            spinner="circular"
        />
    );
};

export default LoadingScreen;
