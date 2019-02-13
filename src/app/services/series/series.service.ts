import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class SeriesService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "series/save";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "series/search";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "series/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  print(params) {
    this.url = this.constantes.getRouterGlobal() + "series/sprint";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete(params) {
    this.url = this.constantes.getRouterGlobal() + "series/delete";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searchs(params) {
    this.url = this.constantes.getRouterGlobal() + "series/searchs";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
