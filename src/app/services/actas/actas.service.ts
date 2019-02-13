import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";


import { constantes } from "../../utilitis/constantes";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
@Injectable()
export class ActasService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  saveacta(params) {
    this.url = this.constantes.getRouterGlobal() + "external/saveacta";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_actas(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_actas";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_act(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_act";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update_acta(params) {
    this.url = this.constantes.getRouterGlobal() + "external/update_acta";

    return this.http.post(this.url, params).map(res => res.json());
  }

  send_mail(params) {
    this.url = this.constantes.getRouterGlobal() + "external/send_mail";

    return this.http.post(this.url, params).map(res => res.json());
  }

  imagesend_acta(params) {
    this.url = this.constantes.getRouterGlobal() + "external/imagesend_acta";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_imageactas(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_imageactas";

    return this.http.post(this.url, params).map(res => res.json());
  }

  lis_type_acta() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "external/lis_type_acta";
    return this.http.post(this.url, params).map(res => res.json());
  }

  searchidobr(params) {
    this.url = this.constantes.getRouterGlobal() + "external/searchidobr";

    return this.http.post(this.url, params).map(res => res.json());
  }
  state_items() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "items/state_items";

    return this.http.post(this.url, params).map(res => res.json());
  }

  save_items(params) {
    this.url = this.constantes.getRouterGlobal() + "external/save_items_actas";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_items(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/search_items_actas";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delet_items(params) {
    this.url = this.constantes.getRouterGlobal() + "external/delet_items_actas";

    return this.http.post(this.url, params).map(res => res.json());
  }
  search_acta(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_acta";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_user(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_user";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_address(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_address";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_idoti() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "external/search_idoti";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_list_ipid(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_list_ipid";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_oti(params) {
    this.url = this.constantes.getRouterGlobal() + "external/idoti";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
