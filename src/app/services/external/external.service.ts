import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import { constantes } from "../../utilitis/constantes";

@Injectable()
export class ExternalService {
  private constantes;
  private url;

  constructor(private http: Http) {
    this.constantes = new constantes();
  }

  insert(params) {
    this.url = this.constantes.getRouterGlobal() + "external/insert";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update(params) {
    this.url = this.constantes.getRouterGlobal() + "external/update";

    return this.http.post(this.url, params).map(res => res.json());
  }
  search_consec(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_consec";

    return this.http.post(this.url, params).map(res => res.json());
  }

  insert_anillo(params) {
    this.url = this.constantes.getRouterGlobal() + "external/insert_anillo";

    return this.http.post(this.url, params).map(res => res.json());
  }

  se_oti(params) {
    this.url = this.constantes.getRouterGlobal() + "external/consecutive";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_municipaly(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_municipaly";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_oti(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_oti";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update_oti(params) {
    this.url = this.constantes.getRouterGlobal() + "external/update_anillo";

    return this.http.post(this.url, params).map(res => res.json());
  }

  save_presupuesto_item(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/save_presupuesto_item";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_presupuesto_item(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/search_presupuesto_item";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_itemsp(params) {
    this.url = this.constantes.getRouterGlobal() + "external/delete_items";

    return this.http.post(this.url, params).map(res => res.json());
  }

  insert_dobra(params) {
    this.url = this.constantes.getRouterGlobal() + "external/insert_dobra";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update_dobra(params) {
    this.url = this.constantes.getRouterGlobal() + "external/update_dobra";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searc_detalle_obra(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/searc_detalle_obra";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searc_detalle_obra_edit(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/searc_detalle_obra_edit";

    return this.http.post(this.url, params).map(res => res.json());
  }

  save_dobra(params) {
    this.url = this.constantes.getRouterGlobal() + "external/save_dobra";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_dobra(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_dobra";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_dobra(params) {
    this.url = this.constantes.getRouterGlobal() + "external/delete_dobra";

    return this.http.post(this.url, params).map(res => res.json());
  }

  state_items() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "items/state_items";

    return this.http.post(this.url, params).map(res => res.json());
  }

  save_item_cbr(params) {
    this.url = this.constantes.getRouterGlobal() + "external/save_item_cbr";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_item_cbr(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_item_cbr";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_item_cbr(params) {
    this.url = this.constantes.getRouterGlobal() + "external/delete_item_cbr";

    return this.http.post(this.url, params).map(res => res.json());
  }

  save_mate(params) {
    this.url = this.constantes.getRouterGlobal() + "external/save_mate";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_mate(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_mate";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_mate(params) {
    this.url = this.constantes.getRouterGlobal() + "external/delete_mate";

    return this.http.post(this.url, params).map(res => res.json());
  }

  state_activity() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "list/state_activity";

    return this.http.post(this.url, params).map(res => res.json());
  }

  save_activity(params) {
    this.url = this.constantes.getRouterGlobal() + "external/save_activity";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_activity(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_activity";

    return this.http.post(this.url, params).map(res => res.json());
  }
  search_params_oti(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_params_oti";

    return this.http.post(this.url, params).map(res => res.json());
  }
  search_params_addrees(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/search_params_addrees";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_params_consec(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/search_params_consec";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_detalle_obra(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/delete_detalle_obra";

    return this.http.post(this.url, params).map(res => res.json());
  }

  send_image(params) {
    this.url = this.constantes.getRouterGlobal() + "external/send_image";

    return this.http.post(this.url, params).map(res => res.json());
  }

  import_presu(params) {
    this.url = this.constantes.getRouterGlobal() + "external/import_presu";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_activity(params) {
    this.url = this.constantes.getRouterGlobal() + "external/delete_activity";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update_activity(params) {
    this.url = this.constantes.getRouterGlobal() + "external/update_activity";

    return this.http.post(this.url, params).map(res => res.json());
  }

  saveacta(params) {
    this.url = this.constantes.getRouterGlobal() + "external/saveacta";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_actas(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_actas";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_act(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_act";

    return this.http.post(this.url, params).map(res => res.json());
  }

  update_acta(params) {
    this.url = this.constantes.getRouterGlobal() + "external/update_acta";

    return this.http.post(this.url, params).map(res => res.json());
  }

  send_mail(params) {
    this.url = this.constantes.getRouterGlobal() + "external/send_mail";

    return this.http.post(this.url, params).map(res => res.json());
  }

  imagesend_acta(params) {
    this.url = this.constantes.getRouterGlobal() + "external/imagesend_acta";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_imageactas(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_imageactas";

    return this.http.post(this.url, params).map(res => res.json());
  }

  lis_type_acta() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "external/lis_type_acta";
    return this.http.post(this.url, params).map(res => res.json());
  }
  type_gans() {
    let params;
    this.url = this.constantes.getRouterGlobal() + "external/type_gans";
    return this.http.post(this.url, params).map(res => res.json());
  }

  search_dobra_gerencial(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/search_dobra_gerencial";

    return this.http.post(this.url, params).map(res => res.json());
  }

  save_dobra_gerencial(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/save_dobra_gerencial";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_det_itemp_gen(params) {
    this.url =
      this.constantes.getRouterGlobal() + "external/delete_det_itemp_gen";

    return this.http.post(this.url, params).map(res => res.json());
  }

  saveow(params) {
    this.url = this.constantes.getRouterGlobal() + "external/saveow";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_list_ipid(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_list_ipid";

    return this.http.post(this.url, params).map(res => res.json());
  }

  search_ow(params) {
    this.url = this.constantes.getRouterGlobal() + "external/search_ow";

    return this.http.post(this.url, params).map(res => res.json());
  }

  delete_itemsow(params) {
    this.url = this.constantes.getRouterGlobal() + "external/delete_itemsow";

    return this.http.post(this.url, params).map(res => res.json());
  }

  //topografia (hcho por anderson)
  savetopo(params) {
    this.url = this.constantes.getRouterGlobal() + "external/savetopo";

    return this.http.post(this.url, params).map(res => res.json());
  }
  updatetopo(params) {
    this.url = this.constantes.getRouterGlobal() + "external/updatetopo";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searchtopo(params) {
    this.url = this.constantes.getRouterGlobal() + "external/searchtopo";
    return this.http.post(this.url, params).map(res => res.json());
  }
  searchOne(params) {
    this.url = this.constantes.getRouterGlobal() + "external/searchOne";
    return this.http.post(this.url, params).map(res => res.json());
  }

  saveipid(params) {
    this.url = this.constantes.getRouterGlobal() + "external/saveipid";

    return this.http.post(this.url, params).map(res => res.json());
  }
  updateipid(params) {
    this.url = this.constantes.getRouterGlobal() + "external/updateipid";

    return this.http.post(this.url, params).map(res => res.json());
  }

  searchipid(params) {
    this.url = this.constantes.getRouterGlobal() + "external/searchipid";
    return this.http.post(this.url, params).map(res => res.json());
  }
  editipid(params) {
    this.url = this.constantes.getRouterGlobal() + "external/editipid";
    return this.http.post(this.url, params).map(res => res.json());
  }

  savecmateria(params) {
    this.url = this.constantes.getRouterGlobal() + "external/savecmaterial";
    return this.http.post(this.url, params).map(res => res.json());
  }
  searchcmaterial(params) {
    this.url = this.constantes.getRouterGlobal() + "external/searchcmaterial";
    return this.http.post(this.url, params).map(res => res.json());
  }
  deletecmaterial(params) {
    this.url = this.constantes.getRouterGlobal() + "external/deletecmaterial";
    return this.http.post(this.url, params).map(res => res.json());
  }
}
