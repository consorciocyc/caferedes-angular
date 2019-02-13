import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class UsuarioService {
  public constantes = new constantes();
  public url: string;

  constructor(private http: Http) {}

  search_init(params) {
    this.url = this.constantes.getRouterGlobal() + "user/search_init";

    return this.http.post(this.url, params).map(res => res.json());
  }

  create(params) {
    this.url = this.constantes.getRouterGlobal() + "user/create";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update_user(params) {
    this.url = this.constantes.getRouterGlobal() + "user/update_user";
    return this.http.post(this.url, params).map(res => res.json());
  }
  user_search(params) {
    this.url = this.constantes.getRouterGlobal() + "user/user_search";
    return this.http.post(this.url, params).map(res => res.json());
  }

  add_contract(params) {
    this.url = this.constantes.getRouterGlobal() + "user/add_contract";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_contract(params) {
    this.url = this.constantes.getRouterGlobal() + "user/search_contract";
    return this.http.post(this.url, params).map(res => res.json());
  }
  delete_contract(params) {
    this.url = this.constantes.getRouterGlobal() + "user/delete_contract";
    return this.http.post(this.url, params).map(res => res.json());
  }
  search_cellar(params){
    this.url = this.constantes.getRouterGlobal() + "user/search_cellar";
    return this.http.post(this.url, params).map(res => res.json());
  }

save_cellar(params){
  this.url = this.constantes.getRouterGlobal() + "user/save_cellar";
  return this.http.post(this.url, params).map(res => res.json());
}
delete_cellar(params){
  this.url = this.constantes.getRouterGlobal() + "user/delete_cellar";
  return this.http.post(this.url, params).map(res => res.json());
}
}
