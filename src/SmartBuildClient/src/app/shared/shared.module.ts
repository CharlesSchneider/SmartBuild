import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderComponent } from './page-header/page-header.component';
import { BaseComponent } from './base/base.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { ModalService } from './modals/modal.service';
import { CustomAdapter, CustomDateParserFormatter } from './date-picker/datepicker.formatter';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { GlobalMaskConfig } from './globalmask.config';

@NgModule({
  declarations: [
    PageHeaderComponent,
    BaseComponent,
    ConfirmationModalComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule.forRoot(GlobalMaskConfig)
  ],
  exports: [
    PageHeaderComponent,
    BaseComponent,
    DatePickerComponent
  ],
  providers: [
    ModalService,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class SharedModule { }
