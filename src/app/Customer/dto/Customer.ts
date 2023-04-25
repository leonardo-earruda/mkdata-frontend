import {PersonTypeEnum} from "./PersonTypeEnum";
import {Telephone} from "./Telephone";

export interface Customer {
  id?: string;
  name: string;
  personType: PersonTypeEnum;
  documentNumber: string;
  telephoneNumbers: Telephone[];
  isActive?: boolean;
}
