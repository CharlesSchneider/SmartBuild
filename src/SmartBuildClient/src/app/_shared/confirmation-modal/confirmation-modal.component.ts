import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ClrModal } from '@clr/angular';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @ViewChild(ClrModal) modal: ClrModal;
  @Input() title = "Title";
  @Input() message = "Message";
  @Input() confirmButtonText = "OK";
  @Input() cancelButtonText = "Cancelar";
  @Output() confirm = new EventEmitter<boolean>();;

  private _isOpen: boolean;

  constructor() { }

  ngOnInit(): void { }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(value: boolean) {
    this._isOpen = value;
  }

  show() {
    this.modal.open();
  }

  onConfirm(confirm: boolean) {
    this.confirm.emit(confirm);
    this.modal.close();
  }
}
