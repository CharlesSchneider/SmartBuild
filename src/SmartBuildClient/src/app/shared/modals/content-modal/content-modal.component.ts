import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-content-modal',
  templateUrl: './content-modal.component.html',
  styleUrls: ['./content-modal.component.css']
})
export class ContentModalComponent implements OnInit {
  @Input() modalTitle = '';
  @Input() modalMessage = '';
  @Input() tip = '';
  @Input() confirmButtonText = 'Confirmar';
  @Input() cancelButtonText = 'Cancelar';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
