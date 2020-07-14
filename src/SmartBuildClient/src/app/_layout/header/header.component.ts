import { Component, OnInit, Input } from '@angular/core';
import { Messages } from 'src/app/shared/messages';

@Component({
  selector: 'sb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() lockMenus = false;
  appName = Messages.appName;
  customerName = Messages.customerName;


  constructor() { }

  ngOnInit(): void {
  }

  get disabledMenus() {
    return this.lockMenus ? 'disabled' : '';
  }
}
