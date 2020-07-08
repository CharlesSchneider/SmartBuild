import { Component, OnInit } from '@angular/core';
import { Messages } from '../messages';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  public Messages = Messages;
  constructor() { }

  ngOnInit(): void {
  }

}
