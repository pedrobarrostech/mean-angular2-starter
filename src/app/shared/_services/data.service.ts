import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCats() {
    return this.http.get('/api/cats').map(res => res.json());
  }

  addCat(cat) {
    return this.http.post("/api/cats", JSON.stringify(cat), this.options);
  }

  editCat(cat) {
    return this.http.put(`/api/cats/${cat._id}`, JSON.stringify(cat), this.options);
  }

  deleteCat(cat) {
    return this.http.delete(`/api/cats/${cat._id}`, this.options);
  }
  
}
