import { ILocation } from 'app/shared/model/location.model';

export interface ICountryCode {
  id?: number;
  code?: string;
  name?: string;
  location?: ILocation;
}

export const defaultValue: Readonly<ICountryCode> = {};
