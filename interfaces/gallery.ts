import { Point3D } from './spacial_data';
import { User } from './user';

export interface AspectRatio {
  w: number;
  h: number;
}

export interface Image {
  id: BigInt;

  by: User;

  name: string;
  alt: string;

  location?: Point3D;

  type: 'image/jpeg' | 'image/png';
  aspectRatio: AspectRatio;

  createdAt: Date;
  updatedAt: Date;
}