import { Component, OnInit } from "@angular/core";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { PurchasesService } from "../../services/purchases/purchases.service";
import swal from "sweetalert2";
import { IncomeService } from "../../services/income/income.service";
import { ListService } from "../../services/list/list.service";
import { PermitsService } from "../../services/permisos/permits.service";

import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { income_head } from "../../models/income_model";
import { Edit_mate } from "../../models/income_model";
import { ContractService } from "../../services/contract.service";
import { constantes } from "../../utilitis/constantes";

@Component({
  selector: "app-income",
  templateUrl: "./income.component.html",
  styleUrls: ["./income.component.scss"],
  providers: [
    ListService,
    AutocompleteService,
    DatatablesService,
    datatables,
    SerializerService,
    PurchasesService,
    IncomeService,
    PermitsService
  ]
})
export class IncomeComponent implements OnInit {
  public moves_income: any;
  public company;
  public botoon_insert;
  public cellar;
  public data = [];
  public dataincome = [];
  public butoonsearch;
  public input_reques;
  public code = true;
  public requested_amount = true;
  public loader;
  public rowDatatable = [];
  public datos;
  public selectedName: string = "";
  public buttonaddrow;
  public buttoinsert;

  public state_moves;
  public response;
  public buttonDisabled;
  public buttonUpdate;
  public disabled;
  public botoncellar;
  public empresa;
  public contrato;
  //variables para el retorno de datos consulta por compras
  public consecutive_purc;

  public providers;
  public purchases_state_purc;
  public purchases_cellar;
  public input_provider;

  //variables para el retorno de datos consuctivo y otros datos del ingreso
  public income_conse;

  public income_remission;
  public income_invoice;

  public iddetail_shopping;
  public idincome_details;

  public idsupply_provider;
  public material_code;
  public description;
  public csolicitada;
  public vlru;
  public discount;
  public Vdescuento;
  public iva;
  public total;

  public income_date_delivery;
  public income_observations;
  public idincome;
  public idincome_move;
  public delete;
  public subtotal;
  public valor_iva;
  public valor_total;

  public permisos;
  public user;
  public contract;
  public end_date;
  public start_date;
  public end_date1;
  public start_date1;
  public headincome = new income_head();

  public edit_mate = new Edit_mate();
  rowDataHomeForm = [];

  public search_provider;

  public search_code;
  public list;
  public idproviders;
  public searc_matedescrip;

  public Pinsert;
  public Pupdate;
  public Pdelete;
  public constantes;
  public url;
  public url_api;
  constructor(
    private AutocompleteService: AutocompleteService,
    private datatableservice: DatatablesService,
    private datatables: datatables,
    private SerializerService: SerializerService,
    private PurchasesService: PurchasesService,
    private IncomeService: IncomeService,
    private ListService: ListService,
    private PermitsService: PermitsService,
    public contractService: ContractService
  ) {
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.url_api = this.constantes.getRouterApi();
    this.search_provider = this.url + "provider/autocomplete?term=:keyword";
  }

  ngOnInit() {
    this.input_provider = true;
    this.buttonUpdate = true;
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");
    this.list = localStorage.getItem("id_list");
    this.get_moves_income();
    this.get_cellar(this.company);

    this.SerializerService.serializer();
    this.rowDatatable = [];

    this.get_state_movest();

    this.datatables.initDatatable("#search_purchases");
    this.get_permits();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.headincome.purchases_date = this.fsubstate();
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
      this.permisos = JSON.parse(localStorage.getItem("income"));

      this.Pinsert = this.permisos.insert;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
    }
  }
  save() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");
  }
  // funcion para consultar la lista de movimientos
  get_moves_income() {
    this.ListService.moves_income().subscribe(
      res => {
        this.moves_income = res.moves_income;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_permits() {
    this.PermitsService.getPermits(3, "income");
  }

  // funcion para consutar la lista de almaenes
  get_cellar(idcompany) {
    this.ListService.cellar(this.company).subscribe(
      res => {
        this.cellar = res.cellar;
      },
      error => {
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

  // funciones para agregar registros a la tabla de busqueda de compras
  addRow(datos): void {
    this.data = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.data.push(data1);
    }
    this.datatables.reInitDatatable("#search_purchases");
  }

  // funcion para agregar la tabla a la busqueda de ingresos
  addRow_income(datos): void {
    this.dataincome = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.dataincome.push(data1);
    }
    this.datatables.reInitDatatable("#searctable_income");
  }

  // funciona para buscar las ordenes de compras
  search_purchases() {
    let params = {
      start_date: this.start_date1,
      end_date: this.end_date1,
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

  serach_income() {
    var table = {
      start_date: this.start_date,
      end_date: this.end_date,
      company: this.company
    };

    this.datatableservice.get_datatables(table, "income/search_date").subscribe(
      response => {
        this.datos = response.income;
        this.addRow_income(this.datos);
      },
      error => {
        console.log(error);
      }
    );
  }

  public selectRow(index: number, row: any) {
    this.selectedName = "row#" + index + " " + row.consecutive_purc;
  }

  // funcion para el boton de seleccionar en la ventana modal
  seleccionar(event) {
    let idpurchases = event.target.value;

    let data = { idpurchases: idpurchases };

    this.PurchasesService.search_purchases_unit(data).subscribe(
      res => {
        if (res.purchases.purchases_state_purc != 1) {
          swal("", "La Orden De Compra Ya Tiene un Ingreso", "error");
          return;
        }
        this.buttonaddrow = false;
        this.input_provider = true;

        this.headincome = res.purchases;

        this.rowDatatable = res.detail_purchases;
        this.disabled = true;
        this.delete = true;
        this.buttonaddrow = true;
        this.input_provider = true;
        this.headincome.income_move = 1;

        this.headincome.purchases_date = this.fsubstate();
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
  }

  // evento enter
  someMethod(event: any) {
    if (event.keyCode == 13) {
      this.addrowtable();
    } else {
    }
  }

  // funcion para el boton de seleccionar en la ventana modal de buscar ingresos
  seleccionar_income(event) {
    this.buttoinsert = true;
    this.buttonUpdate = false;

    let idincome = event.target.value;

    let data = { idincome: idincome };

    this.IncomeService.serach_income(data).subscribe(
      res => {
        this.consecutive_purc = res.income.income_idpurchases;

        this.headincome = res.income;

        this.rowDatatable = res.detail_income;

        if (this.idincome_move == 1) {
          this.buttonaddrow = true;
        } else {
          this.buttonaddrow = false;
        }
        this.input_provider = true;
        this.butoonsearch = true;
        this.delete = true;
        this.rowDatatable = res.detail_income;
        this.headincome.income_move = 1;
        this.disabled = true;
        this.operacion_automatica();
        if (this.contract == res.income.income_idcontract) {
        } else {
          this.contractService.addCrib(res.income.income_idcontract);
          this.contract = res.income.income_idcontract;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // funcion para agregar tr a la tabla
  addrowtable() {
    if (this.headincome.income_move != 1) {
      this.rowDatatable.push({});
    }
  }

  //elimina las filas de los tr
  deleteRowHomeForm(index: number, newrow: any) {
    if (this.Pdelete == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }

    this.rowDatatable.splice(index, 1);

    //let json = { idincome_details: data, user: this.user.identification };
  }

  // funcion para insertar los ingresos
  insert_income() {
    if (
      this.headincome.purchases_id_contract != this.contract &&
      this.headincome.income_move == 1
    ) {
      swal(
        "",
        "El Contrato Seleccionado no Correponde a La Orden de Compra",
        "error"
      );
      return;
    }

    this.spermits();
    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }

    if (this.headincome.purchases_state_purc == 1) {
      swal("", "El estado debe de ser diferente a Proceso", "error");
      return;
    }

    let total_requested_amount = 0;
    let total_ceceived_amount = 0;

    for (var e in this.rowDatatable) {
      total_requested_amount += Number(this.rowDatatable[e].requested_amount);
      total_ceceived_amount += Number(this.rowDatatable[e].ceceived_amount);
    }

    if (total_ceceived_amount == 0) {
      swal("", "La Cantidad Recibida Esta En 0", "error");
      this.headincome.purchases_state_purc = 1;
      return;
    }
    if (
      total_requested_amount > total_ceceived_amount &&
      this.headincome.purchases_state_purc != 2
    ) {
      swal("", "El estado debe de ser Recibido Parcial", "error");
      this.headincome.purchases_state_purc = 2;
      return;
    }
    if (
      total_requested_amount == total_ceceived_amount &&
      this.headincome.purchases_state_purc != 3
    ) {
      swal("", "El estado debe de ser Recibido Total", "error");
      this.headincome.purchases_state_purc = 3;
      return;
    }
    this.loader = false;
    let income = {
      body: this.rowDatatable,
      head: this.headincome,
      user: this.user.identification,
      contract: this.contract,
      company: this.company
    };

    this.IncomeService.insert(income).subscribe(
      res => {
        this.buttoinsert = false;
        this.income_conse = res.income_conse;

        this.response = res.data;
        this.headincome.income_conse = res.income_conse;
        this.headincome.idincome = res.idincome;

        if (this.response == true) {
          this.botoon_insert = true;
          this.loader = true;
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

  editpurchase(index: number, newrow: any) {
    this.spermits();
    this.iddetail_shopping = newrow.iddetail_shopping;
    this.idincome_details = newrow.idincome_details;
    let json = {
      idincome_details: this.idincome_details,
      iddetail_shopping: this.iddetail_shopping
    };

    if (this.Pupdate == 0) {
      swal("", "No tiene Permisos", "error");
    }
    this.IncomeService.editpurchase(json).subscribe(
      result => {
        this.edit_mate = result.data;
        this.edit_mate.ceceived_amount = newrow.ceceived_amount;
        // this.Vdescuento=result
        //this.total=result
      },
      error => {}
    );
  }

  // funcion de atualizar
  update_income() {
    this.spermits();
    if (this.Pupdate == 0) {
      swal("", "No Cuenta con Permiso Atualizar", "error");
    }
    this.loader = false;
    let income = {
      body: this.rowDatatable,
      head: this.headincome,
      user: this.user.identification,
      company: this.company,
      contract: this.contract
    };

    this.IncomeService.update(income).subscribe(
      res => {
        this.response = res.data;

        if (this.response == true) {
          this.loader = true;
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

  // funcion para las operaciones de cada fila de la tabla
  operation_purchases() {}

  /// funciones nuevas
  tipo() {
    if (this.headincome.income_move != 1) {
      this.input_provider = false;
      this.requested_amount = false;
    } else {
      this.input_provider = true;
    }
  }

  valueChanged(newVal) {
    this.idproviders = newVal.idproviders;

    this.code = false;
    this.autocomple();
  }
  valuechagemate(index: number, newrow: any) {
    newrow.code = newrow.cod_mater.code;
    newrow.cod_material = newrow.cod_mater.idmateriales;
    newrow.description = newrow.cod_mater.description;
    newrow.name_Unity = newrow.cod_mater.name_Unity;

    newrow.unit_value = newrow.cod_mater.supply_vlru;
    newrow.discount = newrow.cod_mater.supply_discount;
    newrow.iva = newrow.cod_mater.supply_iva;

    newrow.vlriva = 0;
    newrow.isubtotal = 0;
    newrow.itotal = 0;
  }

  valuechagematedes(index: number, newrow: any) {
    newrow.cod_mater = newrow.description.code;
    newrow.code = newrow.description.code;
    newrow.name_Unity = newrow.description.name_Unity;
    newrow.idmateriales = newrow.description.idmateriales;

    newrow.unit_value = newrow.description.supply_vlru;
    newrow.discount = newrow.description.supply_discount;
    newrow.iva = newrow.description.supply_iva;

    newrow.vlriva = 0;
    newrow.isubtotal = 0;
    newrow.itotal = 0;
  }
  operaciones(index: number, newrow: any) {
    let cantidad = newrow.ceceived_amount;
    let vlor =
      newrow.supply_vlru == undefined ? newrow.unit_value : newrow.supply_vlru;
    let descuento =
      newrow.supply_discount == undefined
        ? newrow.discount
        : newrow.supply_discount;
    let iva = newrow.supply_iva == undefined ? newrow.iva : newrow.supply_iva;

    let descuentv = (vlor * descuento) / 100;

    let vdescuento = vlor - descuentv;

    let tiva = (vdescuento * iva) / 100;

    let viva = vdescuento + tiva;

    newrow.vlriva = viva;
    newrow.isubtotal = cantidad * vdescuento;
    newrow.itotal = cantidad * viva;

    this.operacion_automatica();

    if (Number(newrow.ceceived_amount) > Number(newrow.requested_amount)) {
      newrow.ceceived_amount = 0;
      newrow.vlriva = 0;
      newrow.isubtotal = 0;
      newrow.itotal = 0;
      this.operacion_automatica();

      swal("", "La cantidad es Recibida Mayor que la solicitada", "error");
    }
  }

  operacion_automatica() {
    let subtotal = 0;
    let total1 = 0;

    for (var i = 0; i < this.rowDatatable.length; i++) {
      let total =
        this.rowDatatable[i]["itotal"] == undefined
          ? 0
          : this.rowDatatable[i]["itotal"];
      let subtotal1 =
        this.rowDatatable[i]["isubtotal"] == undefined
          ? 0
          : this.rowDatatable[i]["isubtotal"];
      subtotal += subtotal1;
      total1 += total;
    }

    this.subtotal = Number(subtotal).toFixed(2);
    this.valor_total = Number(total1).toFixed(2);
    this.valor_iva = Number(total1 - subtotal).toFixed(2);
  }

  edit_mate_purchase() {
    let params = {
      purchases: this.edit_mate,
      idincome_details: this.idincome_details,
      iddetail_shopping: this.iddetail_shopping,
      idincome: this.headincome.idincome,
      idpurchase: this.headincome.idpurchases
    };

    this.IncomeService.edit_mate_purchase(params).subscribe(
      result => {
        this.rowDatatable = result.data;
        this.operacion_automatica();
      },
      error => {}
    );
  }

  operaciones_edit() {
    let discuento = (this.edit_mate.unit_value * this.edit_mate.discount) / 100;
    let vdescuento = this.edit_mate.unit_value - discuento;
    this.edit_mate.subtotal = this.edit_mate.requested_amount * vdescuento;

    let iva = (vdescuento * this.edit_mate.iva) / 100;

    let viva: any = Number(iva + vdescuento).toFixed(2);
    this.edit_mate.total = Number(
      viva * this.edit_mate.requested_amount
    ).toFixed(2);
    this.edit_mate.vlriva = Number(
      this.edit_mate.total - this.edit_mate.subtotal
    ).toFixed(2);
  }

  print() {
    if (this.headincome.idincome == undefined) {
      return;
    }
    window.open(
      this.url_api + "income/print?idincome=" + this.headincome.idincome
    );
  }

  fsubstate() {
    let hoy: any = new Date();
    let dd: any = hoy.getDate();
    let mm: any = hoy.getMonth() + 1; //hoy es 0!
    let yyyy = hoy.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    hoy = yyyy + "-" + mm + "-" + dd;
    return hoy;
  }
}
