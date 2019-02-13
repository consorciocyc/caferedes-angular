import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class CompanyService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "company/search";

    return this.http.post(this.url, params).map(res => res.json());
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "company/create";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "company/update";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
