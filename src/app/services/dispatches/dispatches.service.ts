import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import { constantes } from "../../utilitis/constantes";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class DispatchesService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "dispatche/insert";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "dispatche/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_dispatche(params) {
    this.url = this.constantes.getRouterGlobal() + "dispatche/search";

    return this.http.post(this.url, params).map(res => res.json());
  }
  series_delet(params) {
    this.url = this.constantes.getRouterGlobal() + "dispatche/series_delet";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_obr_dispachet(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/search_obr_dispachet";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
