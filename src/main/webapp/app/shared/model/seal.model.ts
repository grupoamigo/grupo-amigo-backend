import { ILoad } from 'app/shared/model/load.model';

export interface ISeal {
  id?: number;
  issuer?: string;
  uniqueId?: string;
  loads?: ILoad[];
}

export const defaultValue: Readonly<ISeal> = {};
