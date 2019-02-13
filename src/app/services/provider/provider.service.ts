import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class ProviderService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "provider/insert_provider";
    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "provider/update_provider";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "provider/search";
    return this.http.post(this.url, params).map(res => res.json());
  }

  edit(params) {
    this.url = this.constantes.getRouterGlobal() + "provider/query";
    return this.http.post(this.url, params).map(res => res.json());
  }

  edit_material(params) {
    this.url = this.constantes.getRouterGlobal() + "provider/edit";
    return this.http.post(this.url, params).map(res => res.json());
  }
  addmaterial() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "provider/add";
    return this.http.post(this.url, params).map(res => res.json());
  }

  validate_material(params) {
    this.url = this.constantes.getRouterGlobal() + "provider/validate";
    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_supply(params) {
    this.url = this.constantes.getRouterGlobal() + "provider/delete_supply";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_provider() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "provider/search_provider";
    return this.http.post(this.url, params).map(res => res.json());
  }
}
