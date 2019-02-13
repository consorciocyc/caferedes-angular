import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class PaymentService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "payment/search_payment";
    return this.http.post(this.url, params).map(res => res.json());
  }

  state() {
    let params;
    this.url = this.constantes.getRouterGlobal(params) + "internal/state";

    return this.http.post(this.url, params).map(res => res.json());
  }

  state_activity() {
    let params;
    this.url = this.constantes.getRouterGlobal(params) + "list/state_activity";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_total(params) {
    this.url = this.constantes.getRouterGlobal() + "payment/search_total";
    return this.http.post(this.url, params).map(res => res.json());
  }

  pay(params) {
    this.url = this.constantes.getRouterGlobal() + "payment/pay";
    return this.http.post(this.url, params).map(res => res.json());
  }
  searchpay(params) {
    this.url = this.constantes.getRouterGlobal() + "payment/searchpay";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_payupdate(params) {
    this.url = this.constantes.getRouterGlobal() + "payment/search_payupdate";
    return this.http.post(this.url, params).map(res => res.json());
  }

  payupdate(params) {
    this.url = this.constantes.getRouterGlobal() + "payment/payupdate";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_provider() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "provider/search_provider";
    return this.http.post(this.url, params).map(res => res.json());
  }
}
