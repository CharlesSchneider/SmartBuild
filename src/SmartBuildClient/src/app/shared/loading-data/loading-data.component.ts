import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-loading-data',
  templateUrl: './loading-data.component.html',
  styleUrls: ['./loading-data.component.css']
})
export class LoadingDataComponent implements OnInit {
  @Input() hasData: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
