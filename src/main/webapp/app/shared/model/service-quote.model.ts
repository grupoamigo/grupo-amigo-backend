import { Moment } from 'moment';
import { IManouver } from 'app/shared/model/manouver.model';
import { IContract } from 'app/shared/model/contract.model';
import { IServiceRequest } from 'app/shared/model/service-request.model';
import { IClient } from 'app/shared/model/client.model';

export const enum ServiceUnitType {
  TM = 'TM',
  KG = 'KG',
  CONTENEDOR_20TM = 'CONTENEDOR_20TM',
  CONTENEDOR_40TM = 'CONTENEDOR_40TM',
  M2 = 'M2',
  TARIMA = 'TARIMA',
  KM = 'KM'
}

export const enum StatusType {
  PROCESANDO = 'PROCESANDO',
  CONFIRMADO = 'CONFIRMADO',
  ACTIVO = 'ACTIVO',
  EN_ESPERA = 'EN_ESPERA',
  TERMINADO = 'TERMINADO',
  CANCELADO = 'CANCELADO'
}

export const enum CurrencyType {
  MXN = 'MXN',
  USD = 'USD'
}

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
