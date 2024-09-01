import { Company } from './company';
import { Government } from './government';
import { Point2D } from './spacial_data';

export interface Nation {
  id: BigInt;
  code: string;

  name: string;
  government: Government;

  companies: Company[];

  borderPoints: Point2D[];
}