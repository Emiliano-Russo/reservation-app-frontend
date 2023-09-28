import axios, { AxiosResponse } from 'axios';
import { PaginatedResponse, PaginationDto } from '../interfaces/pagination.dto';
import { formatQueryParams } from '../utils/formatQuery';
import { IBusiness } from '../interfaces/business/business.interface';
import { IBusinessCreateDto } from '../pages/User/CreateBusiness/dto/create-business.dto';

export class BusinessService {
  private api: any;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`, // Ejemplo: http://localhost:3001
    });
  }

  public async registerBusiness(
    business: IBusinessCreateDto,
    logoImage?: File | null,
    bannerImage?: File | null,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('ownerId', business.ownerId);
    formData.append('typeId', business.typeId);
    formData.append('name', business.name);
    formData.append('country', business.country);
    formData.append('address', business.address);
    formData.append('description', business.description);
    formData.append('department', business.department);
    formData.append('coordinatesStringify', business.coordinatesStringify);
    formData.append('availabilityStringify', business.availabilityStringify);

    if (logoImage) {
      formData.append('logo', logoImage, logoImage.name);
    }

    if (bannerImage) {
      formData.append('banner', bannerImage, bannerImage.name);
    }

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

  async getBusinessesByOwnerId(
    ownerId: string,
    paginated: PaginationDto,
  ): Promise<PaginatedResponse<IBusiness>> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/business?ownerId=${ownerId}&${formatQueryParams(paginated)}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async getBusinessesByTypeId(
    typeId: string,
    paginated: PaginationDto,
    search: string = '',
    country: string = '',
    department: string = '',
  ): Promise<PaginatedResponse<IBusiness>> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/business?typeId=${typeId}&${formatQueryParams(
        paginated,
      )}&search=${search}&country=${country}&department=${department}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async editBusiness(
    businessParam: any,
    logoImage?: File,
    bannerImage?: File,
  ): Promise<any> {
    const formData = new FormData();
    formData.append('name', businessParam.name);
    formData.append('address', businessParam.address);
    formData.append('description', businessParam.description);
    formData.append('country', businessParam.country);
    formData.append('department', businessParam.department);

    if (businessParam.coordinates) {
      formData.append('coordinates[pointX]', businessParam.coordinates.pointX);
      formData.append('coordinates[pointY]', businessParam.coordinates.pointY);
    }

    if (logoImage) {
      formData.append('logo', logoImage, logoImage.name);
    }

    if (bannerImage) {
      formData.append('banner', bannerImage, bannerImage.name);
    }

    const res = await this.api.patch(
      `/business/${businessParam.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      },
    );
    return res.data;
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
}
