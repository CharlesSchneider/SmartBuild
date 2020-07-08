import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderComponent } from './page-header/page-header.component';
import { BaseComponent } from './base/base.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { ModalService } from './modals/modal.service';
import { CustomAdapter, CustomDateParserFormatter } from './datepicker.formatter';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PageHeaderComponent, BaseComponent, ConfirmationModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PageHeaderComponent,
    BaseComponent
  ],
  providers: [
    ModalService,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }]
})
export class SharedModule { }
