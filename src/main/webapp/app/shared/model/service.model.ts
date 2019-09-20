import { IManouver } from 'app/shared/model/manouver.model';
import { IContract } from 'app/shared/model/contract.model';
import { ICompany } from 'app/shared/model/company.model';
import { IServiceRequest } from 'app/shared/model/service-request.model';

export const enum ServiceType {
  CARGA = 'CARGA',
  DESCARGA = 'DESCARGA',
  TRANSPORTE = 'TRANSPORTE',
  IMPORTACION = 'IMPORTACION',
  EXPORTACION = 'EXPORTACION',
  ALMACENAJE = 'ALMACENAJE',
  INSPECCION = 'INSPECCION',
  REPARACION = 'REPARACION',
  CROSS_DOCK = 'CROSS_DOCK'
}

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

export interface IService {
  id?: number;
  title?: string;
  description?: string;
  type?: ServiceType;
  unit?: ServiceUnitType;
  status?: StatusType;
  manouvers?: IManouver[];
  contracts?: IContract[];
  companies?: ICompany[];
  serviceRequests?: IServiceRequest[];
}

export const defaultValue: Readonly<IService> = {};
