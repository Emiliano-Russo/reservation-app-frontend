import { CapacitorConfig } from '@capacitor/cli';
import { GOOGLE_API_KEY_MAPS } from './env';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'reservation-app-frontend',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    GoogleMapsPlugin: {
      apiKey: GOOGLE_API_KEY_MAPS,
    },
    GeolocationPlugin: {
      apiKey: GOOGLE_API_KEY_MAPS,
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: false,
    },
  },
};

export default config;
