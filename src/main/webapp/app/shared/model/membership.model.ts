import { Moment } from 'moment';
import { ICompany } from 'app/shared/model/company.model';
import { IUser } from 'app/shared/model/user.model';

export const enum CurrencyType {
  MXN = 'MXN',
  USD = 'USD'
}

export const enum MembershipType {
  CEO = 'CEO',
  VP = 'VP',
  JEFE_DE_DIVISION = 'JEFE_DE_DIVISION',
  SUPERVISOR = 'SUPERVISOR',
  INSPECTOR = 'INSPECTOR',
  VIGILANTE = 'VIGILANTE',
  CHOFER = 'CHOFER',
  ADMINISTRATIVO = 'ADMINISTRATIVO'
}

export interface IMembership {
  id?: number;
  title?: string;
  price?: number;
  currency?: CurrencyType;
  created?: Moment;
  expires?: Moment;
  type?: MembershipType;
  company?: ICompany;
  user?: IUser;
}

export const defaultValue: Readonly<IMembership> = {};
