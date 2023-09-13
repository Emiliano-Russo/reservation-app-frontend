import axios, { AxiosResponse } from 'axios';
import { mock_reservation } from '../mocks/reservations';

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

  async getReservationsByUserId(userId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation/user/${userId}`,
    );
    return response.data;
  }

  async getReservationsByBusinessId(businessId: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(
      `/reservation?businessId=${businessId}`,
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

  // A continuación, los métodos mock (simulados) para pruebas:

  async mock_getReservations(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Aquí, utiliza tus datos mock para devolver una lista de reservaciones
        resolve(mock_reservation); // Asumiendo que tienes un mock_reservation
      }, 2000);
    });
  }

  // Y si quieres un método mock (simulado) para obtener reservaciones por userId:
  async mock_getReservationsByUserId(userId: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filtramos las reservaciones mock por userId
        const userReservations = mock_reservation.filter(
          (reservation: any) => reservation.userId === userId,
        );
        resolve(userReservations);
      }, 2000);
    });
  }

  async mock_getReservation(reservationId: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reservation = mock_reservation.find(
          (reservation: any) => reservation.id === reservationId,
        );
        resolve(reservation);
      }, 2000);
    });
  }

  async mock_createReservation(createReservationDto: any): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...createReservationDto,
          id: Math.random().toString(36).substring(7),
        });
      }, 2000);
    });
  }

  async mock_updateReservation(
    id: string,
    updateReservationDto: any,
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: id,
          ...updateReservationDto,
        });
      }, 2000);
    });
  }

  async mock_removeReservation(id: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: `Reservation with ID ${id} removed successfully.`,
        });
      }, 2000);
    });
  }
}
