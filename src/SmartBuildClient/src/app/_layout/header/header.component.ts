import { Component, OnInit } from '@angular/core';
import { Messages } from 'src/app/shared/messages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appName = Messages.appName;
  customerName = Messages.customerName;

  constructor() { }

  ngOnInit(): void {
  }

}
