import { Moment } from 'moment';
import { IClient } from 'app/shared/model/client.model';
import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { IService } from 'app/shared/model/service.model';

export const enum StatusType {
  PROCESANDO = 'PROCESANDO',
  CONFIRMADO = 'CONFIRMADO',
  ACTIVO = 'ACTIVO',
  EN_ESPERA = 'EN_ESPERA',
  TERMINADO = 'TERMINADO',
  CANCELADO = 'CANCELADO'
}

export interface IServiceRequest {
  id?: number;
  title?: string;
  description?: string;
  dateRequested?: Moment;
  dateBegin?: Moment;
  dateEnd?: Moment;
  status?: StatusType;
  client?: IClient;
  serviceQuote?: IServiceQuote;
  services?: IService[];
}

export const defaultValue: Readonly<IServiceRequest> = {};
