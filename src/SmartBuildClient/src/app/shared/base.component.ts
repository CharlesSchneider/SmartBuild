import { Component, OnInit, inject } from '@angular/core';
import { Messages } from './messages';
import { ContentService } from './content.service';
import { AppInjector } from './app-injector';
import { ModalService } from './modals/modal.service';
import { ApiService } from './api/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from './loader/loader.service';
import { ToastrService, Toast } from 'ngx-toastr';

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
  public isEditing: boolean;
  public isNew: boolean;
  public isSaving: boolean;
  public isLoading: boolean;

  // Services
  protected contentService: ContentService;
  protected modalService: ModalService;
  protected apiService: ApiService;
  protected fb: FormBuilder;
  protected router: Router;
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

}
