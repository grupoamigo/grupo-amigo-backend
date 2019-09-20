import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { IClient } from 'app/shared/model/client.model';
import { ILoad } from 'app/shared/model/load.model';

export const enum TransportType {
  CAMION = 'CAMION',
  FFCC = 'FFCC'
}

export const enum CurrencyType {
  MXN = 'MXN',
  USD = 'USD'
}

export interface IManouverRequest {
  id?: number;
  title?: string;
  description?: string;
  date?: Moment;
  transport?: TransportType;
  price?: number;
  currency?: CurrencyType;
  qrCodeContentType?: string;
  qrCode?: any;
  origin?: ILocation;
  destiny?: ILocation;
  manouverClient?: IClient;
  loads?: ILoad[];
  clients?: IClient[];
}

export const defaultValue: Readonly<IManouverRequest> = {};
