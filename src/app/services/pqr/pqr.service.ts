import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class PqrService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  validate(params) {
    this.url = this.constantes.getRouterGlobal() + "acta/validate";
    return this.http.post(this.url, params).map(res => res.json());
  }

  state_pqr() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "pqr/state_pqr";
    return this.http.post(this.url, params).map(res => res.json());
  }

  origin_pqr() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "pqr/origin_pqr";
    return this.http.post(this.url, params).map(res => res.json());
  }

  type_pqr() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "pqr/type_pqr";
    return this.http.post(this.url, params).map(res => res.json());
  }
  type_queja() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "pqr/type_queja";
    return this.http.post(this.url, params).map(res => res.json());
  }
  reason_pqr(params) {
    this.url = this.constantes.getRouterGlobal() + "pqr/reason_pqr";
    return this.http.post(this.url, params).map(res => res.json());
  }

  save_pqr(params) {
    this.url = this.constantes.getRouterGlobal() + "pqr/save_pqr";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_pqr(params) {
    this.url = this.constantes.getRouterGlobal() + "pqr/search_pqr";
    return this.http.post(this.url, params).map(res => res.json());
  }

  edit(params) {
    this.url = this.constantes.getRouterGlobal() + "pqr/edit";
    return this.http.post(this.url, params).map(res => res.json());
  }

  delete(params) {
    this.url = this.constantes.getRouterGlobal() + "pqr/delete";
    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "pqr/update";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_obr(params) {
    this.url = this.constantes.getRouterGlobal() + "pqr/search_obr";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_externas(params) {
    this.url = this.constantes.getRouterGlobal() + "pqr/search_externas";
    return this.http.post(this.url, params).map(res => res.json());
  }
}
