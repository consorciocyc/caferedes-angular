import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class ImportService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "items/search";

    return this.http.post(this.url, params).map(res => res.json());
  }

  check(params) {
    this.url = this.constantes.getRouterGlobal() + "importar/check";

    return this.http.post(this.url, params).map(res => res.json());
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "importar/obra";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "items/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  /// servicios de operacion y mantenimiento

  validate_oym(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/validate";

    return this.http.post(this.url, params).map(res => res.json());
  }

  import_oym(params) {
    this.url = this.constantes.getRouterGlobal() + "operaction/data";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
