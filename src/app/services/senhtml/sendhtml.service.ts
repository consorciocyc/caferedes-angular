import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class SendhtmlService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  insert(form) {
    this.url = this.constantes.getRouterGlobal() + "Scraping/loader";

    return this.http.post(this.url, form).map(res => res.json());
  }


}
