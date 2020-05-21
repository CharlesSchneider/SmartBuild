import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  users = [
    { id: 1, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 2, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 3, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 4, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 5, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 6, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 7, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 8, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 9, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 10, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 11, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' },
    { id: 12, name: 'Charles Schneider Pereira', creation: '16/06/1979', color: 'blue' }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
