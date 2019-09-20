import { Moment } from 'moment';
import { IContactCard } from 'app/shared/model/contact-card.model';
import { ILocation } from 'app/shared/model/location.model';
import { IManouverRequest } from 'app/shared/model/manouver-request.model';
import { IContract } from 'app/shared/model/contract.model';
import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { IServiceRequest } from 'app/shared/model/service-request.model';
import { ICompany } from 'app/shared/model/company.model';

export const enum ClientStatusType {
  ACTIVO = 'ACTIVO',
  SOLICITUD = 'SOLICITUD',
  APROBADO = 'APROBADO',
  VERIFICADO = 'VERIFICADO',
  DECLINADO = 'DECLINADO',
  CANCELADO = 'CANCELADO',
  PAUSADO = 'PAUSADO'
}

export interface IClient {
  id?: number;
  legalName?: string;
  memberSince?: Moment;
  status?: ClientStatusType;
  internalNotes?: string;
  contactCards?: IContactCard[];
  locations?: ILocation[];
  manouverRequests?: IManouverRequest[];
  contracts?: IContract[];
  serviceQuotes?: IServiceQuote[];
  serviceRequest?: IServiceRequest;
  hirer?: ICompany;
  manouverRequestClients?: IManouverRequest[];
}

export const defaultValue: Readonly<IClient> = {};
