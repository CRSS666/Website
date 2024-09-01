import { User } from './user';

export interface Company {
  id: BigInt;

  owners: User[];

  name: string;
  slogan: string;

  logo: string;

  createdAt: Date;
  updatedAt: Date;
}