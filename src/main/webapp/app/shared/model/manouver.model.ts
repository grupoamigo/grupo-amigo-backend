import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { ICompany } from 'app/shared/model/company.model';
import { IService } from 'app/shared/model/service.model';

export const enum ServiceUnitType {
  TM = 'TM',
  KG = 'KG',
  CONTENEDOR_20TM = 'CONTENEDOR_20TM',
  CONTENEDOR_40TM = 'CONTENEDOR_40TM',
  M2 = 'M2',
  TARIMA = 'TARIMA',
  KM = 'KM'
}

export const enum DivisionType {
  INTERMODAL = 'INTERMODAL',
  FERTILIZANTES = 'FERTILIZANTES',
  POLIETILENO = 'POLIETILENO',
  TUBERIA = 'TUBERIA',
  LACTEOS = 'LACTEOS',
  CERVEZA = 'CERVEZA',
  SAGARPA = 'SAGARPA'
}

export interface IManouver {
  id?: number;
  title?: string;
  description?: string;
  unit?: ServiceUnitType;
  division?: DivisionType;
  serviceQuotes?: IServiceQuote[];
  companies?: ICompany[];
  services?: IService[];
}

export const defaultValue: Readonly<IManouver> = {};
