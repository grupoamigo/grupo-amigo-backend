import { Moment } from 'moment';
import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { IService } from 'app/shared/model/service.model';
import { ICompany } from 'app/shared/model/company.model';
import { IClient } from 'app/shared/model/client.model';

export const enum ContractType {
  PRESTACION_DE_SERVICIO = 'PRESTACION_DE_SERVICIO',
  TERMINOS_Y_CONDICIONES = 'TERMINOS_Y_CONDICIONES',
  DECISION_INTERNA = 'DECISION_INTERNA',
  SOLICITUD_DE_SERVICIO = 'SOLICITUD_DE_SERVICIO',
  SOLICITU_DE_MANIOBRA = 'SOLICITU_DE_MANIOBRA',
  INSPECCION = 'INSPECCION',
  EMPLEADO = 'EMPLEADO',
  CONFIDENCIALIDAD = 'CONFIDENCIALIDAD'
}

export const enum ContractStatusType {
  EMITIDO = 'EMITIDO',
  FIRMADO = 'FIRMADO',
  ACTIVO = 'ACTIVO',
  CANCELADO = 'CANCELADO',
  PAUSADO = 'PAUSADO',
  TERMINADO = 'TERMINADO'
}

export interface IContract {
  id?: number;
  type?: ContractType;
  title?: string;
  legalProse?: string;
  signatureContentType?: string;
  signature?: any;
  contractFileContentType?: string;
  contractFile?: any;
  digitalFingerprint?: string;
  dateSigned?: Moment;
  expirationDate?: Moment;
  status?: ContractStatusType;
  serviceQuote?: IServiceQuote;
  services?: IService[];
  suppliers?: ICompany[];
  clients?: IClient[];
}

export const defaultValue: Readonly<IContract> = {};
