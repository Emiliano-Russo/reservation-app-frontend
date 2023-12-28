import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { formatQueryParams } from '../utils/formatQuery';
import { PaginatedResponse, PaginationDto } from '../interfaces/pagination.dto';
import {
  AcceptStatus,
  IReservation,
} from '../interfaces/reservation/reservation.interface';
import { ReservationStatus } from '../interfaces/reservation.status';

// Podrías tener un mock para Reservation similar a mock_businessType si lo necesitas.
// import { mock_reservation } from '../mocks/reservation';

export class ReservationService {
  private api: AxiosInstance;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`,
    });
  }

  async getReservations(
    paginated: PaginationDto,
  ): Promise<PaginatedResponse<IReservation>> {
    const jwtToken = localStorage.getItem('token');
    console.log(jwtToken);
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation${formatQueryParams(paginated)}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async getReservationsByUserId(
    userId: string,
    paginated: PaginationDto,
    search: string = '',
    start: string = '',
    end: string = '',
    status: string = '',
  ): Promise<PaginatedResponse<IReservation>> {
    const jwtToken =  localStorage.getItem('token');
    console.log(jwtToken);
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?userId=${userId}&${formatQueryParams(
        paginated,
      )}&search=${search}&startDate=${start}&endDate=${end}&status=${status}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async getReservationsByBusinessId(
    businessId: string,
    paginated: PaginationDto,
    search: string = '',
    start: string = '',
    end: string = '',
    status: string = '',
  ): Promise<PaginatedResponse<IReservation>> {
    const jwtToken =  localStorage.getItem('token');
    console.log(
      `/reservation?businessId=${businessId}&${formatQueryParams(
        paginated,
      )}&search=${search}&startDate=${start}&endDate=${end}&status=${status}`,
    );
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?businessId=${businessId}&${formatQueryParams(
        paginated,
      )}&search=${search}&startDate=${start}&endDate=${end}&status=${status}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async getReservation(reservationId: string): Promise<any> {
    const jwtToken =  localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?reservationId=${reservationId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async createReservation(createReservationDto: any): Promise<any> {
    const jwtToken =  localStorage.getItem('token');
    console.log('########### creating reservation: ', createReservationDto);
    const response: AxiosResponse<any> = await this.api.post(
      '/reservation',
      createReservationDto,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async updateReservation(id: string, updateReservationDto: any): Promise<any> {
    const jwtToken =  localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.patch(
      `/reservation/${id}`,
      updateReservationDto,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async removeReservation(id: string): Promise<any> {
    const jwtToken =  localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.delete(
      `/reservation/${id}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async businessProposedSchedule(id: string, date: string): Promise<any> {
    const jwtToken =  localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.patch(
      `/reservation/scheduleProposed/${id}`,
      { date: date },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async userResponseProposedSchedule(
    id: string,
    value: AcceptStatus,
  ): Promise<any> {
    const jwtToken =  localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.patch(
      `/reservation/responseSchedulePropose/${id}`,
      { value: value },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async rateReservation(
    id: string,
    ratingDto: { rating: number; comment: string },
  ): Promise<any> {
    const jwtToken =  localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.patch(
      `/reservation/rate/${id}`,
      ratingDto,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async getLastReviewByBusinessId(businessId: string): Promise<IReservation> {
    const jwtToken =  localStorage.getItem('token');
    const response: AxiosResponse<IReservation> = await this.api.get(
      `/reservation/latest/${businessId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async deleteUser(userId: string): Promise<any> {
    const jwtToken =  localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.delete(
      `/reservation/user/${userId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }
}
