import { IServiceQuote } from 'app/shared/model/service-quote.model';
import { ICompany } from 'app/shared/model/company.model';
import { IService } from 'app/shared/model/service.model';
import { ServiceUnitType } from 'app/shared/model/enumerations/service-unit-type.model';
import { DivisionType } from 'app/shared/model/enumerations/division-type.model';

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
