import { Moment } from 'moment';
import { ICompany } from 'app/shared/model/company.model';
import { IUser } from 'app/shared/model/user.model';
import { CurrencyType } from 'app/shared/model/enumerations/currency-type.model';
import { MembershipType } from 'app/shared/model/enumerations/membership-type.model';

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
