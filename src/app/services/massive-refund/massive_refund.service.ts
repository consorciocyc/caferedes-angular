import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { constantes } from '../../utilitis/constantes';


@Injectable()
export class massive_refund {

  private url: string;
  private params: string;
  private constantes;


  constructor(private http: Http) {

    this.constantes = new constantes();
  }



  insert(params) {

    this.url = this.constantes.getRouterGlobal() + 'refund/insert';

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_refouncmass(params) {

    this.url = this.constantes.getRouterGlobal() + 'refund/search_refund_massive';

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {

    this.url = this.constantes.getRouterGlobal() + 'refund/update_head';

    return this.http.post(this.url, params).map(res => res.json());
  }
}