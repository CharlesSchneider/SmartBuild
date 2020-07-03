import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmationModalComponent } from 'src/app/_shared/confirmation-modal/confirmation-modal.component';
import { BaseComponent } from 'src/app/_shared/base/base.component';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent extends BaseComponent implements OnInit {

  @ViewChild(ConfirmationModalComponent) confirmationModal: ConfirmationModalComponent;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.maxLength(3)]
    });
  }

  cancelAddingCustomer() {
    this.confirmationModal.title = "Cancelar Inclusão";
    this.confirmationModal.message = "A inclusão deste Cliente será cancelada. Confirmar?";
    this.confirmationModal.confirmButtonText = this.Messages.confirm;
    this.confirmationModal.confirm.subscribe((x) => this.cancelAddingCustomerConfirmed(x));
    this.confirmationModal.show();
  }

  cancelAddingCustomerConfirmed($event) {
    if ($event) {
      this.router.navigate(['/clientes', 'listagem']);
    }
  }
}
