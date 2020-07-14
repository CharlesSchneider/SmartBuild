import { Address } from './address';

export class Customer {
  customerId: number;
  name: string;
  birthDate?: Date;
  rg?: string;
  cpf?: string;
  address: Address;
  homePhone?: string;
  workPhone?: string;
  referencePhone?: string;
  cellPhone?: string;
  email?: string;
  isDeleted: boolean;
};