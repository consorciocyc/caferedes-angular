
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class TypeofworkService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  save(params) {
    this.url = this.constantes.getRouterGlobal() + "typeofwork/save";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "typeofwork/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  ssave(params) {
    this.url = this.constantes.getRouterGlobal() + "typeofwork/ssave";

    return this.http.post(this.url, params).map(res => res.json());
  }

  supdate(params) {
    this.url = this.constantes.getRouterGlobal() + "typeofwork/supdate";

    return this.http.post(this.url, params).map(res => res.json());
  }

}
