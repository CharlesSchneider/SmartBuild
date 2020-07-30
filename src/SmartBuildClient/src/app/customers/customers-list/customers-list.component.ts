import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { ApiConstants } from '../../shared/api/api.service';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'sb-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent extends BaseComponent implements OnInit {
  customers: Customer[];

  constructor() { super(); }

  ngOnInit(): void {
    this.startLoading();
    this.apiService.get<Customer[]>(ApiConstants.customers)
      .subscribe(response => {
        this.customers = response;
        this.stopLoading();
      },
        this.handleError);
  }

  newClient() {
    this.router.navigate(['/clientes', 'novo']);
  }
}
