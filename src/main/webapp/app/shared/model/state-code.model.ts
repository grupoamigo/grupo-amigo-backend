import { ILocation } from 'app/shared/model/location.model';

export interface IStateCode {
  id?: number;
  code?: string;
  name?: string;
  location?: ILocation;
}

export const defaultValue: Readonly<IStateCode> = {};
