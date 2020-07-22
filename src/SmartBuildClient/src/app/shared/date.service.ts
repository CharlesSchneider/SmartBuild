import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/en-gb';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
    moment.locale('pt-br');
  }

  toString(date: any, format: string = 'YYYY-MM-DD'): string {
    return date !== null ? moment(date).format(format) : null;
  }
}
