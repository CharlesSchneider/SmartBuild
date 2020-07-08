import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseComponent } from 'src/app/_shared/base/base.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  open() {
    this.modalService.showConfirmationModal("Cancelar Inclusão", "Este é um teste para ver o quanto uma mensagem pode ser exibida dentro de uma modal com um texto bem grande mesmo!. Bá! Só queero ver!", undefined, undefined, false);
  }
}
