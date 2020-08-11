import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Customer } from '../../models/customer';
import { ApiConstants } from '../../shared/api/api.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { GridComponent } from 'src/app/shared/grid/grid.component';
import { UrlResolver } from '@angular/compiler';

@Component({
  selector: 'sb-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent extends BaseComponent implements OnInit {
  customers: Customer[];
  @Input() selectRecord = true;
  @ViewChild(GridComponent) grid: GridComponent;

  constructor() { super(); }

  ngOnInit(): void {

    this.startLoading();
    this.apiService.get<Customer[]>(ApiConstants.customers)
      .subscribe(response => {
        this.customers = response;
        this.grid.allowSelect = true;
        this.grid.key = 'customerId';
        // this.grid.editUrlRoute = ['/clientes', 'id', 'editar'];
        this.grid.editUrlRoute = '/clientes/id/editar';
        this.grid.headers = ['ID', 'Nome', 'Nascimento', 'E-mail'];
        this.grid.columns = ['customerId', 'name', 'birthDate', 'email'];
        this.grid.data = response;
        this.stopLoading();
      },
        this.handleError);
  }

  customerSelected(customer) {
    console.log('Customer Selected', customer);
  }

  newClient() {
    this.router.navigate(['/clientes', 'novo']);
  }
}
