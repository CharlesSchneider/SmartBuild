import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PageHeaderComponent } from './page-header/page-header.component';
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
import { DateInterceptor } from './interceptors/date.interceptor';
import { LoadingDataComponent } from './loading-data/loading-data.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { ContentModalComponent } from './modals/content-modal/content-modal.component';
import { ControlValidationFeedbackComponent } from './control-validation-feedback/control-validation-feedback.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    ConfirmationModalComponent,
    DatePickerComponent,
    BaseComponent,
    LoaderComponent,
    LoadingDataComponent,
    ContentModalComponent,
    ControlValidationFeedbackComponent
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
    LoadingDataComponent,
    ContentModalComponent,
    ControlValidationFeedbackComponent
  ],
  providers: [
    ModalService,
    ContentService,
    LoaderService,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DateInterceptor, multi: true }
  ]
})
export class SharedModule { }
