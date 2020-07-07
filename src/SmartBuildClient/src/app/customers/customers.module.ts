import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ClrDatagridModule, ClrFormsModule, ClrIconModule, ClrCommonFormsModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  declarations: [CustomersListComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    SharedModule,
    ClrDatagridModule,
    ClrFormsModule,
    ClrIconModule,
    ClrCommonFormsModule
  ]
})
export class CustomersModule { }
