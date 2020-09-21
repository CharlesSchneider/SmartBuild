import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFormModalComponent } from './customer-form-modal/customer-form-modal.component';

@NgModule({
  declarations: [CustomersListComponent, CustomerFormComponent, CustomerFormModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    SharedModule,
    NgbModule,
    NgxMaskModule
  ]
})
export class CustomersModule { }
