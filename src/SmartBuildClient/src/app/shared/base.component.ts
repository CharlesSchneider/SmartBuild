import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Messages } from './messages';
import { ContentService } from './content.service';
import { AppInjector } from './app-injector';
import { ApiService } from './api/api.service';
import { ModalService } from './modals/modal.service';
import { LoaderService } from './loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { FormsHelper } from './forms.helper';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'sb-base',
  template: ''
})
export class BaseComponent implements OnInit {

  //
  // https://devblogs.microsoft.com/premier-developer/angular-how-to-simplify-components-with-typescript-inheritance/
  //

  public Messages = Messages;
  public form: FormGroup;
  public isSaving: boolean;
  public isLoading: boolean;

  // Services
  protected contentService: ContentService;
  protected modalService: ModalService;
  protected apiService: ApiService;
  protected fb: FormBuilder;
  protected router: Router;
  protected route: ActivatedRoute;
  protected loaderService: LoaderService;
  protected toastrService: ToastrService;

  constructor() {
    const injector = AppInjector.getInjector();
    this.contentService = injector.get(ContentService);
    this.modalService = injector.get(ModalService);
    this.apiService = injector.get(ApiService);
    this.fb = injector.get(FormBuilder);
    this.router = injector.get(Router);
    this.loaderService = injector.get(LoaderService);
    this.loaderService.isLoading.subscribe(loading => this.isLoading = loading);
    this.toastrService = injector.get(ToastrService);
  }

  ngOnInit(): void {
  }

  protected get isNew(): boolean {
    return this.router.routerState.snapshot.url.indexOf('novo', 0) > -1;
  }

  protected get isEditing(): boolean {
    return this.router.routerState.snapshot.url.indexOf('editar', 0) > -1;
  }

  protected startLoading() {
    this.isLoading = true;
  }

  protected stopLoading() {
    this.isLoading = false;
  }

  protected startSaving() {
    this.clearFormValidations();
    this.contentService.lockMenus(true);
    this.disableAllFields();
    this.isSaving = true;
  }

  protected stopSaving() {
    this.contentService.lockMenus(false);
    this.enableAllFields();
    this.isSaving = false;
  }

  protected validateFormsFields() {
    FormsHelper.validateAllFormFields(this.form);
  }

  protected clearFormValidations() {
    FormsHelper.clearFormValidations(this.form);
  }

  protected enableAllFields() {
    FormsHelper.enableAllFields(this.form);
  }

  protected disableAllFields() {
    FormsHelper.disableAllFields(this.form);
  }

  public validationMessages(fieldName: string, errorName: string = 'serverValidation') {
    const field = this.form.get(fieldName);

    if (field) {
      const error = field.getError(errorName);
      if (error) {
        return error;
      }
    }
    return false;
  }

  public fieldHasError(fieldName: string, errorName: string = 'serverValidation') {
    const field = this.form.get(fieldName);

    if (field) {
      const error = field.getError(errorName);
      if (error) {
        return true;
      }
    }
    return false;
  }

  public fieldHasErrorCssClass(fieldName: string, errorName: string = 'serverValidation') {
    const field = this.form.get(fieldName);

    if (field) {
      const error = field.getError(errorName);
      if (error) {
        return 'is-invalid';
      }
    }
    return '';
  }

  public fieldMessageError(fieldName: string, errorName: string = 'serverValidation') {
    const field = this.form.get(fieldName);

    if (field) {
      const error = field.getError(errorName);
      if (error) {
        return error;
      }
    }
    return null;
  }

  protected handleError(errorResponse: HttpErrorResponse) {
    this.stopLoading();
    this.stopSaving();

    const injector = AppInjector.getInjector();
    const contentService = injector.get(ContentService);

    let errorMessage = 'Erro desconhecido.';

    if (errorResponse.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = errorResponse.error.message;
    } else {
      // Server-side errors
      if (errorResponse.status && errorResponse.status === 400) {
        errorMessage = 'Houve erros de Validação. Por favor, verifique.';
        this.setFieldsErrors(errorResponse);
      } else {
        errorMessage = `Server error: ${errorResponse.message}`;
        contentService.showErrorMessage(errorMessage);
      }
    }

    return throwError(errorMessage);
  }

  private setFieldsErrors(errorResponse: HttpErrorResponse) {
    const errors = errorResponse.error.errors;

    Object.keys(errors).forEach((key, index) => {
      // key: the name of the object key
      // index: the ordinal position of the key within the object

      let fieldName = '';

      // Converts uppercased strings to camelCase
      // i.e.: BirthDate        => birthDate
      //       RG               => rg
      //       Address.City     => address.city
      //       Address.ZipCode  => address.zipCode
      if (key.indexOf('.') > -1) {
        const fieldNameParts = key.split('.');
        for (const fieldNamePart of fieldNameParts) {
          fieldName += this.convertFirstLetterToLowerCase(fieldNamePart);
          fieldName += '.';
        }

        // Removes last '.'
        if (fieldName.endsWith('.')) {
          fieldName = fieldName.slice(0, -1);
        }
      } else {
        fieldName += this.convertFirstLetterToLowerCase(key);
      }

      // console.log(`fieldName ${key}`, fieldName);

      // Find specified field on form
      const field = this.form.get(fieldName);

      // If the field exists, set error on it
      if (field) {
        const messages = Object.values(errors[key]);
        if (Array.isArray(messages) && messages.length > 0) {
          field.setErrors({ serverValidation: messages });
        }
      }
    });
  }

  private convertFirstLetterToLowerCase(text: string): string {
    return this.hasLowerCase(text)
      ? text.charAt(0).toLowerCase() + text.slice(1) // converts first letter to lower case
      : text.toLowerCase(); // converts the whole string to lower case
  }

  private hasLowerCase(str) {
    return (/[a-z]/.test(str));
  }
}
