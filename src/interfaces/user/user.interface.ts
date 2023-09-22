export interface IUser {
  id: string;
  createdAt: Date;
  provider: string;
  googleId: string;
  name: string;
  email: string;
  phone: string;
  civilIdDoc: string;
  password: string;
  profileImage: string;
  emailVerified: boolean;
  lastLogin: Date;
}
