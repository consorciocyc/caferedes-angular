import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class IncomeService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "income/create";

    return this.http.post(this.url, params).map(res => res.json());
  }

  serach_income(params) {
    this.url = this.constantes.getRouterGlobal() + "income/search";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "income/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  editpurchase(params) {
    this.url = this.constantes.getRouterGlobal() + "income/editpurchase";

    return this.http.post(this.url, params).map(res => res.json());
  }

  edit_mate_purchase(params) {
    this.url = this.constantes.getRouterGlobal() + "income/edit_mate";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete(params) {
    this.url = this.constantes.getRouterGlobal() + "income/delete";
    return this.http.post(this.url, params).map(res => res.json());
  }
}
