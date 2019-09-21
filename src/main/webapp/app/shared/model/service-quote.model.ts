import { Moment } from 'moment';
import { IManouver } from 'app/shared/model/manouver.model';
import { IContract } from 'app/shared/model/contract.model';
import { IServiceRequest } from 'app/shared/model/service-request.model';
import { IClient } from 'app/shared/model/client.model';
import { ServiceUnitType } from 'app/shared/model/enumerations/service-unit-type.model';
import { StatusType } from 'app/shared/model/enumerations/status-type.model';
import { CurrencyType } from 'app/shared/model/enumerations/currency-type.model';

export interface IServiceQuote {
  id?: number;
  title?: string;
  description?: string;
  quantity?: number;
  price?: number;
  unit?: ServiceUnitType;
  expeditionDate?: Moment;
  expirationDate?: Moment;
  status?: StatusType;
  currency?: CurrencyType;
  approvedBy?: string;
  qrCodeContentType?: string;
  qrCode?: any;
  manouvers?: IManouver[];
  contract?: IContract;
  serviceRequest?: IServiceRequest;
  clients?: IClient[];
}

export const defaultValue: Readonly<IServiceQuote> = {};
