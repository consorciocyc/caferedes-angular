import { Component, OnInit } from "@angular/core";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { constantes } from "../../utilitis/constantes";
import { PermitsService } from "../../services/permisos/permits.service";
import { ListService } from "../../services/list/list.service";
import { ItemsService } from "../../services/items/items.service";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { ItemsModel } from "../../models/items.model";
import { Items_table_Model } from "../../models/items.model";
import swal from "sweetalert2";
import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";

import { CustomValidators } from "ng2-validation";

@Component({
  selector: "app-collection-item",
  templateUrl: "./collection-item.component.html",
  styleUrls: ["./collection-item.component.scss"],
  providers: [ItemsModel, PermitsService, ItemsService]
})
export class CollectionItemComponent implements OnInit {
  public datatables;
  private constantes;
  public company;
  public contract;
  public idcontrac;
  public list_contrac;
  public tipo_s_item;
  public itemsmodel;
  public tipo_obra;
  public class_items;
  public state;
  public btn_insert;
  public items_table_model;
  public items_table = [];
  public search_item_cobro_tipo;
  public btn_serach;

  constructor(
    private _PermitsService: PermitsService,
    private ListService: ListService,
    private AutocompleteService: AutocompleteService,
    private ItemsService: ItemsService
  ) {
    this.constantes = new constantes();
    this.datatables = new datatables();
    this.itemsmodel = new ItemsModel();
    this.items_table_model = new Items_table_Model();
  }

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.idcontrac = localStorage.getItem("contract");
    this.get_contract();
    this.datatables.reInitDatatable("#table");
    this.tipo_item();
    this.tipo_obraitem();
    this.clas_items();
    this.items_state();
  }

  get_contract() {
    let params = { company: this.company };
    let url = "list/contract";

    this.ListService.get_list(url, params).subscribe(
      result => {
        this.list_contrac = result.contract;
      },
      error => {}
    );
  }

  search_item() {
    let params = {
      company: this.company,
      contract: this.idcontrac,
      type_obr: this.search_item_cobro_tipo
    };

    this.ItemsService.search(params).subscribe(
      result => {
        this.items_table = result.search;
        this.datatables.reInitDatatable("#table");
      },
      error => {}
    );
  }

  // funcion que consulta la lista de tipos de suministros para los items de cobra externas
  tipo_item() {
    this.ListService.tipo_s_item().subscribe(
      result => {
        this.tipo_s_item = result.tipo_s_item;
      },
      error => {}
    );
  }

  tipo_obraitem() {
    let params = { company: this.company };
    this.ListService.tipo_item(params).subscribe(
      result => {
        this.tipo_obra = result.type_item;
      },
      error => {}
    );
  }
  clas_items() {
    let params = { company: this.company, contract: this.idcontrac };
    this.ListService.clasificacion_item(params).subscribe(
      result => {
        this.class_items = result.clasificacion_item;
      },
      error => {}
    );
  }

  items_state() {
    this.ListService.state().subscribe(
      result => {
        this.state = result.states;
      },
      error => {}
    );
  }
  new_item() {
    this.itemsmodel = new ItemsModel();
    this.btn_insert = false;
  }
  Onsave() {
    this.idcontrac = localStorage.getItem("contract");
    let params = {
      data: this.itemsmodel,
      company: this.company,
      contract: this.idcontrac
    };
    this.ItemsService.insert(params).subscribe(
      result => {
        if (result.data == true) {
          swal("", "Item creado", "success");
        }
        this.btn_insert = true;
      },
      error => {}
    );
  }

  public enviar(index: number, row: any) {
    let code = row.item_cobro_code;
    let descrip = row.item_cobro_name;
    let unidad = row.item_cobro_unidad;
    let tipo_obra = row.item_cobro_type;
    let valor = row.item_cobro_valor;
    let state = row.item_cobro_state;
    let tipoins = row.item_cobro_state;
    let classf = row.item_cobro_clasificacion;

    let params = {
      id: row.iditem_cobro,
      code: row.item_cobro_code,
      descrip: row.item_cobro_name,
      unidad: row.item_cobro_unidad,
      tipo_obra: row.item_cobro_type,
      valor: row.item_cobro_valor,
      state: row.item_cobro_state,
      tipoins: row.item_cobro_state,
      classf: row.item_cobro_clasificacion
    };

    this.ItemsService.update(params).subscribe(
      result => {
        if (result.data == true) {
          swal("", "Se Atualizo Corretamente", "success");
        } else {
          swal("", "Comuniquese al area de sistemas", "error");
        }
      },
      error => {}
    );
  }

  eliminar(index: number, row: any) {
    let params = { id: row.iditem_cobro };
    this.ItemsService.delete(params).subscribe(
      result => {
        if (result.search == true) {
          swal("", "Se ha eliminado el item", "success");
        }
      },
      error => {}
    );
  }
}
