export const mock_businessType = [
  {
    id: '1',
    name: 'Canchas de \n Futbol',
    description: 'Description1',
    icon: 'https://img.icons8.com/color/48/football2--v1.png',
  },
  {
    id: '2',
    name: 'Restaurantes de Comida',
    description: 'Description2',
    icon: 'https://img.icons8.com/color/96/dining-room.png',
    controls: [
      {
        type: 'select-one',
        label: 'Preferencia de asiento',
        options: ['Ventana', 'Interior', 'Cerca de la entrada', 'Afuera'],
        default: 'Interior',
      },
      {
        type: 'counter',
        label: 'Cantidad de invitados',
        min: 1,
        max: 10,
        default: 1,
      },
      // {
      //   type: 'checkbox',
      //   label: '¿Necesita silla para bebé?',
      //   default: false,
      // },
      // {
      //   type: 'select-multiple',
      //   label: 'Aderezos adicionales',
      //   options: ['Mayonesa', 'Mostaza', 'Ketchup', 'Ranch', 'BBQ'],
      //   default: ['Mayonesa', 'Ketchup'],
      // },
    ],
  },
  {
    id: '3',
    name: 'Salones de Peluqueria',
    icon: 'https://img.icons8.com/plasticine/100/barber-scissors.png',
  },
  {
    id: '4',
    name: 'Clases de \n Yoga',
    icon: 'https://img.icons8.com/officel/80/meditation-guru.png',
  },
  {
    id: '5',
    name: 'Salones de \n belleza',
    description: 'Salon de belleza facial, manicura, etc',
    icon: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-nails-anatomy-flaticons-flat-flat-icons.png',
  },
  {
    id: '6',
    name: 'Gimnasios',
    description: 'Lugares para hacer ejercicio y mantenerse en forma.',
    icon: 'https://img.icons8.com/color/96/dumbbell.png',
  },
  {
    id: '7',
    name: 'Bares \n Nocturnos',
    description: 'Lugares  para ir a tomar con amigos',
    icon: 'https://img.icons8.com/plasticine/100/cocktail.png',
  },
  {
    id: '8',
    name: 'Espacios de \n Coworking',
    description: 'Salas para concentrarse y trabajar',
    icon: 'https://img.icons8.com/office/80/office.png',
  },
  {
    id: '9',
    name: 'Entrenamiento \n Funcional',
    description: '',
    icon: 'https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/64/external-fitness-home-activity-photo3ideastudio-flat-photo3ideastudio.png',
  },
  {
    id: '10',
    name: 'Clínicas \n Dentales',
    description: '',
    icon: 'https://img.icons8.com/external-tal-revivo-fresh-tal-revivo/56/external-old-age-weak-tooth-begin-removed-in-dental-care-dentistry-fresh-tal-revivo.png',
  },
];
