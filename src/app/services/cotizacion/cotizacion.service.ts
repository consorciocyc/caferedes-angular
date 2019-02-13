import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class CotizacionService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  search_purchases_unit(params) {
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let url = this.constantes.getRouterGlobal() + "cotizacion/search_detail";

    return this.http.post(url, params, options).map(res => res.json());
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "cotizacion/create";
    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "cotizacion/update";
    return this.http.post(this.url, params).map(res => res.json());
  }

  delete(params) {
    this.url = this.constantes.getRouterGlobal() + "cotizacion/delete";
    return this.http.post(this.url, params).map(res => res.json());
  }
}
