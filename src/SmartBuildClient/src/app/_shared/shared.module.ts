import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ClarityModule, ClrModalModule } from '@clr/angular';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [PageHeaderComponent, ConfirmationModalComponent, BaseComponent],
  imports: [
    CommonModule,
    ClarityModule,
    ClrModalModule
  ],
  exports: [PageHeaderComponent, ConfirmationModalComponent, BaseComponent]
})
export class SharedModule { }
