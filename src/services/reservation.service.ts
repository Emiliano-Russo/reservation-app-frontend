import axios, { AxiosResponse } from 'axios';
import { mock_reservation } from '../mocks/reservations';
import { AcceptStatus } from '../interfaces/reservation.interface';

// Podrías tener un mock para Reservation similar a mock_businessType si lo necesitas.
// import { mock_reservation } from '../mocks/reservation';

export class ReservationService {
  private api: any;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`,
    });
  }

  async getReservations(): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get('/reservation');
    return response.data;
  }

  async getReservationsByUserId(
    userId: string,
    limit: string,
    lastKey: string | undefined,
  ): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?userId=${userId}&limit=${limit}&lastKey=${
        lastKey ? lastKey : ''
      }`,
    );
    return response.data;
  }

  async getReservationsByBusinessId(
    businessId: string,
    limit: string,
    lastKey: string | undefined,
  ): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?businessId=${businessId}&limit=${limit}&lastKey=${
        lastKey ? lastKey : ''
      }`,
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
    const response: AxiosResponse<any> = await this.api.post(
      '/reservation',
      createReservationDto,
    );
    return response.data;
  }

  async updateReservation(
    id: string,
    createdAt: number,
    updateReservationDto: any,
  ): Promise<any> {
    console.log('@@@updating reservation...');
    const response: AxiosResponse<any> = await this.api.patch(
      `/reservation/${id}/${createdAt}`,
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
