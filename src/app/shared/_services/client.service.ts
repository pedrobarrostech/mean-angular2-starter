import { Injectable } from '@angular/core';
import { Client } from '../_models/client';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService{
  url = 'api/client/';
  constructor(private http: Http) {
  }

  getAll (): Observable<Client[]> {
    return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  add (client: Client): Observable<Client> {
    let body = JSON.stringify({ client });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, body, options)
                    .map(this.extractData)
                    .catch(this.handleError);
                    
  }

  update(client: Client) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(client);
    return this.http.put(this.url + client.id, body, headers).map((res: Response) => res.json());
  }

  remove(id) {
    return this.http.delete(this.url + id);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}