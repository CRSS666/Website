import { Point2D } from './spacial_data';
import { User } from './user';

export enum GovernmentLevel {
  Highest,
  High,
  Regular,
  Low,
  Lowest
}

export interface GovernmentRole {
  id: BigInt;

  level: GovernmentLevel;

  name: string;
}

export interface GovernmentUser extends User {
  role: GovernmentRole;
  ordering: number;
}

export interface Government {
  id: BigInt;

  parliament: GovernmentUser[];
  parliamentBulding: Point2D;
}