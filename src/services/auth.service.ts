import axios, { AxiosResponse } from 'axios';
import { removeUserAndToken } from '../redux/userSlice';

export class AuthService {
  private api: any;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`, //http://localhost:3001
    });
  }

  public async login(user: { username: string; password: string }) {
    const response: AxiosResponse<any> = await this.api.post(
      '/auth/local',
      user,
    );
    return response.data;
  }

  public async googleLogin(token: string) {
    const response: AxiosResponse<any> = await this.api.post('/auth/google', {
      token,
    });
    return response.data;
  }

  public async googleLoginCallback() {
    const response: AxiosResponse<any> = await this.api.get(
      '/auth/google/callback',
    );
    return response.data;
  }

  public async logout(nav: any, dispatch: any) {
    localStorage.removeItem('jwtToken');
    localStorage.setItem('lastUpdateTime', JSON.stringify(0));
    dispatch(removeUserAndToken());
    nav('/signin');
  }
}
