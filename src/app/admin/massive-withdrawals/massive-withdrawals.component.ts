import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ListService } from "../../services/list/list.service";
import "jquery-ui/ui/widgets/autocomplete";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { PermitsService } from "../../services/permisos/permits.service";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { Masive_Refund_head } from "../../models/refund.model";
import { massive_refund } from "../../services/massive-refund/massive_refund.service";
import $ from "jquery";
import { asNativeElements } from "@angular/core/src/debug/debug_node";
import swal from "sweetalert2";
import { constantes } from "../../utilitis/constantes";
@Component({
  selector: "app-massive-withdrawals",
  templateUrl: "./massive-withdrawals.component.html",
  styleUrls: ["./massive-withdrawals.component.scss"],
  providers: [
    ListService,
    AutocompleteService,
    SerializerService,
    DatatablesService,
    PermitsService,
    datatables,
    massive_refund
  ]
})
export class MassiveWithdrawalsComponent implements OnInit {
  @ViewChild("cellar3") textinput: ElementRef;
  public constantes;
  public url;
  public cellar;
  public company;
  public data = [];
  public data2 = [];
  public datos;
  public selectedName;
  public rowDatatable = [];
  public Datatable;
  public total_reintegro;
  public masive_refund_head = new Masive_Refund_head();
  public pruebacellar;
  public cod;
  public encargado;
  public description;
  public despacho;
  public refund;
  public reintegrosmasivos;
  public id_encargado;
  public unity;
  public user;
  public consecutive;
  public idrefund_masive;
  public date;

  public cellar3: number;
  public employees;
  public idemployees;
  public empresa;
  public contrato;
  public contract;

  public date_end;
  public date_ini;

  public bottoninsert = true;
  public bottonupdate = true;
  public employeeid;

  constructor(
    private ListService: ListService,
    private AutocompleteService: AutocompleteService,
    private SerializerService: SerializerService,
    private datatableservice: DatatablesService,
    private PermitsService: PermitsService,
    private datatables: datatables,
    private mamassive_refund: massive_refund,
    private ElementRef: ElementRef
  ) {
    this.constantes = new constantes();
  }

  ngOnInit() {
    this.url = this.constantes.getRouter();
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");

    this.get_cellar(this.company);
    this.SerializerService.serializer();
    this.AutocompleteService.autocomplete_employee();
    this.jquery();
    this.user = JSON.parse(localStorage.getItem("user"));
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

  search_date() {
    this.employeeid = $("#employeehiden").val();
    let cellar = $("#cellar2").val();
    var table = {
      date_end: this.date_end,
      date_ini: this.date_ini,
      company: this.company,
      employeeid: this.employeeid,
      cellar: cellar
    }; //$("#search_transfer").serializeObject();

    this.datatableservice
      .get_datatables(table, "refund/massive_refound")
      .subscribe(
        response => {
          this.datos = response.search;

          this.addRow(this.datos);
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
    this.datatables.reInitDatatable("#massive_refound");
    this.bottoninsert = false;
  }

  public addRow_search(datos): void {
    this.data2 = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.data2.push(data1);
    }
    this.datatables.reInitDatatable("#table_search_massive");
  }

  public selectRow(index: number, newrow: any) {
    newrow.cod_mater = newrow.code;
    newrow.description = newrow.description;
    newrow.name_Unity = newrow.name_Unity;
    newrow.despacho = newrow.despacho;
    newrow.reintegrosmasivos = newrow.reintegrosmasivos;
    newrow.idmateriales = newrow.idmateriales;
    newrow.refund = 0;
    this.Datatable = {
      cod_mater: newrow.cod_mater,
      despacho: newrow.despacho,
      description: newrow.description,
      reintegrosmasivos: newrow.reintegrosmasivos,
      name_Unity: newrow.name_Unity,
      idmateriales: newrow.idmateriales,
      refund: newrow.refund
    };

    let data1;

    for (data1 of this.rowDatatable) {
      if (data1.cod_mater == newrow.cod_mater) {
        return;
      }
    }

    this.rowDatatable.push(this.Datatable);
  }

  delete(index, event) {
    this.rowDatatable.splice(index, 1);
  }

  datos_head() {
    var var_cellar = (<HTMLInputElement>document.getElementById("cellar2"))
      .value;
    this.masive_refund_head.refund_masive_incharge = $("#employeehiden").val();
    this.masive_refund_head.full_name = $("#employee").val();

    this.masive_refund_head.refund_masive_cellar = Number(var_cellar);
    this.pruebacellar = true;
  }

  insert() {
    let detail_massive = {
      body: this.rowDatatable,
      head: this.masive_refund_head,
      user: this.user.identification,
      company: this.company,
      contract: this.contract
    };

    this.mamassive_refund.insert(detail_massive).subscribe(
      res => {
        this.masive_refund_head.refund_masive_conse = res.consecutive;
        this.bottoninsert = true;

        if ((res.data = true)) {
          swal("", "Se ha Creado correctamente el Reintegro", "success");
        }
      },
      error => {}
    );
  }

  update() {
    let detail_massive = {
      body: this.rowDatatable,
      head: this.masive_refund_head,
      user: this.user.identification,
      company: this.company
    };
    this.mamassive_refund.update(detail_massive).subscribe(
      res => {
        if (res.result == true) {
          swal("", "Se ha  Atualizado el Reintegro", "success");
        }
      },
      error => {}
    );
  }

  search_massive_refund() {
    let table = $("#search_massive").serializeObject();

    this.datatableservice
      .get_datatables(table, "refund/search_massive")
      .subscribe(
        response => {
          this.datos = response.search_massive;

          this.addRow_search(this.datos);
        },
        error => {
          console.log(error);
        }
      );
  }

  search_refoundmass(event) {
    let idrefund_masive = event.target.value;

    let params = {
      idrefund_masive: idrefund_masive,
      contract: this.contract,
      company: this.company
    };

    this.mamassive_refund.search_refouncmass(params).subscribe(
      res => {
        this.masive_refund_head = res.search;
        this.masive_refund_head.full_name =
          res.search.name + " " + res.search.last_name;
        this.masive_refund_head.refund_masive_conse =
          res.search.refund_masive_conse;

        this.rowDatatable = res.search_detail;
        this.bottonupdate = false;
      },
      error => {}
    );
  }

  jquery() {
    $(function() {
      $(document).on("keyup", ".item_actividad .refund", function(event) {
        let refund = Number(
          $(this)
            .parents(".item_actividad")
            .find(".refund")
            .val()
        );

        let despachos = Number(
          $(this)
            .parents(".item_actividad")
            .find(".despachos")
            .val()
        );

        let reintegros = Number(
          $(this)
            .parents(".item_actividad")
            .find(".reintegros")
            .val()
        );

        let result = despachos - reintegros;

        if (refund > result) {
          $(this)
            .parents(".item_actividad")
            .find(".refund")
            .val("");
        }
      });
    });
  }
}
