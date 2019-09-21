import { IManouver } from 'app/shared/model/manouver.model';
import { IContract } from 'app/shared/model/contract.model';
import { ICompany } from 'app/shared/model/company.model';
import { IServiceRequest } from 'app/shared/model/service-request.model';
import { ServiceType } from 'app/shared/model/enumerations/service-type.model';
import { ServiceUnitType } from 'app/shared/model/enumerations/service-unit-type.model';
import { StatusType } from 'app/shared/model/enumerations/status-type.model';

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
