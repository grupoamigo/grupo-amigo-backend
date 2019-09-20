import { IClient } from 'app/shared/model/client.model';
import { ICompany } from 'app/shared/model/company.model';

export const enum ContactType {
  TELEFONO = 'TELEFONO',
  EMAIL = 'EMAIL',
  WEBSITE = 'WEBSITE',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN',
  WHATSAPP = 'WHATSAPP'
}

export interface IContactCard {
  id?: number;
  type?: ContactType;
  value?: string;
  clients?: IClient[];
  companies?: ICompany[];
}

export const defaultValue: Readonly<IContactCard> = {};
