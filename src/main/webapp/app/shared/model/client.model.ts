import { Moment } from 'moment';
import { IContactCard } from 'app/shared/model/contact-card.model';
import { ILocation } from 'app/shared/model/location.model';
import { IContract } from 'app/shared/model/contract.model';
import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { IServiceRequest } from 'app/shared/model/service-request.model';
import { ICompany } from 'app/shared/model/company.model';
import { IManouverRequest } from 'app/shared/model/manouver-request.model';
import { ClientStatusType } from 'app/shared/model/enumerations/client-status-type.model';

export interface IClient {
  id?: number;
  legalName?: string;
  memberSince?: Moment;
  status?: ClientStatusType;
  internalNotes?: string;
  contactCards?: IContactCard[];
  locations?: ILocation[];
  contracts?: IContract[];
  serviceQuotes?: IServiceQuote[];
  serviceRequest?: IServiceRequest;
  hirer?: ICompany;
  manouverRequestClients?: IManouverRequest[];
}

export const defaultValue: Readonly<IClient> = {};
