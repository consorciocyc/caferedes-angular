
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class SupportService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }
  save(params) {
    this.url = this.constantes.getRouterGlobal() + "support/save";

    return this.http.post(this.url, params).map(res => res.json());
  }
  update(params) {
    this.url = this.constantes.getRouterGlobal() + "support/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "support/search";
    return this.http.post(this.url, params).map(res => res.json());
  }
  deletes(params) {
    this.url = this.constantes.getRouterGlobal() + "support/delete";
    return this.http.post(this.url, params).map(res => res.json());
  }

}