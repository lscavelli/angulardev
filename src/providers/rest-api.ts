import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map } from 'rxjs/operators';
import { Task } from "../app/model/task.model"

@Injectable()
export class RestApiProvider {

  private baseUrl = '/admin/api/tasks';

  constructor(public http: HttpClient) {
    console.log('Hello RestApiProvider Provider');
  }


  public getAllTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.baseUrl)
      .pipe(
        map((res: Task[]) => res['data']),
        catchError(this.handleError)
      )
  }

  public getById(id:number): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Task>(url)
      .pipe(
        map((res: Task) => res['data']),
        catchError(this.handleError)
      );
  }

  /*
  public getById(id: number) : Observable<Task> {
    return this.http.get<Task[]>(this.baseUrl)
        .pipe(
            map(tasks => {
                let task = tasks.filter((ta: Task) => ta.id === id);
                return (task && task.length) ? task[0] : null;
            }),
            catchError(this.handleError)
        )
  }*/

  getByDate(dal:string,al:string=null): Observable<Task[]> {
    if (!al) al=dal;
    const params = new HttpParams().set('dal',dal).set('al',al);
    return this.http.get<Task[]>(this.baseUrl+'/bydate', { params: params} )
      .pipe(
        retry(3), // in caso di mancato accesso, riprova la richiesta per tre volte.
        catchError(this.handleError)
      );
  }

  public getByDateMode2(dal:string,al:string=null): Observable<Task[]> {
    if (!al) al=dal;
    const params = new HttpParams().set('dal',dal).set('al',al);
    return this.http.get<Task[]>(this.baseUrl+'/bydate', { params: params} )
      .pipe(
        map((res: Task[]) => res['data']),
        catchError(this.handleError)
      );
  }

  public update(task: Task): Observable<Task> {
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type':  'application/json'})
    };
    return this.http.put<Task>(this.baseUrl, task, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public changeState(id:number,status:number): Observable<{}> {
    const url = `${this.baseUrl}/changestate/${id}/${status}`;
    return this.http.get<{}>(url)
        .pipe(
            catchError(this.handleError)
        );
  }

  public listVocabularies(): Observable<any[]> {
      const url = `${this.baseUrl}/categories`;
      return this.http.get<any[]>(url)
          .pipe(
              map((res: any[]) => res['data']),
              catchError(this.handleError)
          );
  }

  public delete(id:number): Observable<{}> {
      const url = `${this.baseUrl}/delete/${id}`;
      return this.http.get<{}>(url) //.delete<{}>
          .pipe(
              map((res: Response) => res),
              catchError(this.handleError)
          );
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
