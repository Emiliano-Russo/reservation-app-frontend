import axios, { AxiosResponse } from 'axios';

const mock_businessType = [
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
    id: '6',
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

export class BusinessTypeService {
  private api: any;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`,
    });
  }

  async getBusinessTypes(): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get('/businessType');
    return response.data;
  }

  async getBusinessType(businessTypeId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(
      `/businessType?businessTypeId=${businessTypeId}`,
    );
    return response.data;
  }

  async createBusinessType(createBusinessTypeDto: any): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post(
      '/businessType',
      createBusinessTypeDto,
    );
    return response.data;
  }

  async updateBusinessType(
    id: string,
    updateBusinessTypeDto: any,
  ): Promise<any> {
    const response: AxiosResponse<any> = await this.api.patch(
      `/businessType/${id}`,
      updateBusinessTypeDto,
    );
    return response.data;
  }

  async removeBusinessType(id: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.delete(
      `/businessType/${id}`,
    );
    return response.data;
  }

  async mock_getBusinessTypes(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock_businessType);
      }, 2000); // Simulando un retraso de 2 segundos
    });
  }

  async mock_getBusinessType(businessTypeId: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulando que regresa un tipo de negocio específico
        if (businessTypeId === '1') {
          resolve({
            id: '1',
            name: 'BusinessType1',
            description: 'Description1',
          });
        } else if (businessTypeId === '2') {
          resolve({
            id: '2',
            name: 'BusinessType2',
            description: 'Description2',
          });
        } else {
          resolve(null); // Si no se encuentra el ID
        }
      }, 2000);
    });
  }

  async mock_createBusinessType(createBusinessTypeDto: any): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulando que regresa el tipo de negocio creado con un ID generado
        resolve({
          ...createBusinessTypeDto,
          id: Math.random().toString(36).substring(7), // Simulando un ID aleatorio
        });
      }, 2000);
    });
  }

  async mock_updateBusinessType(
    id: string,
    updateBusinessTypeDto: any,
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulando que regresa el tipo de negocio actualizado
        resolve({
          id: id,
          ...updateBusinessTypeDto,
        });
      }, 2000);
    });
  }

  async mock_removeBusinessType(id: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulando que regresa un mensaje de éxito
        resolve({
          message: `BusinessType with ID ${id} removed successfully.`,
        });
      }, 2000);
    });
  }
}
