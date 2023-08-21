import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IonApp, setupIonicReact } from '@ionic/react';
import { SplashScreen } from '@capacitor/splash-screen';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { Home } from './pages/Home';

setupIonicReact();

const App: React.FC = () => {
  SplashScreen.hide();
  return (
    <IonApp>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </IonApp>
  )
};

export default App;
