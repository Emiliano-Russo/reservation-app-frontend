import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { formatQueryParams } from '../utils/formatQuery';
import { AcceptStatus } from '../interfaces/reservation.interface';
import { PaginatedResponse, PaginationDto } from '../interfaces/pagination.dto';
import { IReservation } from '../interfaces/reservation/reservation.interface';

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
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation${formatQueryParams(paginated)}`,
    );
    return response.data;
  }

  async getReservationsByUserId(
    userId: string,
    paginated: PaginationDto,
  ): Promise<PaginatedResponse<IReservation>> {
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?userId=${userId}&${formatQueryParams(paginated)}`,
    );
    return response.data;
  }

  async getReservationsByBusinessId(
    businessId: string,
    paginated: PaginationDto,
  ): Promise<PaginatedResponse<IReservation>> {
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?businessId=${businessId}&${formatQueryParams(paginated)}`,
    );
    return response.data;
  }

  async getReservation(reservationId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?reservationId=${reservationId}`,
    );
    return response.data;
  }

  async createReservation(createReservationDto: any): Promise<any> {
    console.log('########### creating reservation: ', createReservationDto);
    const response: AxiosResponse<any> = await this.api.post(
      '/reservation',
      createReservationDto,
    );
    return response.data;
  }

  async updateReservation(id: string, updateReservationDto: any): Promise<any> {
    const response: AxiosResponse<any> = await this.api.patch(
      `/reservation/${id}`,
      updateReservationDto,
    );
    return response.data;
  }

  async removeReservation(id: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.delete(
      `/reservation/${id}`,
    );
    return response.data;
  }

  async businessProposedSchedule(id: string, date: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.patch(
      `/reservation/scheduleProposed/${id}`,
      { date: date },
    );
    return response.data;
  }

  async userResponseProposedSchedule(
    id: string,
    value: AcceptStatus,
  ): Promise<any> {
    const response: AxiosResponse<any> = await this.api.patch(
      `/reservation/responseSchedulePropose/${id}`,
      { value: value },
    );
    return response.data;
  }
}
