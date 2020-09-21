import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'sb-customer-form-modal',
  template: ''
})
export class CustomerFormModalComponent extends BaseComponent {
  currentDialog = null;

  constructor() {
    super();

    this.currentDialog = this.modalService.showContentModal(CustomerFormComponent);


    this.currentDialog.result.then(result => {
      this.router.navigateByUrl('/');
    }, reason => {
      this.router.navigateByUrl('/');
    });

  }
}
