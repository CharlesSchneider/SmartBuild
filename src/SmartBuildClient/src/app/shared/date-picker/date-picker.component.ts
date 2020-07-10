import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'sb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class DatePickerComponent implements OnInit {
  @Input() label = '[label]';
  @Input() minDate = null; // eg. {year: 1920, month: 1, day: 1}
  @Input() controlName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
