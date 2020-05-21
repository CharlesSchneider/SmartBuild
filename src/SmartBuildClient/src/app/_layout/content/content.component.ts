import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  get collapsed(): boolean {
    const isMenuCollapsed = localStorage.getItem('isMenuCollapsed');
    return isMenuCollapsed === 'true';
  }

  set collapsed(value: boolean) {
    localStorage.setItem('isMenuCollapsed', value.toString());
    this.collapsed = value;
  }
}
