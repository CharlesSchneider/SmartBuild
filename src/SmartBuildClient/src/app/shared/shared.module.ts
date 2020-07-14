import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PageHeaderComponent } from './page-header/page-header.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { ModalService } from './modals/modal.service';
import { CustomAdapter, CustomDateParserFormatter } from './date-picker/datepicker.formatter';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { GlobalMaskConfig } from './globalmask.config';
import { BaseComponent } from './base.component';
import { ContentService } from './content.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoadingDataComponent } from './loading-data/loading-data.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    ConfirmationModalComponent,
    DatePickerComponent,
    BaseComponent,
    LoaderComponent,
    LoadingDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxMaskModule.forRoot(GlobalMaskConfig)
  ],
  exports: [
    PageHeaderComponent,
    DatePickerComponent,
    LoaderComponent,
    LoadingDataComponent
  ],
  providers: [
    ModalService,
    ContentService,
    LoaderService,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ]
})
export class SharedModule { }
