import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import { constantes } from "../../utilitis/constantes";
declare let PDFJS: any;
@Injectable()
export class InternalService {
  private constantes;
  private url;
  public urlpd = "http://192.168.1.8/sip/public/public/";
  urlpdf: String;
  pdfDoc: any = {};
  pageObjectPromise: any = {};

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  search(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/searchpedido";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_cedula(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/cedula";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_consec(params) {
    this.url =
      this.constantes.getRouterGlobal() + "internal/search_consecutive";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searchaddress(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/address";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searchainstall(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/install";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searchobr(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/searchobr";

    return this.http.post(this.url, params).map(res => res.json());
  }
  serie_medidor(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/serie_medidor";

    return this.http.post(this.url, params).map(res => res.json());
  }
  update(params) {
    this.url = this.constantes.getRouterGlobal() + "internal/update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  Tipo_Anillo() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "internal/Tipo_Anillo";

    return this.http.post(this.url, params).map(res => res.json());
  }
  Tipo_Empalme() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "internal/Tipo_Empalme";

    return this.http.post(this.url, params).map(res => res.json());
  }
  Accesorio() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "internal/Accesorio";

    return this.http.post(this.url, params).map(res => res.json());
  }
  Permiso_Ruptura() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "internal/Permiso_Ruptura";

    return this.http.post(this.url, params).map(res => res.json());
  }
  Estado_Acometida() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "internal/Estado_Acometida";

    return this.http.post(this.url, params).map(res => res.json());
  }

  municipios(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "departamentos/municipios";

    return this.http.post(this.url, params).map(res => res.json());
  }

  clasificacion() {
    let params;
    this.url =
      this.constantes.getRouterGlobal(params) + "internal/clasificacion";

    return this.http.post(this.url, params).map(res => res.json());
  }

  motivos_dac(params) {
    this.url = this.constantes.getRouterGlobal(params) + "internal/motivos_dac";

    return this.http.post(this.url, params).map(res => res.json());
  }

  subtipo_obr_internas() {
    let params;
    this.url =
      this.constantes.getRouterGlobal(params) + "internal/subtipo_obr_internas";

    return this.http.post(this.url, params).map(res => res.json());
  }

  sub_state() {
    let params;
    this.url = this.constantes.getRouterGlobal(params) + "internal/sub_state";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update_ot(params) {
    this.url = this.constantes.getRouterGlobal(params) + "internal/update_ot";

    return this.http.post(this.url, params).map(res => res.json());
  }

  dac(params) {
    this.url = this.constantes.getRouterGlobal(params) + "internal/dac";

    return this.http.post(this.url, params).map(res => res.json());
  }

  save_dac(params) {
    this.url = this.constantes.getRouterGlobal(params) + "internal/save_dac";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_dac(params) {
    this.url = this.constantes.getRouterGlobal(params) + "internal/search_dac";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update_dac(params) {
    this.url = this.constantes.getRouterGlobal(params) + "internal/update_dac";

    return this.http.post(this.url, params).map(res => res.json());
  }

  item_ap(params) {
    this.url = this.constantes.getRouterGlobal(params) + "internal/item_ap";

    return this.http.post(this.url, params).map(res => res.json());
  }

  itemaplic_update(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "internal/itemaplic_update";

    return this.http.post(this.url, params).map(res => res.json());
  }

  itemaplic_inser(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "internal/itemaplic_inser";

    return this.http.post(this.url, params).map(res => res.json());
  }

  itemaplic_delet(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "internal/itemaplic_delet";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_histo(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "internal/search_histo";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_itemsapli(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "internal/search_itemsapli";

    return this.http.post(this.url, params).map(res => res.json());
  }

  tipo_obr() {
    let params;
    this.url = this.constantes.getRouterGlobal(params) + "internal/tipo_obr";

    return this.http.post(this.url, params).map(res => res.json());
  }

  state() {
    let params;
    this.url = this.constantes.getRouterGlobal(params) + "internal/state";

    return this.http.post(this.url, params).map(res => res.json());
  }

  send_image(params) {
    this.url = this.constantes.getRouterGlobal(params) + "internal/send_image";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_image(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "internal/search_image";

    return this.http.post(this.url, params).map(res => res.json());
  }

  setPdfDocObjects(data) {
    let self = this;

    return new Promise((resolve, reject) => {
      let url = this.urlpd + data;
      PDFJS.getDocument(url).then(
        _pdfDoc => {
          resolve(_pdfDoc);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  pdf(params) {
    this.url = this.constantes.getRouterGlobal(params) + "internal/pdf";

    return this.http.post(this.url, params).map(res => res.json());
  }

  state_items() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "items/state_items";

    return this.http.post(this.url, params).map(res => res.json());
  }

  insert_items(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "items_internas/insert_items";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_items(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "items_internas/search_items";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_items(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "items_internas/delete_items";

    return this.http.post(this.url, params).map(res => res.json());
  }

  // funcion para consultar la fecha de Fecha/Constru

  search_idobr(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "internal/search_idobr";

    return this.http.post(this.url, params).map(res => res.json());
  }

  insert_mate(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "material_internas/insert_mate";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_material(params) {
    this.url =
      this.constantes.getRouterGlobal(params) +
      "material_internas/delete_material";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searc_material(params) {
    this.url =
      this.constantes.getRouterGlobal(params) +
      "material_internas/search_material";

    return this.http.post(this.url, params).map(res => res.json());
  }

  state_activity() {
    let params;
    this.url = this.constantes.getRouterGlobal(params) + "list/state_activity";

    return this.http.post(this.url, params).map(res => res.json());
  }

  save_activitys(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "activity/save_activitys";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_activitys(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "activity/search_activitys";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_activitys(params) {
    this.url =
      this.constantes.getRouterGlobal(params) + "activity/delete_activitys";

    return this.http.post(this.url, params).map(res => res.json());
  }
}
