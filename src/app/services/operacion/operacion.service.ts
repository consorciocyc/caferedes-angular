import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class OperacionService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  list_tipo() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "operaction/list_tipo";
    return this.http.post(this.url, params).map(res => res.json());
  }

  state() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "operaction/state";
    return this.http.post(this.url, params).map(res => res.json());
  }

  list(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/list";
    return this.http.post(this.url, params).map(res => res.json());
  }
  update(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/update";
    return this.http.post(this.url, params).map(res => res.json());
  }

  serach_consec(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/consec";
    return this.http.post(this.url, params).map(res => res.json());
  }

  searchoym(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/searchoym";
    return this.http.post(this.url, params).map(res => res.json());
  }

  municipali() {
    let params = { id_departamento: 5 };
    this.url = this.constantes.getRouterGlobal() + "departamentos/municipios";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_idobr(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/searchoym";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_items(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/search_items";
    return this.http.post(this.url, params).map(res => res.json());
  }
  insert_items(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/insert_items";
    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_items(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/delete_items";
    return this.http.post(this.url, params).map(res => res.json());
  }
  insert_mate(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/insert_material";
    return this.http.post(this.url, params).map(res => res.json());
  }

  searc_material(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/searc_material";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_image(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/search_image";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_activitys(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/search_activity";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_oym(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/search_oym_date";
    return this.http.post(this.url, params).map(res => res.json());
  }

  save_activitys(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/save_activitys";
    return this.http.post(this.url, params).map(res => res.json());
  }

  delet_activitys(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/delet_activity";
    return this.http.post(this.url, params).map(res => res.json());
  }

  list_type_activity() {
    let params;
    this.url =
      this.constantes.getRouterGlobal() + "operaction/list_type_activity";
    return this.http.post(this.url, params).map(res => res.json());
  }
}
