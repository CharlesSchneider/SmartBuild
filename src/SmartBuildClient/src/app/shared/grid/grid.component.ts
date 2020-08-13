import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() allowSelect = true;
  @Input() allowEdit = true;
  @Input() allowDelete = true;
  @Input() isLoading = false;
  @Output() rowSelected = new EventEmitter<any>();

  private _key: number | string;
  private _columns: Array<string>;
  private _headers: Array<string>;
  private _data: any;
  private _selectedRowData: any;
  private _editRoute: string;
  private _fetchDataUrl: string;

  collectionSize: number;
  pageSize = 10;
  page = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public get key() {
    return this._key;
  }

  public set key(value: number | string) {
    this._key = value;
  }

  public get columns() {
    return this._columns;
  }

  public set columns(value: Array<string>) {
    this._columns = value;
  }

  public get headers() {
    return this._headers;
  }

  public set headers(value: Array<string>) {
    this._headers = value;
  }

  public get editUrlRoute() {
    return this._editRoute;
  }

  public set editUrlRoute(route: string | string[]) {
    if (Array.isArray(route)) {
      this._editRoute = route.join('/');
    } else {
      this._editRoute = route;
    }
  }

  public set data(value: Array<any>) {
    if (this._columns) {
      if (value.length > 0) {
        this._data = value;
        this.collectionSize = value.length;
      }
    } else {
      console.error('sb-grid', 'No columns defined.');
    }
  }

  public get data() {
    return this._data;
  }

  public get selectedRow() {
    return this.allowSelect ? this._selectedRowData : null;
  }

  public set fetchDataUrl(url: string) {
    this._fetchDataUrl = url;
  }

  refresh() {
    if (this._fetchDataUrl) {



    } else {
      console.error('fetchDataUrl not set.');
    }
  }

  public getFieldValue(rowIndex: number, columnName: string): any {
    // this._objProps = Object.keys(value[0]);

    // Object.entries(this.data[rowIndex])[fieldIndex])
    // returns[key, value]. e.g. ["customerId", 17]

    const fields = Object.entries(this.data[rowIndex]);
    const field = fields.find(x => x[0] === columnName);
    if (field) {
      return field[1];
    }

    console.error('Field doesn"t exist.', columnName);
  }

  get cursor() {
    return this.allowSelect ? 'pointer' : 'default';
  }

  onRowSelected(row) {
    if (this.allowSelect) {
      this._selectedRowData = row;
      this.rowSelected.emit(row);
    }
  }

  redirectToEdit(dataItem) {
    const id = dataItem[this._key];
    const route = this._editRoute.replace('id', id);
    console.log('this._editRoute', route);
    this.router.navigate([route]);
  }
}
