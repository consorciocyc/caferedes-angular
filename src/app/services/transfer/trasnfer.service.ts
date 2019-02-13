import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { constantes } from '../../utilitis/constantes';

@Injectable()
export class TrasnferService {
  private constantes;
  private url;


  constructor(private http: Http) {

    this.constantes = new constantes();
  }

  insert(params) {

    this.url = this.constantes.getRouterGlobal() + "transfer/insert";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "transfer/searchhead";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "transfer/updatehead";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
