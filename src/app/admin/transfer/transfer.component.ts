import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";
import { ListService } from "../../services/list/list.service";
import { PermitsService } from "../../services/permisos/permits.service";

import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";

import { TrasnferService } from "../../services/transfer/trasnfer.service";
import swal from "sweetalert2";
import { HeadTransfer } from "../../models/transfer.model";
import $ from "jquery";
import { ContractService } from "../../services/contract.service";
import { CustomValidators } from "ng2-validation";
import { constantes } from "../../utilitis/constantes";
@Component({
  selector: "app-transfer",
  templateUrl: "./transfer.component.html",
  styleUrls: ["./transfer.component.scss"],
  providers: [
    ListService,
    TrasnferService,
    DatatablesService,
    PermitsService,
    datatables
  ]
})
export class TransferComponent implements OnInit {
  public cellar;
  public company;
  public rowDataHomeForm = [];
  public user;
  public constantes;
  public url;
  public contract;
  public date_ini;
  public date_end;
  public datatables;
  public data = [];
  public date;
  public consecutive;
  public observation;
  public idtransfer;
  public buttonDisabled;
  public buttonDisabledUpdate = true;
  public headtransfer = new HeadTransfer();
  public contractsearch;
  public empresa;
  public contrato;
  public code = true;

  public searc_mate;
  public searc_matedescrip;
  public permisos;
  public Pinsert;
  public Pupdate;
  public Pdelete;
  @Output() cambiarcontracto = new EventEmitter();

  constructor(
    public ListService: ListService,
    public datatableservice: DatatablesService,
    public PermitsService: PermitsService,
    public TrasnferService: TrasnferService,
    public contractService: ContractService
  ) {
    this.datatables = new datatables();
    this.constantes = new constantes();
  }

  ngOnInit() {
    this.url = this.constantes.getRouter();
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");
    this.get_permits();
    this.get_cellar(this.company);

    this.user = JSON.parse(localStorage.getItem("user"));
    this.rowDataHomeForm = [{}];
    this.datatables.initDatatable("#table_search");
    this.cambiarcontracto.emit(this.empresa);
  }

  get_permits() {
    this.PermitsService.getPermits(8, "transfer");
  }

  spermits() {
    if (!this.permisos) {
      this.permisos = JSON.parse(localStorage.getItem("transfer"));

      this.Pinsert = this.permisos.insert;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
    }
  }

  //funcion para consultar los almacenes
  get_cellar(idcompany) {
    this.ListService.cellar(idcompany).subscribe(
      res => {
        this.cellar = res.cellar;
      },
      error => {
        console.log(error);
      }
    );
  }

  addRow() {
    this.rowDataHomeForm.push({});
  }

  addtable(datos): void {
    this.data = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.data.push(data1);
    }
    this.datatables.reInitDatatable("#table_search");
  }
  delete(index, event) {
    this.rowDataHomeForm.splice(index, 1);
  }

  Onsabe() {
    this.spermits();
    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }

    let transfer = {
      body: this.rowDataHomeForm,
      head: this.headtransfer,
      user: this.user.identification,
      contract: this.contract,
      company: this.company
    };

    if (
      this.headtransfer.transfer_cellar_o == this.headtransfer.transfer_cellar_d
    ) {
      swal("", "Almacen de Origen No puede Ser Igual al de Destino", "error");
    } else {
      this.TrasnferService.insert(transfer).subscribe(
        res => {
          if (res.status == "ok") {
            this.headtransfer.transfer_consec = res.consecutive;
            this.buttonDisabled = true;

            swal("", "Se Ha Guardado el Traslado", "success");
          }
        },
        error => {
          swal(
            "",
            "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
            "error"
          );
        }
      );
    }
  }

  Onsearch() {
    var table = {
      date_end: this.date_end,
      date_ini: this.date_ini,
      company: this.company
    }; //$("#search_transfer").serializeObject();

    this.datatableservice.get_datatables(table, "transfer/search").subscribe(
      response => {
        this.addtable(response.search);
      },
      error => {
        console.log(error);
      }
    );
  }

  handleClick(event) {
    let data = { data: event.target.value, company: this.company };
    this.buttonDisabledUpdate = false;
    this.buttonDisabled = true;

    this.TrasnferService.search(data).subscribe(
      result => {
        let data = result.search;
        this.rowDataHomeForm = result.body;
        this.headtransfer = result.search;
        if (this.contract == result.search.trasfer_contract) {
        } else {
          this.contractService.addCrib(result.search.trasfer_contract);
          this.contract = result.search.trasfer_contract;
        }
      },
      error => {}
    );
  }

  Onupdate() {
    this.spermits();
    if (this.Pupdate == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }

    let transfer = {
      body: this.rowDataHomeForm,
      head: this.headtransfer,
      user: this.user.identification,
      contract: this.contract,
      company: this.company
    };

    this.TrasnferService.update(transfer).subscribe(
      result => {
        if (result.status == "ok") {
          this.rowDataHomeForm = result.data;

          swal("", "Se Ha Atualizado el Traslado", "success");
        }
      },
      error => {}
    );
  }
  ViewCompany() {
    this.empresa;
    this.contrato;
  }

  valuechange() {
    this.autocomplet();
    this.code = false;
    this.rowDataHomeForm = [];
  }

  autocomplet() {
    this.searc_mate =
      this.url +
      "material/query_inventmate_code?term=:keyword&cellar=" +
      this.headtransfer.transfer_cellar_o;
    this.searc_matedescrip =
      this.url +
      "material/query_inventmate_descrip?term=:keyword&cellar=" +
      this.headtransfer.transfer_cellar_o;
  }
  valuechagemate(index: number, newrow: any) {
    let numero = this.rowDataHomeForm.length;
    for (var e in this.rowDataHomeForm) {
      if (this.rowDataHomeForm[e].code == newrow.cod_mater.code && numero > 1) {
        newrow.cod_mater = "";
        newrow.code = "";
        newrow.description = "";
        newrow.name_Unity = "";
        newrow.inventary_quantity = "";
        newrow.idmateriales = "";
        swal("", "El Material Ya Existe", "error");
        return;
      }
    }
    newrow.code = newrow.cod_mater.code;
    newrow.description = newrow.cod_mater.description;
    newrow.name_Unity = newrow.cod_mater.name_Unity;
    newrow.inventary_quantity = newrow.cod_mater.inventary_quantity;
    newrow.idmateriales = newrow.cod_mater.idmateriales;
  }

  valuechagematedes(index: number, newrow: any) {
    let numero = this.rowDataHomeForm.length;
    for (var e in this.rowDataHomeForm) {
      if (
        this.rowDataHomeForm[e].code == newrow.description.code &&
        numero > 1
      ) {
        newrow.cod_mater = "";
        newrow.code = "";
        newrow.description = "";
        newrow.name_Unity = "";
        newrow.inventary_quantity = "";
        newrow.idmateriales = "";
        swal("", "El Material Ya Existe", "error");
        return;
      }
    }

    newrow.cod_mater = newrow.description.code;
    newrow.code = newrow.description.code;
    newrow.name_Unity = newrow.description.name_Unity;
    newrow.inventary_quantity = newrow.description.inventary_quantity;
    newrow.idmateriales = newrow.description.idmateriales;
  }

  operaciones(index: number, newrow: any) {
    if (newrow.inventary_quantity < newrow.quantity) {
      newrow.quantity = 0;
      swal(
        "",
        "La cantidad a Trasladar no Puede ser Mayor a la Disponible",
        "error"
      );
    }
  }
}
