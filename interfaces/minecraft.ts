import { Point3D } from './spacial_data';

export enum MinecraftDimension {
  Overworld = 'minecraft:overworld',
  Nether    = 'minecraft:the_nether',
  End       = 'minecraft:the_end',
}

export interface MinecraftPosition extends Point3D {
  yaw: number;
  pitch: number;

  dimension: MinecraftDimension;
}

export interface MinecraftPlayer {
  uuid: string;
  username: string;

  position: MinecraftPosition;
}