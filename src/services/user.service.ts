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

  async fetchBasicProfileInfo(userId: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async removeFollower(followerId: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.post(
      `/users/removeFollower/${followerId}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async unfollowUser(followedId: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.post(
      `/users/unfollow/${followedId}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response;
  }

  async requestToFollow(userIdToFollow: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.post(
      `/users/request-follow/${userIdToFollow}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async acceptFollowRequest(userIdToAccept: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.post(
      `/users/accept-follow-request/${userIdToAccept}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async rejectFollowRequest(userIdToReject: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.post(
      `/users/reject-follow-request/${userIdToReject}`,
      {},
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async getFollowRequests(userId: string): Promise<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    const response: AxiosResponse<any> = await this.api.get(
      `/users/follow-requests?userId=${userId}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      },
    );
    return response.data;
  }

  async editUser(userParam: any, userImage?: File | null) {
    const formData = new FormData();
    formData.append('name', userParam.name);
    formData.append('username', userParam.username);
    formData.append('bio', userParam.bio);
    formData.append('private', userParam.private.toString());

    if (userImage) {
      formData.append('userImage', userImage, userImage.name);
    }

    return this.api.put(`/users/${userParam.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    });
  }

  async getUser(id: string) {
    return this.api.get(`/users/${id}`);
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
