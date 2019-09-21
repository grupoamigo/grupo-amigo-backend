import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { IClient } from 'app/shared/model/client.model';
import { ILoad } from 'app/shared/model/load.model';
import { TransportType } from 'app/shared/model/enumerations/transport-type.model';
import { CurrencyType } from 'app/shared/model/enumerations/currency-type.model';

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
}

export const defaultValue: Readonly<IManouverRequest> = {};
