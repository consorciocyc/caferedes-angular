import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class ListService {
  private url: string;
  private params: string;
  private constantes;
  public generate_list: any[];

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  state_moves() {
    this.url = this.constantes.getRouterGlobal() + "state_moves";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  list_tipeext() {
    this.url = this.constantes.getRouterGlobal() + "list/list_tipeext";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  state_anillo() {
    this.url = this.constantes.getRouterGlobal() + "list/state_anillo";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  type_obr_anillo() {
    this.url = this.constantes.getRouterGlobal() + "list/type_obr_anillo";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  state_ext() {
    this.url = this.constantes.getRouterGlobal() + "list/state_ext";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  moves_income() {
    this.url = this.constantes.getRouterGlobal() + "income_move";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  cellar(idcompany) {
    let params = { idcompany: idcompany };
    this.url = this.constantes.getRouterGlobal() + "cellar";
    return this.http.post(this.url, params).map(res => res.json());
  }

  dispatches_move() {
    this.url = this.constantes.getRouterGlobal() + "dispatches/dispatches_move";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  destination_dispatches() {
    this.url =
      this.constantes.getRouterGlobal() + "dispatches/destination_dispatches";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  company(params) {
    this.url = this.constantes.getRouterGlobal() + "list/company";
    return this.http.post(this.url, params).map(res => res.json());
  }

  contract(params) {
    this.url = this.constantes.getRouterGlobal() + "list/local_contract";
    return this.http.post(this.url, params).map(res => res.json());
  }

  list_profiles(params) {
    this.url = this.constantes.getRouterGlobal() + "list/list_profiles";
    return this.http.post(this.url, params).map(res => res.json());
  }

  get_list(url, params = null) {
    this.url = this.constantes.getRouterGlobal() + url;
    let headers = new Headers({ "content-type": "aplication/json" });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, params, options).map(res => res.json());
  }

  // funcion que consulta la lista de tipos de suministros para los items de cobra externas
  tipo_s_item() {
    this.url = this.constantes.getRouterGlobal() + "list/tipo_s_item";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  tipo_item(params) {
    this.url = this.constantes.getRouterGlobal() + "list/tipo_item";
    return this.http.post(this.url, params).map(res => res.json());
  }

  clasificacion_item(params) {
    this.url = this.constantes.getRouterGlobal() + "list/clasificacion_item";
    return this.http.post(this.url, params).map(res => res.json());
  }

  state() {
    this.url = this.constantes.getRouterGlobal() + "list/states";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  tipo_medidor() {
    this.url = this.constantes.getRouterGlobal() + "list/tipo_medidor";
    return this.http.post(this.url, this.params).map(res => res.json());
  }

  getCompany(){
    this.url = this.constantes.getRouterGlobal() + "company";
    return this.http.get(this.url, this.params).map(res => res.json());
  }
}
