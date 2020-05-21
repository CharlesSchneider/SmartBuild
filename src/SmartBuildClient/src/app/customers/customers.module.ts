import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { ClrDatagridModule, ClrFormsModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  declarations: [CustomersListComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    SharedModule,
    ClrDatagridModule,
    ClrFormsModule
  ]
})
export class CustomersModule { }
