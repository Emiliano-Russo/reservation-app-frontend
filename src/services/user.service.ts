import axios, { AxiosResponse } from 'axios';

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
    formData.append('phone', user.phone);
    formData.append('civilIdDoc', user.civilIdDoc);

    if (user.userImage) {
      formData.append('userImage', user.userImage, user.userImage.name);
    }

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
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/users/search/${username}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }
}
