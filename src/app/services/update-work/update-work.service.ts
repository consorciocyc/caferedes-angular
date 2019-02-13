
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class UpdateWorkService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  delete(params) {
    this.url = this.constantes.getRouterGlobal() + "updatework/delete";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "updatework/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "updatework/search";

    return this.http.post(this.url, params).map(res => res.json());
  }

  create(params) {
    this.url = this.constantes.getRouterGlobal() + "updatework/create";

    return this.http.post(this.url, params).map(res => res.json());
  }


  cargarType() {
    this.url = this.constantes.getRouterGlobal() + "updatework/cargarType";
    let params;
    return this.http.post(this.url, params).map(res => res.json());
  }
  cargarM() {
    this.url = this.constantes.getRouterGlobal() + "updatework/cargarM";
    let params;
    return this.http.post(this.url, params).map(res => res.json());
  }

  cargarSubtipos() {
    this.url = this.constantes.getRouterGlobal() + "updatework/cargarSubtipos";
    let params;
    return this.http.post(this.url, params).map(res => res.json());
  }

  cargarSubstado() {
    this.url = this.constantes.getRouterGlobal() + "updatework/cargarSubstado";
    let params;
    return this.http.post(this.url, params).map(res => res.json());
  }
  updateot(params) {
    this.url = this.constantes.getRouterGlobal() + "updatework/updateot";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searchot(params) {
    this.url = this.constantes.getRouterGlobal() + "updatework/searchot";

    return this.http.post(this.url, params).map(res => res.json());
  }

  
}