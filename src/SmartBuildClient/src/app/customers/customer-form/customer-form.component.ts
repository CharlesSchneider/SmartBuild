import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseComponent } from 'src/app/shared/base/base.component';
import { ModalService } from 'src/app/shared/modals/modal.service';

@Component({
  selector: 'sb-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent extends BaseComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: ModalService) {
    super();
  }

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

  // get birthDate() {
  //   return '';
  // }

  save() {
    console.log('form', this.form.value);
  }

  cancelAdding() {
    this.modalService
      .showConfirmationModal('Cancelar Inclusão', 'Deseja cancelar a inclusão deste cliente?', 'Os dados informados serão perdidos e você será direcionado para a listagem de clientes.', undefined, undefined, false)
      .result
      .then(result => {
        if (result) {
          this.router.navigate(['/clientes', 'listagem']);
        }
      });
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
}
