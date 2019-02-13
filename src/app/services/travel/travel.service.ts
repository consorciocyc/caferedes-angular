import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { filter, catchError, tap, map, switchMap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class TravelService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  sub_state() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "internal/sub_state";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searchrecorredor(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/search_recorrodor";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searchporpragramar(params) {
    this.url =
      this.constantes.getRouterGlobal() + "internal/search_porprogramar";

    return this.http.post(this.url, params).map(res => res.json());
  }
  saverecorredor(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/saverecorredor";

    return this.http.post(this.url, params).map(res => res.json());
  }

  saveporprogramar(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/saveprogramacion";

    return this.http.post(this.url, params).map(res => res.json());
  }

  saveporprogramar_total(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/saveporprogramar_total";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "transfer/updatehead";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
