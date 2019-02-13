import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class UserService {
  public constantes = new constantes();
  public url: string;

  constructor(private http: Http) {}

  public _headers() {
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  public consultar_users(params) {
    this.url = this.constantes.getRouterGlobal() + "employee/search_employee";
    let options = this._headers();
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  public save_user(params) {
    this.url = this.constantes.getRouterGlobal() + "employee/insert_employee";
    let options = this._headers();
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  public actualizar_users(params) {
    this.url = this.constantes.getRouterGlobal() + "employee/update_employee";
    let options = this._headers();
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  public upload_image(fd) {
    this.url = this.constantes.getRouterGlobal() + "employee/upload_image";

    return this.http.post(this.url, fd).map(res => res.json());
  }

  save_contracts(params) {
    this.url = this.constantes.getRouterGlobal() + "employee/insert_contrat";
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  getAll_contracts(params) {
    this.url = this.constantes.getRouterGlobal() + "employee/view_contract";
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  getId_contract(params) {
    this.url = this.constantes.getRouterGlobal() + "employee/request_contract";
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  get_SubCharge(params) {
    this.url = this.constantes.getRouterGlobal() + "employee/get_SubCharge";
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  charge(params) {
    this.url = this.constantes.getRouterGlobal() + "employee/charge";
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }
  update_contract(params) {
    this.url = this.constantes.getRouterGlobal() + "employee/update_contract";
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }
}
