import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'listagem' },
  {
    path: 'listagem',
    children: [
      { path: '', component: CustomersListComponent, pathMatch: 'full' },
      { path: 'editar', component: CustomerFormComponent, pathMatch: 'full' },
    ],
  },
  { path: 'novo', component: CustomerFormComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
