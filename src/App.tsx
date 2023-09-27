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
import { SignIn } from './pages/SignIn/SignIn';
import { SignUp } from './pages/SignUp/SignUp';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Home } from './pages/User/Home/Home';
import { UserReservations } from './pages/User/Reservations/Reservations';
import { Profile } from './pages/User/Profile/Profile';
import { Settings } from './pages/User/Settings/Settings';
import { Business } from './pages/User/Business/Business';
import { BusinessList } from './pages/User/BusinessList/BusinessList';
import { NewReservation } from './pages/User/NewReservation/NewReservation';
import { CreateBusiness } from './pages/User/CreateBusiness/_index';
import { BusinessProfile } from './pages/Entrepreneur/Profile/Profile';
import { BusinessHome } from './pages/Entrepreneur/Home/Home';
import { BusinessReservations } from './pages/Entrepreneur/Reservations/Reservations';
import { EditUserData } from './pages/User/EditUserData/EditUserData';
import { Help } from './pages/User/Help/Help';
import { About } from './pages/About/About';
import { EditBusinessProfile } from './pages/Entrepreneur/EditBusinessProfile/EditBusinessProfile';

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
            <Route path="/reservations" element={<UserReservations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/business/:type/:id" element={<Business />} />
            <Route path="/new-reservation/:id" element={<NewReservation />} />
            <Route path="/business/:type" element={<BusinessList />} />
            <Route path="/edit-user-data" element={<EditUserData />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            {/* business */}
            <Route
              path="/businessPrivateProfile"
              element={<BusinessProfile />}
            />
            <Route
              path="/businessReservation"
              element={<BusinessReservations />}
            />
            <Route path="/businessHome" element={<BusinessHome />} />
            <Route path="/create-business" element={<CreateBusiness />} />
            <Route
              path="/edit-business-profile"
              element={<EditBusinessProfile />}
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </IonApp>
  );
};

export default App;
