import { Address } from './address';

export class Customer {
  constructor(public customerId?: number,
    public name?: string,
    public birthDate?: string,
    public rg?: string,
    public cpf?: string,
    public address?: Address,
    public homePhone?: string,
    public workPhone?: string,
    public referencePhone?: string,
    public cellPhone?: string,
    public email?: string,
    public isDeleted?: boolean) {
  }
}
