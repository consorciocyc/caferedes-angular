import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  HostListener
} from "@angular/core";
import { ListService } from "../../services/list/list.service";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { PurchasesService } from "../../services/purchases/purchases.service";
import { purchases_head } from "../../models/purchases_model";
import { PermitsService } from "../../services/permisos/permits.service";
import { ViewChildren, QueryList } from "@angular/core";
import { ContractService } from "../../services/contract.service";
import { constantes } from "../../utilitis/constantes";
import swal from "sweetalert2";
declare var number_format: any;
declare var add: any;
import $ from "jquery";
declare var validateDate: any;
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/ui/widgets/autocomplete";
import { CustomValidators } from "ng2-validation";

import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";

@Component({
  selector: "app-purchases",
  templateUrl: "./purchases.component.html",
  styleUrls: ["./purchases.component.scss"],
  providers: [
    ListService,
    AutocompleteService,
    SerializerService,
    DatatablesService,
    PurchasesService,
    PermitsService
  ]
})
export class PurchasesComponent implements OnInit {
  public state_moves;
  public cellar;
  public idcompany;
  public consecutive;
  public company;
  public response;
  public buttonDisabled;
  public buttonUpdate;
  private datatables;
  public datos;
  public tableWidget: any;
  public head: purchases_head;
  public selectedName: string = "";
  public purchases;
  public detail_purchases;

  public code = true;
  public subtotal;
  public valor_iva;
  public valor_total;

  public permisos;
  public validateHead = new purchases_head();
  public buttonProvider = false;
  public contract;
  public print;

  //autocomplete
  public search_code;
  public idproviders;
  public search_provider;
  public searc_matedescrip;

  public list;
  public constantes;
  public url;
  public url_api;
  public text: String;
  public user;
  public data = [];
  public empresa;
  public contrato;

  public Pinsert;
  public Pupdate;
  public Pdelete;
  public btnupload;
  public start_date;
  public end_date;
  public updatedisable = false;

  constructor(
    private ListService: ListService,
    private AutocompleteService: AutocompleteService,
    private SerializerService: SerializerService,
    private changeDetectorRef: ChangeDetectorRef,
    private datatableservice: DatatablesService,
    private eRef: ElementRef,
    private PurchasesService: PurchasesService,
    private PermitsService: PermitsService,
    public contractService: ContractService
  ) {
    this.datatables = new datatables();
    this.head = new purchases_head();
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.url_api = this.constantes.getRouterApi();
    this.search_provider = this.url + "provider/autocomplete?term=:keyword";
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
  }

  rowDataHomeForm: any;

  ngOnInit() {
    this.buttonUpdate = true;

    this.get_state_movest();

    this.AutocompleteService.autocomplete_provider();
    this.AutocompleteService.autocomplete_code_provider();
    this.AutocompleteService.autocomplete_description_provider();
    this.get_cellar();
    this.SerializerService.serializer();

    this.list = localStorage.getItem("id_list");
    this.get_permits();
    this.datatables.initDatatable("#example");

    this.user = JSON.parse(localStorage.getItem("user"));
    this.rowDataHomeForm = [];
    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");
  }
  autocomple() {
    this.search_code =
      this.url +
      "provider/autocomplete_code?term=:keyword&idlist=" +
      this.list +
      "&provider=" +
      this.idproviders;

    this.searc_matedescrip =
      this.url +
      "provider/autocomplete_description_provider?term=:keyword&idlist=" +
      this.list +
      "&provider=" +
      this.idproviders;
  }

  spermits() {
    if (!this.permisos) {
      this.permisos = JSON.parse(localStorage.getItem("Purchases"));

      this.Pinsert = this.permisos.insert;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
    }
  }
  valuechagemate(index: number, newrow: any) {
    newrow.code = newrow.cod_mater.code;
    newrow.idmateriales = newrow.cod_mater.idmateriales;
    newrow.description = newrow.cod_mater.description;
    newrow.request_amount = newrow.cod_mater.request_amount;
    newrow.supply_vlru = newrow.cod_mater.supply_vlru;
    newrow.supply_discount = newrow.cod_mater.supply_discount;
    newrow.supply_iva = newrow.cod_mater.supply_iva;
    newrow.name_Unity = newrow.cod_mater.name_Unity;
  }

  valuechagematedes(index: number, newrow: any) {
    newrow.code = newrow.description.code;
    newrow.cod_mater = newrow.description.code;
    newrow.idmateriales = newrow.description.idmateriales;
    newrow.request_amount = newrow.description.request_amount;
    newrow.supply_vlru = newrow.description.supply_vlru;
    newrow.supply_discount = newrow.description.supply_discount;
    newrow.supply_iva = newrow.description.supply_iva;
    newrow.name_Unity = newrow.description.name_Unity;
  }

  valueChanged(newVal) {
    this.idproviders = newVal.idproviders;

    this.code = false;
    this.autocomple();
  }
  // funcion para los permisos
  get_permits() {
    this.PermitsService.getPermits(2, "Purchases");
  }

  // funciones del datatable
  public addRow(datos): void {
    this.data = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.data.push(data1);
    }
    this.datatables.reInitDatatable("#example");
  }

  public selectRow(index: number, row: any) {
    this.selectedName = "row#" + index + " " + row.consecutive_purc;
  }

  /////////////////////////////////-----------------------------------------////////////////////////////////--------------------------------///////////////////////////////////////////////__________

  // evento enter
  someMethod(event: any) {
    if (event.keyCode == 13) {
      this.addRowHomeCampusProvinceAreaForm();
    } else {
    }
  }

  // funciona para buscar las ordenes de compras
  search_purchases() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    let params = {
      start_date: this.start_date,
      end_date: this.end_date,
      company: this.company
    };
    this.datatableservice.get_datatables(params, "purchase/search").subscribe(
      response => {
        this.datos = response.purchases;
        this.addRow(this.datos);
      },
      error => {
        console.log(error);
      }
    );
  }

  // funcion para el boton de seleccionar en la ventana modal
  handleClick(event) {
    let data = event.target.value;

    let params = { idpurchases: data };

    this.PurchasesService.search_purchases_unit(params).subscribe(
      res => {
        if (res.purchases.purchases_state_purc != 1) {
          this.buttonUpdate = true;
        } else {
          this.buttonUpdate = false;
        }
        this.purchases = res.purchases;
        this.consecutive = res.purchases.consecutive_purc;
        this.rowDataHomeForm = res.detail_purchases;

        this.head = res.purchases;
        this.updatedisable = true;
        this.buttonProvider = true;
        this.code = false;
        this.idproviders = res.purchases.provider;
        this.autocomple();
        this.operacion_automatica();
        if (this.contract == res.purchases.purchases_id_contract) {
        } else {
          this.contractService.addCrib(res.purchases.purchases_id_contract);
          this.contract = res.purchases.purchases_id_contract;
        }
      },
      error => {
        console.log(error);
      }
    );

    this.buttonDisabled = true; // ?
  }

  //elimina las filas de los tr
  delete(index, event) {
    this.spermits();
    if (this.Pdelete == 0) {
      swal("", "No Cuenta con Permiso", "error");
      return;
    }
    let data = event.target.value;

    this.rowDataHomeForm.splice(index, 1);

    let json = { iddetail_shopping: data, user: this.user.identification };

    if (data != "") {
      this.PurchasesService.delete(json).subscribe(
        res => {
          let response = res.data;

          if ((response = true)) {
            swal("", "Se ha Eliminado correctamente el Material", "success");
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  // agrega filas a los tr
  addRowHomeCampusProvinceAreaForm() {
    this.rowDataHomeForm.push({});
  }

  // funcion para insertar los materiales
  inser_purchase() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");

    this.spermits();
    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso", "error");
      return;
    }

    let rawData = $("#table").serializeFormJSON();
    let formData = JSON.stringify(rawData);

    let table = $("#form").serializeObject();

    let detail_purchase = {
      body: this.rowDataHomeForm,
      head: this.head,
      user: this.user.identification,
      contract: this.contract,
      company: this.company
    };

    this.PurchasesService.insert(detail_purchase, table).subscribe(
      res => {
        this.head.consecutive_purc = res.consecutive_purc;
        this.response = res.data;
        this.head = res.purchases;

        if (this.response == true) {
          this.buttonDisabled = true; // ?

          swal(
            "",
            "Se ha Guardado la Orden de Compra correctamente",
            "success"
          );
        }

        if (this.response == "") {
          swal(
            "",
            "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
            "error"
          );
        }
      },
      error => {
        swal(
          "",
          "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
          "error"
        );
        console.log(error);
      }
    );
  }
  // funcion para imprimir
  imprimir() {
    window.open(
      this.url_api + "purchase/print?idpurchases=" + this.head.idpurchases
    );
  }

  imprimir_search() {
    window.open(
      this.url_api + "purchase/print?idpurchases=" + this.head.idpurchases
    );
  }

  // funcion para atualizar
  update_purchase() {
    this.spermits();
    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso", "error");
      return;
    }

    var rawData = $("#table").serializeFormJSON();
    var formData = JSON.stringify(rawData);

    var table = $("#form").serializeObject();

    let user = this.user.identification;
    let detail_purchase = {
      body: this.rowDataHomeForm,
      head: this.head,
      user: this.user.identification
    };

    this.PurchasesService.update(detail_purchase, table).subscribe(
      res => {
        this.consecutive = res.consecutive;
        this.response = res.data;
        this.buttonDisabled = true; // ?
        this.rowDataHomeForm = res.detail_purchases;

        if (this.response == true) {
          swal("", "Se Atualizo correctamente", "success");
        }

        if (this.response == "") {
          swal(
            "",
            "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
            "error"
          );
        }
      },
      error => {
        swal(
          "",
          "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
          "error"
        );
        console.log(error);
      }
    );
  }

  //funcion para consultar los estados de compras y ingresos
  get_state_movest() {
    this.ListService.state_moves().subscribe(
      res => {
        this.state_moves = res.state_moves;
      },
      error => {
        console.log(error);
      }
    );
  }

  //funcion para consultar los almacenes
  get_cellar() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.ListService.cellar(this.company).subscribe(
      res => {
        this.cellar = res.cellar;
      },
      error => {
        console.log(error);
      }
    );
  }

  operaciones(index: number, newrow: any) {
    let cantidad = newrow.request_amount;
    let vlor = newrow.supply_vlru;
    let descuento = newrow.supply_discount;
    let iva = newrow.supply_iva;

    let descuentv = (vlor * descuento) / 100;

    let vdescuento = vlor - descuentv;

    let tiva = (vdescuento * iva) / 100;

    let viva = vdescuento + tiva;

    newrow.vlriva = viva;
    newrow.subtotal = cantidad * vdescuento;
    newrow.total = cantidad * viva;
    this.operacion_automatica();
  }

  // funcion para las operaciones de cada fila de la tabla
  operacion_automatica() {
    let subtotal = 0;
    let total1 = 0;
    for (var i = 0; i < this.rowDataHomeForm.length; i++) {
      subtotal += this.rowDataHomeForm[i]["subtotal"];
      total1 += this.rowDataHomeForm[i]["total"];
    }
    this.subtotal = Number(subtotal).toFixed(2);
    this.valor_total = Number(total1).toFixed(2);
    this.valor_iva = Number(total1 - subtotal).toFixed(2);
  }

  ViewCompany() {
    this.empresa;
    this.contrato;
  }
}
