
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class SubworktypeService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  delete(params) {
    this.url = this.constantes.getRouterGlobal() + "subworktype/delete";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "subworktype/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "subworktype/search";

    return this.http.post(this.url, params).map(res => res.json());
  }

  create(params) {
    this.url = this.constantes.getRouterGlobal() + "subworktype/create";
    
    return this.http.post(this.url, params).map(res => res.json());
  }

  cargarType() {
    this.url = this.constantes.getRouterGlobal() + "subworktype/cargarType";
    let params;
    return this.http.post(this.url, params).map(res => res.json());
  }

  cargarState() {
    this.url = this.constantes.getRouterGlobal() + "subworktype/cargarState";
    let params;
    return this.http.post(this.url, params).map(res => res.json());
  }
  
}