import { Component, OnInit } from "@angular/core";
import { ListService } from "../../services/list/list.service";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { DispatchesService } from "../../services/dispatches/dispatches.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { rowhear } from "../../models/dispatches_models";
import { Dispatches_Head } from "../../models/dispatches_models";

//import { PermitsService } from '../../services/permisos/permits.service';
import { PermitsService } from "../../services/permisos/permits.service";
import { ContractService } from "../../services/contract.service";
import swal from "sweetalert2";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { constantes } from "../../utilitis/constantes";

@Component({
  selector: "app-dispatches",
  templateUrl: "./dispatches.component.html",
  styleUrls: ["./dispatches.component.scss"],
  providers: [
    ListService,
    AutocompleteService,
    DispatchesService,
    SerializerService,
    DatatablesService,
    PermitsService,
    datatables
  ]
})
export class DispatchesComponent implements OnInit {
  public dispatches_move;
  public interna = true;
  public externa = true;
  public cellar;
  public destination_dispatches;
  public rowDatatable = [];
  public company;
  public consecutive;
  public response;
  public buttoinsert = false;
  public btndisabled;
  public head = new rowhear();
  public dispatches_head = new Dispatches_Head();
  public data = [];
  public datos;
  public permisos;
  public user;
  public dispatches;
  public name_last;
  public bootom_save;
  public bootom_update;
  public buttonaddrow;
  public buttondelete;
  public bottonupdate;
  public bottoninsert;
  public inventary_quantity;
  public quantity;
  public stostock_plusck;
  public empresa;
  public contrato;
  public contract;
  public dataseries = [];
  public loader;
  public start_date;
  public end_date;

  public searc_employee;
  public searc_mate;
  public code;
  public searc_matedescrip;
  public searc_serie;
  public constantes;
  public Pinsert;
  public Pupdate;
  public Pdelete;
  public url;
  public url_api;
  public search_interna;
  public search_externas;
  public disable_update = false;
  public search_external;
  public oym = true;
  public SearchConsecutive;

  constructor(
    private ListService: ListService,
    private AutocompleteService: AutocompleteService,
    private DispatchesService: DispatchesService,
    private SerializerService: SerializerService,
    private datatableservice: DatatablesService,
    private PermitsService: PermitsService,
    private datatables: datatables,
    public contractService: ContractService
  ) {
    this.constantes = new constantes();
    this.url_api = this.constantes.getRouterApi();
  }

  ngOnInit() {
    this.url = this.constantes.getRouter();
    this.code = true;
    this.get_dispatches_move();

    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");

    this.get_cellar(this.company);
    this.get_destination_dispatches();
    this.datatables.reInitDatatable("#example");
    this.bottonupdate = true;
    this.bottoninsert = true;
    this.get_permits();
    this.rowDatatable = [{}];
    this.dispatches_head.dispatches_date = this.fsubstate();
    this.user = JSON.parse(localStorage.getItem("user"));

    this.searc_employee = this.url + "employee/searc_employee?term=:keyword";
    this.searc_serie =
      this.url + "series/search_series?term=:keyword&contrac=" + this.contract;

    this.search_externas =
      this.url +
      "interna/search_consec_dispache?term=:keyword&company=" +
      this.company;
    this.search_interna =
      this.url +
      "interna/search_consec_dispache?term=:keyword&company=" +
      this.company;

    this.search_external =
      this.url + "external/oti?term=:keyword&contract=" + this.contract;

    this.SearchConsecutive =
      this.url +
      "operaction/search_consec_dispachet?term=:keyword&company=" +
      this.company;
  }

  save() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");
  }

  spermits() {
    if (!this.permisos) {
      this.permisos = JSON.parse(localStorage.getItem("dispatches"));

      this.Pinsert = this.permisos.insert;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
    }
  }

  get_dispatches_move() {
    this.ListService.dispatches_move().subscribe(
      res => {
        this.dispatches_move = res.dispatches_move;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_permits() {
    this.PermitsService.getPermits(4, "dispatches");
  }

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

  get_destination_dispatches() {
    this.ListService.destination_dispatches().subscribe(
      res => {
        this.destination_dispatches = res.destination_dispatches;
      },
      error => {
        console.log(error);
      }
    );
  }

  addrowtable() {
    this.rowDatatable.push({});
  }

  valuechagemate(index: number, newrow: any) {
    let numero = this.rowDatatable.length;
    for (var e in this.rowDatatable) {
      if (this.rowDatatable[e].code == newrow.cod_mater.code && numero > 1) {
        swal("", "El Material Ya Existe", "error");
        newrow.cod_mater = "";
        newrow.code = "";
        newrow.description = "";
        newrow.name_Unity = "";
        newrow.missing = "";
        newrow.serie = 0;
        return;
      }
    }

    newrow.code = newrow.cod_mater.code;
    newrow.description = newrow.cod_mater.description;
    newrow.name_Unity = newrow.cod_mater.name_Unity;
    newrow.missing = newrow.cod_mater.inventary_quantity;
    newrow.serie = newrow.cod_mater.serie;
    newrow.idmateriales = newrow.cod_mater.idmateriales;
  }

  valuechagematedes(index: number, newrow: any) {
    let numero = this.rowDatatable.length;
    for (var e in this.rowDatatable) {
      if (this.rowDatatable[e].code == newrow.description.code && numero > 1) {
        swal("", "El Material Ya Existe", "error");
        newrow.code = "";
        newrow.description = "";
        newrow.name_Unity = "";
        newrow.missing = "";
        newrow.serie = 0;
        newrow.cod_mater = "";
        return;
      }
    }

    newrow.cod_mater = newrow.description.code;
    newrow.code = newrow.description.code;
    newrow.name_Unity = newrow.description.name_Unity;
    newrow.missing = newrow.description.inventary_quantity;
    newrow.idmateriales = newrow.description.idmateriales;
    newrow.serie = newrow.description.serie;
  }

  insert() {
    this.spermits();
    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso", "error");
      return;
    }

    if (this.dispatches_head.idincharge == null) {
      swal("", "No Selecciono EL Encargado", "error");
      return;
    }

    for (var e in this.rowDatatable) {
      if (this.rowDatatable[e].code == null) {
        swal("", "Hay Un Material Mal Digitado", "error");

        return;
      }
    }

    if (
      this.dispatches_head.dispatches_destino == 3 &&
      this.dispatches_head.id_oym == null
    ) {
      swal("", "No ha Digitado EL Consecutivo", "error");

      return;
    }
    this.loader = false;
    let income = {
      body: this.rowDatatable,
      head: this.dispatches_head,
      user: this.user.identification,
      contract: this.contract,
      company: this.company,
      series: this.dataseries
    };

    this.DispatchesService.insert(income).subscribe(
      res => {
        this.buttoinsert = true;

        this.consecutive = res.consecutive;

        this.response = res.data;

        if (this.response == true) {
          this.loader = true;
          swal("", "Se ha Guardado El Despacho correctamente", "success");
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

  update() {
    this.spermits();
    if (this.Pupdate == 0) {
      swal("", "No Cuenta con Permiso", "error");
      return;
    }
    this.loader = false;
    let income = {
      body: this.rowDatatable,
      head: this.dispatches_head,
      user: this.user.identification,
      contract: this.contract,
      company: this.company,
      series: this.dataseries
    };

    this.DispatchesService.update(income).subscribe(
      res => {
        this.buttoinsert = true;

        this.response = res.dispatches;

        if (this.response == true) {
          this.loader = true;
          swal("", "Se ha Atualizado el Despacho correctamente", "success");
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

  // funciona para buscar los despachos
  search_dispatche() {
    var table = {
      start_date: this.start_date,
      end_date: this.end_date,
      company: this.company
    }; //$("#search_transfer").serializeObject();

    this.datatableservice
      .get_datatables(table, "dispatche/search_dispatches")
      .subscribe(
        response => {
          this.data = response.dispatches;
          this.datatables.reInitDatatable("#example");
        },
        error => {
          console.log(error);
        }
      );
  }
  // funciones del datatable

  handleClick(event) {
    let data = event.target.value;

    let json = {
      dispatche: data,
      company: this.company
    };

    this.DispatchesService.search_dispatche(json).subscribe(
      res => {
        this.dispatches_head = res.dispatches;
        this.rowDatatable = res.dispatches_body;
        this.dispatches_head.dispatches_incharge =
          res.dispatches.name + " " + res.dispatches.last_name;
        this.consecutive = res.dispatches.dispatches_conse;
        this.dataseries = res.series;
        this.bottonupdate = false;
        this.buttoinsert = true;
        this.disable_update = true;
        this.buttonaddrow = true;
        this.buttondelete = true;
        this.code = false;
        this.dispatches_head.dispatches_cellar =
          res.dispatches.dispatches_cellar;
        this.disable_update = false;
        this.activate_search();
        if (this.contract == res.dispatches.dispatches_contract) {
        } else {
          this.contractService.addCrib(res.dispatches.dispatches_contract);
          this.contract = res.dispatches.dispatches_contract;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  operaciones(i, newrow) {
    if (newrow.quantity > newrow.missing) {
      newrow.quantity = 0;

      swal("", "La cantidad es Mayor que las Existencias", "error");
    }
  }

  //elimina las filas de los tr
  deleteRowHomeForm(index: number, newrow: any) {
    this.rowDatatable.splice(index, 1);

    //let json = { idincome_details: data, user: this.user.identification };
  }

  series(index: number, newrow: any) {}

  addseries() {
    let number = 0;

    for (var e in this.rowDatatable) {
      if (this.rowDatatable[e].serie == 1) {
        if (this.rowDatatable[e].quantity == undefined) {
          this.rowDatatable[e].quantity = 0;
        }

        number += Number(this.rowDatatable[e].quantity);
      }
    }

    let number_series = this.dataseries.length + 1;

    //console.log(number_series);
    if (number_series <= number) {
      this.dataseries.push({});
    } else {
      swal("", "La Cantidad de Series Supera La Cantidad de Ingresos", "error");
    }
  }

  valuechage_serie(index: number, row: any) {
    if (row.serie.serie_estado == 1) {
      row.serie_marca = row.serie.serie_marca;
      row.serie_modelo = row.serie.serie_modelo;
      row.serie_nro_serie = row.serie.serie_nro_serie;
      row.idseries = row.serie.idseries;
    }

    if (row.serie.serie_despacho != null) {
      swal("", "Esta Serie esta despachada", "error");
      row.serie = "";
    }
  }

  deleteserie(index: number, row: any) {
    if (row.idseries == undefined) {
      this.dataseries.splice(index, 1);
      return;
    }

    let params = { idseries: row.idseries };
    this.DispatchesService.series_delet(params).subscribe(
      result => {
        if (result.result == true) {
          this.dataseries.splice(index, 1);
          swal("", "La Serie Ha Sido Eliminada", "success");
        }
      },
      error => {}
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

  tipo() {
    if (this.dispatches_head.dispatches_destino == 1) {
      this.externa = true;
      this.interna = false;
      this.oym = true;
    }
    if (this.dispatches_head.dispatches_destino == 2) {
      this.interna = true;
      this.externa = false;
      this.oym = true;
    }
    if (this.dispatches_head.dispatches_destino == 3) {
      this.interna = true;
      this.externa = true;
      this.oym = false;
    }
  }

  // funcion para imprimir
  imprimir() {
    window.open(
      this.url_api +
        "dispache/print?iddispatches=" +
        this.dispatches_head.iddispatches
    );
  }

  consec_obr(event) {
    this.dispatches_head.estrato = this.dispatches_head.address.Estrato;
    this.dispatches_head.consec_obr = this.dispatches_head.address.consecutive;
    this.dispatches_head.T_obt = this.dispatches_head.address.tipos_obr_internas_name;
    this.dispatches_head.idworkI = this.dispatches_head.address.idworkI;
    this.dispatches_head.address = this.dispatches_head.address.Direccion;
  }

  idchange() {
    this.dispatches_head.idincharge = this.dispatches_head.dispatches_incharge.idemployees;
  }

  cellar_change() {
    this.rowDatatable = [{}];
    this.searc_mate =
      this.url +
      "material/query_inventmate_code?term=:keyword&cellar=" +
      this.dispatches_head.dispatches_cellar;
    this.code = false;

    this.searc_matedescrip =
      this.url +
      "material/query_inventmate_descrip?term=:keyword&cellar=" +
      this.dispatches_head.dispatches_cellar;
    this.code = false;
  }

  activate_search() {
    this.searc_mate =
      this.url +
      "material/query_inventmate_code?term=:keyword&cellar=" +
      this.dispatches_head.dispatches_cellar;
    this.code = false;

    this.searc_matedescrip =
      this.url +
      "material/query_inventmate_descrip?term=:keyword&cellar=" +
      this.dispatches_head.dispatches_cellar;
    this.code = false;
  }

  external_chage(event) {
    this.dispatches_head.id_oti = this.dispatches_head.oti.idobr_anillos;

    let params = { id_obr: this.dispatches_head.oti.idobr_externa };

    this.DispatchesService.search_obr_dispachet(params).subscribe(
      result => {
        console.log(result.response.obr_direccion);
        this.dispatches_head.n_plano = result.response.obr_nplano;
        this.dispatches_head.address = result.response.obr_direccion;
      },
      error => {}
    );
  }

  oym_chage(event) {
    this.dispatches_head.id_oym = this.dispatches_head.oym.id_oym;
    this.dispatches_head.address = this.dispatches_head.oym.address;
  }
}
