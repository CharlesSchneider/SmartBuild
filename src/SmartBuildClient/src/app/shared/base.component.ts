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

  public get isNew(): boolean {
    return this.router.routerState.snapshot.url.indexOf('novo', 0) > -1;
  }

  public get isEditing(): boolean {
    return this.router.routerState.snapshot.url.indexOf('editar', 0) > -1;
  }

  public startLoading() {
    this.isLoading = true;
  }

  public stopLoading() {
    this.isLoading = false;
  }

  public startSaving() {
    this.contentService.lockMenus(true);
    this.disableAllFields();
    this.isSaving = true;
  }

  public stopSaving() {
    this.contentService.lockMenus(false);
    this.enableAllFields();
    this.isSaving = false;
  }

  public validateFormsFields() {
    FormsHelper.validateAllFormFields(this.form);
  }

  public clearFormValidations() {
    FormsHelper.clearFormValidations(this.form);
  }

  public enableAllFields() {
    FormsHelper.enableAllFields(this.form);
  }

  public disableAllFields() {
    FormsHelper.disableAllFields(this.form);
  }

  public handleError(error: HttpErrorResponse) {
    this.stopLoading();
    this.stopSaving();

    const injector = AppInjector.getInjector();
    const contentService = injector.get(ContentService);

    console.log('Base Component HandleError', error);

    let errorMessage = 'Erro desconhecido.';

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = error.error.message;
    } else {
      // Server-side errors
      errorMessage = error.message;
    }

    contentService.showErrorMessage(errorMessage);
    return throwError(errorMessage);
  }
}
