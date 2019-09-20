import { ISeal } from 'app/shared/model/seal.model';
import { IManouverRequest } from 'app/shared/model/manouver-request.model';

export const enum LoadType {
  CONTENEDOR = 'CONTENEDOR',
  GRANEL = 'GRANEL',
  PALLETS = 'PALLETS',
  TUBERIA = 'TUBERIA',
  CERVEZA = 'CERVEZA',
  LECHE = 'LECHE',
  POLIETILENO = 'POLIETILENO'
}

export interface ILoad {
  id?: number;
  type?: LoadType;
  uniqueId?: string;
  seals?: ISeal[];
  manouverRequests?: IManouverRequest[];
}

export const defaultValue: Readonly<ILoad> = {};
