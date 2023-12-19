import axios, { AxiosResponse } from 'axios';
import { UpdateUserDto } from '../interfaces/user/user.interface';

//This users services is made for http request and nothing more...
export class UserService {
  private api: any;
  constructor(private baseUrl: string) {
    this.api = axios.create({
      baseURL: `${baseUrl}`, //http://localhost:3001
    });
  }

  public registerUser(user: any) {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('country', user.country);
    formData.append('department', user.department);

    return this.api.post('/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getUser(id: string) {
    const user = await this.api.get(`/user/${id}`);
    return user.data;
  }

  async searchByUsername(username: string): Promise<any> {
    const jwtToken = localStorage.getItem('token');
    const response: AxiosResponse<any> = await this.api.get(
      `/users/search/${username}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  // user.service.ts
  public async updateUser(
    userId: string,
    userData: UpdateUserDto,
  ): Promise<any> {
    const jwtToken = localStorage.getItem('token');
    const formData = new FormData();

    if (userData.name) formData.append('name', userData.name);
    if (userData.email) formData.append('email', userData.email);
    if (userData.phone) formData.append('phone', userData.phone);
    if (userData.country) formData.append('country', userData.country);
    if (userData.department) formData.append('department', userData.department);

    if (userData.userImage) {
      formData.append(
        'profileImage',
        userData.userImage,
        userData.userImage.name,
      );
    }

    const response = await this.api.patch(`/user/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  }

  public async updateFCMToken(userId: string, fcmToken: string): Promise<any> {
    const response = await this.api.patch(`/user/${userId}/fcmToken`, {
      fcmToken,
    });
    return response.data;
  }

  public async requestPasswordReset(email: string): Promise<any> {
    const response = await this.api.post('/user/request-password-reset', {
      email,
    });
    return response.data;
  }

  public async resetPassword(token: string, newPassword: string): Promise<any> {
    const response = await this.api.post('/user/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  }
}
