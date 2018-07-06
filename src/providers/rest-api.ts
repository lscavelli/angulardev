import { HttpClient, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map } from 'rxjs/operators';
import { Task } from "../app/model/task.model"

@Injectable()
export class RestApiProvider {

  private baseUrl = 'http://app.test/api/tasks';

  constructor(public http: HttpClient) {
    console.log('Hello RestApiProvider Provider');
  }

  getByDate(dal:string,al:string=null): Observable<Task[]> {
    if (!al) al=dal;
    const params = new HttpParams().set('dal',dal).set('al',al);
    return this.http.get<Task[]>(this.baseUrl+'/bydate', { params: params} )
    .pipe(
      retry(3), // in caso di mancato accesso, riprova la richiesta per tre volte.
      catchError(this.handleError)
    );
  }

  getByDateMode2(dal:string,al:string=null): Observable<Task[]> {
      if (!al) al=dal;
      const params = new HttpParams().set('dal',dal).set('al',al);
      return this.http.get<Task[]>(this.baseUrl+'/bydate', { params: params} ).pipe(map((res: Response) => res['data']));
  }

  private handleError(mgs: HttpErrorResponse) {
    // Si è verificato un errore sul client o sulla rete.
    if (mgs.error instanceof ErrorEvent) {
      console.error('Si è verificato un errore:', mgs.error.message);
    } else {
    // Il backend ha restituito un codice errore.
      console.error(
        `Il Backend ha restituito il codice ${mgs.status}, ` +
        `relativo al seguente errore: ${mgs.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Si è verificato un errore; cortesemente riprovare più tardi.');
  };
}
