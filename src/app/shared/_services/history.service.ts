import { Injectable } from '@angular/core';
import { History } from '../_models/history';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService{
  private url = 'api/histories/';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) {
  }

  getAll (): Observable<History[]> {
    return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  add (history: History): Observable<History> {
    let body = JSON.stringify(history);
    return this.http.post(this.url, body, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
                    
  }

  update(history: History) {
    let body = JSON.stringify(history);
    return this.http.put(this.url + history._id, body, this.options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  remove(history: History)  {
    return this.http.delete(this.url + history._id, this.options)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    //return body.data || { };
    return body || { };
  }
  
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}