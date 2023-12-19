import axios, { AxiosResponse } from 'axios';
import { formatQueryParams } from '../utils/formatQuery';
import { PaginatedResponse, PaginationDto } from '../interfaces/pagination.dto';
import { IBusinessType } from '../interfaces/businessType/businessType.interface';

export class BusinessTypeService {
  private api: any;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`,
    });
  }

  async getBusinessTypes(
    paginated: PaginationDto,
  ): Promise<PaginatedResponse<IBusinessType>> {
    const jwtToken = localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.get(
      `/businessType?limit=${paginated.limit}&page=${paginated.page}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async getBusinessType(businessTypeId: string): Promise<any> {
    const jwtToken = localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.get(
      `/businessType?businessTypeId=${businessTypeId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async createBusinessType(createBusinessTypeDto: any): Promise<any> {
    const jwtToken = localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.post(
      '/businessType',
      createBusinessTypeDto,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async updateBusinessType(
    id: string,
    updateBusinessTypeDto: any,
  ): Promise<any> {
    const jwtToken = localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.patch(
      `/businessType/${id}`,
      updateBusinessTypeDto,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async removeBusinessType(id: string): Promise<any> {
    const jwtToken = localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.delete(
      `/businessType/${id}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }
}
