
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class GangService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  delete(params) {
    this.url = this.constantes.getRouterGlobal() + "gang/delete";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "gang/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "gang/search";

    return this.http.post(this.url, params).map(res => res.json());
  }

  create(params) {
    this.url = this.constantes.getRouterGlobal() + "gang/create";

    return this.http.post(this.url, params).map(res => res.json());
  }

  
}