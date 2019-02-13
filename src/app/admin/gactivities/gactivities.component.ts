import { Component, OnInit } from "@angular/core";
import { constantes } from "../../utilitis/constantes";
import { PermitsService } from "../../services/permisos/permits.service";
import { ListService } from "../../services/list/list.service";
import swal from "sweetalert2";
import { Activities } from "../../models/activities_model";
import { ActivitisService } from "../../services/activities/activities.service";
import { datatables } from "../../utilitis/datatables";

@Component({
  selector: "app-gactivities",
  templateUrl: "./gactivities.component.html",
  styleUrls: ["./gactivities.component.scss"],
  providers: [ListService, PermitsService, ActivitisService]
})
export class GactivitiesComponent implements OnInit {
  public activities: Activities;
  public tableactivities;
  public state_list;
  public typeobr;
  public contract;
  public company;
  public btn_insert;
  public search_type;
  public btn_serach;
  public search_typ;
  public constantes;
  public url;
  public datatables;
  constructor(
    private PermitsService: PermitsService,
    private ListService: ListService,
    private activitisService: ActivitisService
  ) {
    this.activities = new Activities();
    this.constantes = new constantes();
    this.datatables = new datatables();
  }

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.state();
    this.type_obr();
  }

  state() {
    this.ListService.state().subscribe(
      result => {
        this.state_list = result.states;
      },
      error => {}
    );
  }
  type_obr() {
    this.ListService.tipo_item(1).subscribe(
      result => {
        this.typeobr = result.type_item;
        this.search_type = result.type_item;
      },
      error => {}
    );
  }

  Onsave() {
    let params = { data: this.activities, idcontract: this.contract };
    this.activitisService.insert(params).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_activitis();
          swal("", "Se Ha Guardado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  search_activitis() {
    let params = { contrac: this.contract, type: this.search_typ };
    this.activitisService.search(params).subscribe(
      result => {
        this.tableactivities = result.response;
        this.datatables.reInitDatatable("#table");
      },
      error => {}
    );
  }

  enviar(index: number, row: any) {
    this.activitisService.update(row).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_activitis();
          swal("", "Se Ha Atualizado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  delete(index: number, row: any) {
    this.activitisService.delete(row).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_activitis();
          swal("", "Se Ha Eliminado Correctamente", "success");
        }
      },
      error => {}
    );
  }
}
