import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderComponent } from './page-header/page-header.component';
import { BaseComponent } from './base/base.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { ModalService } from './modals/modal.service';

@NgModule({
  declarations: [PageHeaderComponent, BaseComponent, ConfirmationModalComponent],
  imports: [
    CommonModule
  ],
  exports: [PageHeaderComponent, BaseComponent],
  providers: [ModalService]
})
export class SharedModule { }
