import { User } from '../entities/User';

export interface IMlToken {
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  sellerId: number;
  user: User;
  createdAt: Date;
  updateAt: Date;
}

