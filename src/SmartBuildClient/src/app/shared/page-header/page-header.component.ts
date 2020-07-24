import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sb-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle = 'Page Title';

  constructor() { }

  ngOnInit(): void {
  }
}
