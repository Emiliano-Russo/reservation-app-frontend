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
    bannerImage?: File | null,
  ): Promise<any> {
    const formData = new FormData();

    console.log('BUSINESS: ', business);
    const objnewCoordinates = {
      pointX: business.coordinates.latitude.toString(),
      pointY: business.coordinates.longitude.toString(),
    };
    console.log('obj coordinates: ', objnewCoordinates);

    formData.append('ownerId', business.ownerId);
    formData.append('typeId', business.typeId);
    formData.append('name', business.name);
    formData.append('country', business.country);
    formData.append('address', business.address);
    formData.append('description', business.description);
    formData.append('department', business.department);
    formData.append('coordinates', JSON.stringify(objnewCoordinates));
    formData.append('availability', JSON.stringify(business.availability));

    if (logoImage) {
      formData.append('logo', logoImage, logoImage.name);
    }

    if (bannerImage) {
      formData.append('banner', bannerImage, bannerImage.name);
    }

    console.log('-------------------------------------');
    console.log('EL FORM DATA');
    console.log(formData);

    return this.api.post('/business', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
  }

  async getBusiness(businessId: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/business?businessId=${businessId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async getBusinessesByTypeId(typeId: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/business?typeId=${typeId}`,
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

  async mock_RegisterBusiness(
    business: any,
    logoImage?: File | null,
  ): Promise<any> {
    // Simular un tiempo de espera de 2 segundos como si estuviera haciendo una solicitud HTTP.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simular la respuesta del servidor después del registro
    return {
      data: {
        message: 'Business registered successfully!',
        business: {
          id: 'mocked-id',
          ...business, // Aquí se devuelven los datos del negocio registrados
          logoImage: logoImage ? `mocked_url_for/${logoImage.name}` : null,
        },
      },
      status: 201, // Simular un código de estado HTTP 201 para "creado"
    };
  }
}
