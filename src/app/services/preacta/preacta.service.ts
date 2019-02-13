import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class ActaService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  validate(params) {
    this.url = this.constantes.getRouterGlobal() + "acta/validate";
    return this.http.post(this.url, params).map(res => res.json());
  }

  upload_acta(params) {
    this.url = this.constantes.getRouterGlobal() + "acta/upload_acta";
    return this.http.post(this.url, params).map(res => res.json());
  }
}
