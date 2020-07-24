import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-control-validation-feedback',
  templateUrl: './control-validation-feedback.component.html',
  styleUrls: ['./control-validation-feedback.component.css']
})
export class ControlValidationFeedbackComponent implements OnInit {
  @Input() validationErrorMessages: any;

  constructor() { }

  ngOnInit(): void {
  }

  get hasValidationErrorMessages() {
    return this.validationErrorMessages && this.validationErrorMessages.length > 0;
  }

  get errorMessages() {
    if (Array.isArray(this.validationErrorMessages)) {
      return this.validationErrorMessages as Array<string>;
    }
    return [this.validationErrorMessages];
  }

}
