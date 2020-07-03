import { Address } from "cluster";

export class Customer {
  customerId: number;
  name: string;
  birthDate?: Date;
  RG?: string;
  CPF?: string;
  Address: Address;
  homePhone?: string;
  workPhone?: string;
  referencePhone?: string;
  cellPhone?: string;
  email?: string;
  isDeleted: boolean;
}