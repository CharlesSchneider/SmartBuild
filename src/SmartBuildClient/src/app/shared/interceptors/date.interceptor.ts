import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { DateService } from '../date.service';

//
// Interceptor that converts pt-br date format to 'YYYY-MM-DD', as api expected.
// The date field must have 'date' in its name.
// https://stackoverflow.com/questions/50242282/automatically-convert-date-string-format-for-post-api
//
@Injectable({
  providedIn: 'root'
})
export class DateInterceptor implements HttpInterceptor {

  constructor(private _dateService: DateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let body;


    if (req.responseType !== 'json' || !req.body ||
      (req.method !== 'POST' && req.method !== 'PUT')) {
      return next.handle(req);
    }

    if (_.isArray(req.body)) {
      body = Object.assign([], req.body);
    } else {
      body = Object.assign({}, req.body);
    }

    this.changeRequest(body);
    const reqClone = req.clone({ body });
    return next.handle(reqClone);
  }

  private changeRequest(body) {
    if (body && typeof body === 'object') {
      Object.entries(body).forEach(
        ([key, value]) => {
          if (key.toLowerCase().indexOf('date') > -1) {
            body[key] = this._dateService.toString(value);
          }
        }
      );
    }
  }
}
