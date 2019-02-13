
import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class PermitService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  save(params) {
    this.url = this.constantes.getRouterGlobal() + "permit/save";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "permit/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "permit/searc";

    return this.http.post(this.url, params).map(res => res.json());
  }


  
}