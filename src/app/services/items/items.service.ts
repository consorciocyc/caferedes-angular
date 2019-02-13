import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class ItemsService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "items/search";

    return this.http.post(this.url, params).map(res => res.json());
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "items/insert";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "items/update";

    return this.http.post(this.url, params).map(res => res.json());
  }
  delete(params) {
    this.url = this.constantes.getRouterGlobal() + "items/delete";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
