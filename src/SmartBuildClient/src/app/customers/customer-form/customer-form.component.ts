import { Component, OnInit, OnDestroy } from '@angular/core';

import { BaseComponent } from 'src/app/shared/base.component';
import { ApiConstants } from 'src/app/shared/api/api.service';
import { Customer } from 'src/app/models/customer';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'sb-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor() { super(); }

  ngOnInit(): void {

    this.form = this.fb.group({
      customerId: [0],
      name: [null],
      birthDate: [null],
      rg: [null],
      cpf: [null],
      address: this.fb.group({
        addressId: [0],
        street: [null],
        number: [null],
        neighborhood: [null],
        city: [null],
        state: [null],
        zipCode: [null],
        reference: [null]
      }),
      homePhone: [null],
      workPhone: [null],
      referencePhone: [null],
      cellPhone: [null],
      email: [null],
      isDeleted: [false]
    });
  }

  getValidationClass() {
    return this.form.get('name').errors ? 'is-invalid' : '';
  }

  getFeedbackClass() {
    return this.form.get('name').errors ? 'invalid-feedback' : '';
  }

  save() {
    console.log('form', this.form);

    this.startSaving();

    this.apiService.post<Customer>(ApiConstants.customers, this.form.value)
      .subscribe(customer => {
        this.stopSaving();
        this.toastrService.info('Cliente salvo com sucesso!', 'Novo Cliente');
        this.router.navigate(['/clientes', customer.customerId, 'editar']);
      });

    // .subscribe(response => {
    //   // this.customer = response;


    // });

    // setTimeout(() => {
    //   this.stopSaving();
    //   ;
    // }, 3000);
  }

  cancelAdding() {
    if (this.form.dirty) {
      this.toastrService.clear();
      this.modalService
        .showConfirmationModal('Cancelar Inclusão', 'Deseja cancelar a inclusão deste cliente?', 'Os dados informados serão perdidos e você será direcionado para a listagem de clientes.', undefined, undefined, false)
        .result
        .then(result => {
          if (result) {
            this.navigateToListing();
          }
        });
    } else {
      this.navigateToListing();
    }
  }

  private navigateToListing() {
    this.router.navigate(['/clientes', 'listagem']);
  }

  get dateMask() {
    return '00/00/0000';
  }

  public get phoneMask() {
    return '(00)0000-00009';
  }

  public get cpfMask() {
    return '000.000.000-00';
  }

  ngOnDestroy(): void {
    this.contentService.lockMenus(false);
  }
}
