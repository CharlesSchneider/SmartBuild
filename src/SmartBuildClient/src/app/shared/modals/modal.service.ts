import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ContentModalComponent } from './content-modal/content-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  public showConfirmationModal(
    title?: string,
    message?: string,
    tip?: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
    alert?: boolean): NgbModalRef {

    const modalRef = this.modalService.open(ConfirmationModalComponent);

    if (title) {
      modalRef.componentInstance.modalTitle = title;
    }

    if (message) {
      modalRef.componentInstance.modalMessage = message;
    }

    if (tip) {
      modalRef.componentInstance.tip = tip;
    }

    if (confirmButtonText) {
      modalRef.componentInstance.confirmButtonText = confirmButtonText;
    }

    if (cancelButtonText) {
      modalRef.componentInstance.cancelButtonText = cancelButtonText;
    }

    if (alert) {
      modalRef.componentInstance.alert = alert;
    }

    return modalRef;
  }

  public showContentModal(contentComponent: any) {
    const modalRef = this.modalService.open(contentComponent, {
      size: 'xl',
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    return modalRef;
  }
}
