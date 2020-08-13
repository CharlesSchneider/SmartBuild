import { Component, OnInit, OnDestroy } from '@angular/core';

import { BaseComponent } from 'src/app/shared/base.component';
import { ApiConstants } from 'src/app/shared/api/api.service';
import { Customer } from 'src/app/models/customer';
import { Address } from 'src/app/models/address';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) { super(); }
  pageTitle = '';
  keepAdding = false;

  ngOnInit(): void {

    this.form = this.fb.group({
      customerId: [0],
      name: [null],
      birthDate: [null],
      rg: [null],
      cpf: [null],
      address: this.fb.group({
        addressId: [0],
        street: [null],
        number: [null],
        neighborhood: [null],
        city: [null],
        state: [null],
        zipCode: [null],
        reference: [null]
      }),
      homePhone: [null],
      workPhone: [null],
      referencePhone: [null],
      cellPhone: [null],
      email: [null],
      isDeleted: [false]
    });

    this.pageTitle = 'Novo Cliente';

    if (this.isEditing) {
      this.startLoading();
      this.disableAllFields();

      this.pageTitle = 'Editar Cliente';

      this.route.params.subscribe(params => {
        const id = params.id;
        if (id) {
          this.apiService.get<Customer>(`${ApiConstants.customers}/${id}`)
            .subscribe(
              customer => {
                if (!customer.address) {
                  customer.address = new Address();
                }

                this.form.patchValue(customer);
                this.enableAllFields();
                this.stopLoading();
              },
              error => {
                this.enableAllFields();
                this.handleError(error);
              });
        }
      });
    }
  }

  get customerId() {
    return this.form.get('customerId').value;
  }

  set customerId(value) {
    this.form.get('customerId').patchValue(value);
  }

  getValidationClass() {
    return this.form.get('name').errors ? 'is-invalid' : '';
  }

  getFeedbackClass() {
    return this.form.get('name').errors ? 'invalid-feedback' : '';
  }

  save() {
    if (this.form.valid) {
      this.startSaving();

      let saveCustomer: Observable<Customer>;

      if (this.form.get('birthDate').value === '') {
        this.form.get('birthDate').setValue(null);
      }

      if (this.isNew) {
        saveCustomer = this.apiService.post<Customer>(ApiConstants.customers, this.form.value);
      } else {
        saveCustomer = this.apiService.put<Customer>(ApiConstants.customers, this.customerId, this.form.value);
      }

      saveCustomer.subscribe(
        customer => {
          this.toastrService.info(this.Messages.customerSavedSuccesfully, this.Messages.saveCustomer);
          this.form.markAsPristine();
          this.stopSaving();

          if (this.keepAdding) {
            this.form.reset();
            this.form.get('customerId').setValue(0);
            this.form.get('address.addressId').setValue(0);
            this.form.get('isDeleted').setValue(false);
            this.router.navigate(['/clientes', 'novo']);
          } else {
            if (this.isNew) {
              this.router.navigate(['/clientes', customer.customerId, 'editar']);
            }
          }
        },
        error => {
          this.handleError(error);
        });
    }
  }

  cancelAdding() {
    if (this.form.dirty) {
      this.toastrService.clear();
      this.modalService
        .showConfirmationModal(this.Messages.cancelAdding, this.Messages.cancelAddingCustomer, this.Messages.cancelAddingCustomerTip,
          undefined, undefined, false)
        .result
        .then(result => {
          if (result) {
            this.navigateToListing();
          }
        });
    } else {
      this.navigateToListing();
    }
  }

  private navigateToListing() {
    this.router.navigate(['/clientes', 'listagem']);
  }

  get dateMask() {
    return '00/00/0000';
  }

  public get phoneMask() {
    return '(00)0000-00009';
  }

  public get cpfMask() {
    return '000.000.000-00';
  }

  get nameValidationResult() {
    return this.validationMessages('name');
  }

  ngOnDestroy(): void {
    // this.contentService.lockMenus(false);
  }
}
