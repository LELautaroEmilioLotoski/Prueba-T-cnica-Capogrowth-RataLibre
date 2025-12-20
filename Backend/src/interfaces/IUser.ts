import { MlToken } from '../entities/MlToken';

export interface IUser {
  id: string;
  name: string;
  email: string;
  mlTokens: MlToken[];
  createdAt: Date;
  updatedAt: Date;
  sellerId: number;
}

