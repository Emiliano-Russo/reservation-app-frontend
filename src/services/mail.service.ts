import axios, { AxiosResponse } from 'axios';

export class MailService {
  private api: any;

  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}/mail`, // Añadimos el prefijo '/mail' ya que tu controlador tiene ese prefijo
    });
  }

  async sendConfirmationEmail(email: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post(
      '/send-confirmation',
      { email },
    );
    return response.data;
  }

  async confirmEmail(token: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(
      `/confirm-email?token=${token}`,
    );
    return response.data;
  }
}
