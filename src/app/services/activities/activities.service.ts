import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class ActivitisService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "activities/search";

    return this.http.post(this.url, params).map(res => res.json());
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "activities/save";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "activities/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete(params) {
    this.url = this.constantes.getRouterGlobal() + "activities/delete";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
