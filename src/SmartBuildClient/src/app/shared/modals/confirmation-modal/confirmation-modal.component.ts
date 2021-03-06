import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() modalTitle = '';
  @Input() modalMessage = '';
  @Input() tip = '';
  @Input() confirmButtonText = 'Confirmar';
  @Input() cancelButtonText = 'Cancelar';
  @Input() alert = false;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
}
