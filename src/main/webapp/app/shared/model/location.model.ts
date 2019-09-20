import { ICountryCode } from 'app/shared/model/country-code.model';
import { IStateCode } from 'app/shared/model/state-code.model';
import { IManouverRequest } from 'app/shared/model/manouver-request.model';
import { IClient } from 'app/shared/model/client.model';
import { ICompany } from 'app/shared/model/company.model';

export interface ILocation {
  id?: number;
  address?: string;
  lat?: string;
  lng?: string;
  countryCode?: ICountryCode;
  stateCode?: IStateCode;
  manouverRequestOrigin?: IManouverRequest;
  manouverRequestDestiny?: IManouverRequest;
  clients?: IClient[];
  companies?: ICompany[];
}

export const defaultValue: Readonly<ILocation> = {};
