import axios, { AxiosResponse } from 'axios';
import { formatQueryParams } from '../utils/formatQuery';
import { PaginatedResponse, PaginationDto } from '../interfaces/pagination.dto';

export class BusinessTypeService {
  private api: any;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`,
    });
  }

  async getBusinessTypes(paginated: PaginationDto): Promise<PaginatedResponse> {
    const response: AxiosResponse<any> = await this.api.get(
      `/businessType?limit=${paginated.limit}&page=${paginated.page}`,
    );
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
}
