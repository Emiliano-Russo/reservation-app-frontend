import axios, { AxiosResponse } from 'axios';
import { mocked_business } from '../mocks/business';

export class BusinessService {
  private api: any;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`, // Ejemplo: http://localhost:3001
    });
  }

  public async registerBusiness(
    business: any,
    logoImage?: File | null,
  ): Promise<any> {
    const formData = new FormData();

    formData.append('ownerId', business.ownerId);
    formData.append('typeId', business.typeId);
    formData.append('name', business.name);
    formData.append('address', business.address);
    formData.append('description', business.description);

    if (business.coordinates) {
      formData.append('coordinates[pointX]', business.coordinates.pointX);
      formData.append('coordinates[pointY]', business.coordinates.pointY);
    }

    if (logoImage) {
      formData.append('logoImage', logoImage, logoImage.name);
    }

    return this.api.post('/businesses', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
  }

  async getBusiness(businessId: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/businesses/${businessId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async getBusinessesByTypeId(typeId: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/businesses/type/${typeId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async editBusiness(
    businessParam: any,
    logoImage?: File | null,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('name', businessParam.name);
    formData.append('address', businessParam.address);
    formData.append('description', businessParam.description);

    if (businessParam.coordinates) {
      formData.append('coordinates[pointX]', businessParam.coordinates.pointX);
      formData.append('coordinates[pointY]', businessParam.coordinates.pointY);
    }

    if (logoImage) {
      formData.append('logoImage', logoImage, logoImage.name);
    }

    return this.api.put(`/businesses/${businessParam.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
  }

  async searchByBusinessName(businessName: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/businesses/search/${businessName}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async mock_GetBusiness(businessId: string): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Encuentra el negocio con el id proporcionado
    const business = mocked_business.find(
      (business) => business.id === businessId,
    );

    if (!business) throw new Error('Business not found');

    return business;
  }

  async mock_GetBusinessesByTypeId(typeId: string): Promise<any> {
    // Simular un tiempo de espera como si estuviera haciendo una solicitud HTTP.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retornamos una lista mockeada de negocios que concuerden con el typeId proporcionado.
    // Puedes ajustar la respuesta según tus necesidades.
    return mocked_business.filter((business) => business.typeId === typeId);
  }
}
