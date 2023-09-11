import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Selecciona la ubicacion': 'Select location',
      'Selecciona la Hora': 'Select Time',
      'Hora de apertura': 'Opening Time',
      'Hora de clausura': 'Closing Time',
      'Días disponibles': 'Select Available Days',
      Lunes: 'Monday',
      Martes: 'Tuesday',
      Miércoles: 'Wednesday',
      Jueves: 'Thursday',
      Viernes: 'Friday',
      Sábado: 'Saturday',
      Domingo: 'Sunday',
      'Políticas de cancelación': 'Cancellation Policy',
      'Los horarios establecidos son de carácter informativo para el cliente. Sin embargo, es a discreción del negocio aceptar reservas fuera de este horario.':
        "The established schedules are for the customer's information. However, it is at the discretion of the business to accept reservations outside these hours.",
    },
  },
  es: {
    translation: {
      'Selecciona la ubicacion': 'Selecciona la ubicacion',
      'Selecciona la Hora': 'Selecciona la Hora',
      'Hora de apertura': 'Hora de apertura',
      'Hora de clausura': 'Hora de clausura',
      'Días disponibles': 'Días disponibles',
      Lunes: 'Lunes',
      Martes: 'Martes',
      Miércoles: 'Miércoles',
      Jueves: 'Jueves',
      Viernes: 'Viernes',
      Sábado: 'Sábado',
      Domingo: 'Domingo',
      Nota: 'Nota',
      'Políticas de cancelación': 'Políticas de cancelación',
      'Los horarios establecidos son de carácter informativo para el cliente. Sin embargo, es a discreción del negocio aceptar reservas fuera de este horario.':
        'Los horarios establecidos son de carácter informativo para el cliente. Sin embargo, es a discreción del negocio aceptar reservas fuera de este horario.',
      'Los horarios establecidos son de carácter informativo para el cliente. Sin embargo, es a discreción del negocio aceptar reservas fuera de este horario.':
        'Los horarios establecidos son de carácter informativo para el cliente. Sin embargo, es a discreción del negocio aceptar reservas fuera de este horario.',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es', // Idioma por defecto
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
