import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from 'src/app/shared/base.component';
import { ApiConstants } from 'src/app/shared/api/api.service';

@Component({
  selector: 'sb-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor() { super(); }

  ngOnInit(): void {

    this.form = this.fb.group({
      customerId: [null],
      name: [null],
      birthDate: [null],
      rg: [null],
      cpf: [null],
      address: this.fb.group({
        addressId: [null],
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
      isDeleted: [null]
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

    // this.contentService.lockMenus();
    // this.contentService.showErrorMessage('houve um erro.');

    this.toastrService.info('Cliente salvo com sucesso!', 'Novo Cliente');
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
