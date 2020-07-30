import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, take } from 'rxjs/operators';

export const ApiConstants = {
  customers: 'customers'
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //
  // Reference
  // https://www.techiediaries.com/angular/angular-9-8-tutorial-by-example-rest-crud-apis-http-get-requests-with-httpclient/
  //

  private readonly API_URL = environment.apiUrl;
  private readonly RETRIES = 0;

  constructor(private http: HttpClient) { }

  public get<T>(url: string) {
    const requestUrl = `${this.API_URL}/${url}`;
    return this.http.get<T>(requestUrl)
      .pipe(
        retry(this.RETRIES),
        take(1)
      );
  }

  public post<T>(url, data: T) {
    const requestUrl = `${this.API_URL}/${url}`;
    return this.http.post<T>(requestUrl, data)
      .pipe(
        retry(this.RETRIES),
        take(1)
      );
  }

  public put<T>(url, id: number, data: T) {
    const requestUrl = `${this.API_URL}/${url}/${id}`;
    return this.http.put<T>(requestUrl, data)
      .pipe(
        retry(this.RETRIES),
        take(1)
      );
  }
}
