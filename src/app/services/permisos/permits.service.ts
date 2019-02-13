import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class PermitsService {
  private url: string;
  private constantes;
  private permits;
  private permit_obr;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  getParams(menu) {
    let cedula = JSON.parse(localStorage.getItem("user"));
    let data = { id: cedula.identification, submenu: menu };
    return JSON.stringify(data);
  }

  getPermits(menu, nombre_submenu) {
    this.url = this.constantes.getRouterGlobal() + "permission";
    let headers = new Headers({ "Content-type": "aplication/json" });
    let options = new RequestOptions({ headers: headers });
    let params = this.getParams(menu);

    let permits = localStorage.getItem(nombre_submenu);

    if (!permits) {
      this.http
        .post(this.url, params, options)
        .map(res => res.json())
        .subscribe(
          result => {
            this.permits = JSON.stringify(result);
            if (this.permits.identification !== false) {
              localStorage.setItem(nombre_submenu, this.permits);
            }
          },
          error => {
            console.log(error);
          }
        );
    } else {
    }
  }

  permits_obr(params) {
    this.permit_obr = localStorage.getItem("obr");
    if (!this.permit_obr) {
      this.url = this.constantes.getRouterGlobal() + "permission/obr";
      this.http
        .post(this.url, params)
        .map(res => res.json())
        .subscribe(
          result => {
            let permit_obr = JSON.stringify(result.permit_obr);
            localStorage.setItem("obr", permit_obr);
          },
          error => {}
        );
    }
  }

  getPermist_employee(params) {
    this.url =
      this.constantes.getRouterGlobal() + "permission/contract_employee";
    this.http
      .post(this.url, params)
      .map(res => res.json())
      .subscribe(
        result => {
          let permit_employee = JSON.stringify(result.response);
          console.log(permit_employee);
          localStorage.setItem("contract_employee", permit_employee);
        },
        error => {}
      );
  }

  getPermitsSubMenu(value) {
    let permisos;

    return JSON.parse(localStorage.getItem(value));
  }

  search_submenu(params) {
    this.url = this.constantes.getRouterGlobal() + "permission/profile_search";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_update(params) {
    this.url = this.constantes.getRouterGlobal() + "permission/update_permisos";
    return this.http.post(this.url, params).map(res => res.json());
  }

  create_permise(params) {
    this.url = this.constantes.getRouterGlobal() + "permission/create_permise";

    return this.http.post(this.url, params).map(res => res.json());
  }
  update_permits(params) {
    this.url = this.constantes.getRouterGlobal() + "permission/update_permits";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
