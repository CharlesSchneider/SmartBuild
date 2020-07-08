import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseComponent } from 'src/app/_shared/base/base.component';
import { ModalService } from 'src/app/_shared/modals/modal.service';

@Component({
  selector: 'app-customer-form',
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
      name: [null, Validators.maxLength(3)]
    });
  }

  cancelAdding() {
    this.modalService
      .showConfirmationModal("Cancelar Inclusão", "Deseja cancelar a inclusão deste cliente?", "Os dados informados serão perdidos e você será direcionado para a listagem de clientes.", undefined, undefined, false)
      .result
      .then(result => {
        if (result) {
          this.router.navigate(['/clientes', 'listagem']);
        }
      })
  }
}
