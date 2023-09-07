import axios, { AxiosResponse } from 'axios';
import { mock_businessType } from '../mocks/businessType';

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
      }, 0); // Simulando un retraso de 2 segundos
    });
  }

  async mock_getBusinessType(businessTypeId: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Encuentra el negocio con el id proporcionado
        const business = mock_businessType.find(
          (business) => business.id === businessTypeId,
        );
        resolve(business);
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
