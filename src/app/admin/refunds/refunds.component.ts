import { Component, OnInit } from "@angular/core";
import { ListService } from "../../services/list/list.service";

import { PermitsService } from "../../services/permisos/permits.service";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { RefundService } from "../../services/refund/refund.service";
import { ContractService } from "../../services/contract.service";
import { DispatchesService } from "../../services/dispatches/dispatches.service";
import { refund_head } from "../../models/refund.model";
import swal from "sweetalert2";
import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";
import { error } from "selenium-webdriver";
import { constantes } from "../../utilitis/constantes";

@Component({
  selector: "app-refunds",
  templateUrl: "./refunds.component.html",
  styleUrls: ["./refunds.component.scss"],
  providers: [
    ListService,
    DatatablesService,
    PermitsService,
    datatables,
    RefundService,
    DispatchesService
  ]
})
export class RefundsComponent implements OnInit {
  public company;
  public dispatches_move;
  public datos;
  public data = [];
  public data_refund = [];
  public destination_dispatches;
  public constantes;
  public url;
  public refundhead = new refund_head();
  public employee;
  public id_employee;
  public consec;
  public rowDatatable;

  public cellar;
  public dispatche_cellar;
  public move;
  public consec_workI;

  public date;
  public destino;
  public incharge;
  public iddispatches;
  public idemployees;
  public name;
  public idrefund;

  public permisos;
  public user;

  public consec_refund;

  public start_date;
  public end_date;
  public start_date1;
  public end_date1;
  public empresa;
  public contrato;
  public contract;
  public dispatches_contract;
  public buttoinsert;
  public dataseries;
  public disable_update = false;

  public bottonupdate = true;
  public Pinsert;
  public Pupdate;
  public Pdelete;
  constructor(
    private ListService: ListService,
    private datatableservice: DatatablesService,
    private PermitsService: PermitsService,
    private datatables: datatables,
    private RefundService: RefundService,
    public contractService: ContractService,
    private DispatchesService: DispatchesService
  ) {
    this.constantes = new constantes();
  }

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");

    this.get_cellar(this.company);
    this.get_dispatches_move();

    this.get_destination_dispatches();

    this.user = JSON.parse(localStorage.getItem("user"));
    this.get_permits();
  }

  spermits() {
    if (!this.permisos) {
      this.permisos = JSON.parse(localStorage.getItem("Refund"));

      this.Pinsert = this.permisos.insert;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
    }
  }

  get_permits() {
    this.PermitsService.getPermits(5, "Refund");
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

  // funcion para buscar los despachos
  search_date() {
    let table = {
      start_date: this.start_date1,
      end_date: this.end_date1,
      company: this.company
    };

    this.datatableservice
      .get_datatables(table, "dispatche/search_dispatches_refunt")
      .subscribe(
        response => {
          this.datos = response.dispatches;
          this.addRow(this.datos);
        },
        error => {
          console.log(error);
        }
      );
  }

  // funcion para buscar los reintegros
  search_date_refund() {
    let table = {
      start_date: this.start_date,
      end_date: this.end_date,
      company: this.company
    };

    this.datatableservice
      .get_datatables(table, "refund/search_date_refund")
      .subscribe(
        response => {
          this.datos = response.refund;
          this.addRow_refund(this.datos);
        },
        error => {
          console.log(error);
        }
      );
  }

  // funciones del datatable
  public addRow(datos): void {
    this.data = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.data.push(data1);
    }
    this.datatables.reInitDatatable("#table_dispatche");
  }

  public addRow_refund(datos): void {
    this.data_refund = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.data_refund.push(data1);
    }
    this.datatables.reInitDatatable("#search_table");

    this.bottonupdate = false;
    this.buttoinsert = true;
  }

  // funcion para seleccionar el despacho
  select_dispatch(event) {
    let data = event.target.value;

    let json = {
      dispatche: data
    };

    this.RefundService.search_refund_unit(json).subscribe(
      res => {
        this.refundhead = res.dispatches;
        this.rowDatatable = res.dispatches_body;
        this.refundhead.namecomple =
          res.dispatches.name + " " + res.dispatches.last_name;
        this.dataseries = res.series;

        if (this.contract == res.dispatches.dispatches_contract) {
        } else {
          this.contractService.addCrib(res.dispatches.dispatches_contract);
          this.contract = res.dispatches.dispatches_contract;
        }
      },
      error => {}
    );
  }

  // funcion para insertar
  insert() {
    this.spermits();
    let income = {
      body: this.rowDatatable,
      head: this.refundhead,
      user: this.user.identification,
      contract: this.contract,
      company: this.company
    };

    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }
    this.RefundService.insert(income).subscribe(
      res => {
        this.refundhead.refund_conse = res.consecutive;
        if (res.data == true) {
          swal("", "Se ha Guardado El Reintegro", "success");

          this.buttoinsert = true;
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

  select_refound(event) {
    let data = event.target.value;

    let json = {
      idrefund: data
    };

    this.RefundService.search_refund(json).subscribe(
      res => {
        this.rowDatatable = res.search_body;
        this.refundhead = res.search_head;
        this.consec_refund = res.search_head.refund_conse;

        this.refundhead.namecomple =
          res.search_head.name + " " + res.search_head.last_name;
        this.disable_update = true;
        if (this.contract == res.search_head.refund_contract) {
        } else {
          this.contractService.addCrib(res.search_head.refund_contract);
          this.contract = res.search_head.refund_contract;
        }
      },
      error => {}
    );
  }

  update() {
    this.spermits();
    if (this.Pupdate == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }

    let refund = {
      body: this.rowDatatable,
      head: this.refundhead,
      user: this.user.identification,
      company: this.company
    };

    this.RefundService.update_refund(refund).subscribe(
      res => {
        if ((res.data = true)) {
          swal("", "Se ha Atualizado El Reintegro", "success");
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

  operaciones(index: number, row: any) {
    if (row.refund > row.quantity) {
      row.refund = 0;
      swal("", "La cantidad Reintegrada Mayor que la Despachada", "error");
    }
  }

  series(index: number, newrow: any) {}

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
}
