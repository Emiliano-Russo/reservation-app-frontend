import { CapacitorConfig } from '@capacitor/cli';
import { GOOGLE_API_KEY_MAPS } from './env';

const config: CapacitorConfig = {
  appId: 'com.jirencompany.reservation',
  appName: 'Agenda Fácil',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    allowNavigation: ['*'],
  },
  plugins: {
    GoogleMapsPlugin: {
      apiKey: GOOGLE_API_KEY_MAPS,
    },
    GeolocationPlugin: {
      apiKey: GOOGLE_API_KEY_MAPS,
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ffa500',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      spinnerColor: '#999999',
    },
  },
};

export default config;
