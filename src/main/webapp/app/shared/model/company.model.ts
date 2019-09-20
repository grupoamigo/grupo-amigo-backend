import { IClient } from 'app/shared/model/client.model';
import { IContactCard } from 'app/shared/model/contact-card.model';
import { IService } from 'app/shared/model/service.model';
import { ILocation } from 'app/shared/model/location.model';
import { IManouver } from 'app/shared/model/manouver.model';
import { IContract } from 'app/shared/model/contract.model';
import { IMembership } from 'app/shared/model/membership.model';

export const enum CompanyType {
  NAVIERA = 'NAVIERA',
  TRANSPORTISTA = 'TRANSPORTISTA',
  PERSONA_MORAL = 'PERSONA_MORAL',
  PERSONA_FISICA = 'PERSONA_FISICA',
  CONTRATISTA = 'CONTRATISTA',
  AGENTE_ADUANAL = 'AGENTE_ADUANAL',
  GOBIERNO = 'GOBIERNO',
  CENTRO_DE_DISTRIBUCION = 'CENTRO_DE_DISTRIBUCION'
}

export interface ICompany {
  id?: number;
  legalName?: string;
  taxId?: string;
  type?: CompanyType;
  logoContentType?: string;
  logo?: any;
  client?: IClient;
  contactCards?: IContactCard[];
  services?: IService[];
  locations?: ILocation[];
  manouvers?: IManouver[];
  contracts?: IContract[];
  membership?: IMembership;
}

export const defaultValue: Readonly<ICompany> = {};
