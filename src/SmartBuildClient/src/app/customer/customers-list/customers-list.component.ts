import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
  users = [];
  // users = [
  //   { id: 1, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 2, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 3, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 4, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 5, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 6, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 7, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 8, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 9, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 10, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 11, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 12, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 13, name: "Charles", creation: '16/06/1979', color: 'Azul' },
  //   { id: 14, name: "Charles", creation: '16/06/1979', color: 'Azul' }
  // ]
  constructor() {}

  ngOnInit(): void {}
}
