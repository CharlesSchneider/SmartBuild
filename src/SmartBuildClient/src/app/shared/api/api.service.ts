import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ContentService } from '../content.service';
import { AppInjector } from '../app-injector';

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
  private readonly RETRIES = 3;

  constructor(private http: HttpClient) { }

  public get<T>(url: string) {
    const requestUrl = `${this.API_URL}/${url}`;
    return this.http.get<T>(requestUrl)
      .pipe(
        retry(this.RETRIES),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    const injector = AppInjector.getInjector();
    const contentService = injector.get(ContentService);

    console.log('handleError', error);

    let errorMessage = 'Erro desconhecido.';

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = error.error.message;
    } else {
      // Server-side errors
      errorMessage = error.message;
    }

    contentService.showErrorMessage(errorMessage);

    return throwError(errorMessage);
  }
}
