import { Component, OnInit, HostListener } from "@angular/core";
import { constantes } from "../../../utilitis/constantes";
import { Router, ActivatedRoute } from "@angular/router";
import { InternalService } from "../../../services/internal/internal.service";
import swal from "sweetalert2";
import { PermitsService } from "../../../services/permisos/permits.service";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.scss"],
  providers: [constantes, InternalService]
})
export class ActivitiesComponent implements OnInit {
  public table = [{}];
  public company;
  public contract;
  public constantes: constantes;
  public url;
  public search_oti_name;
  public sub;
  public stateitems;

  public id_obr;
  public user;
  public permisos;
  public Pactividades;
  public search_activity;
  public searc_employee;
  public list_state_activity;
  public Fecha_Svc;

  constructor(
    private route: ActivatedRoute,
    private InternalService: InternalService,
    private router: Router,
    private PermitsService: PermitsService
  ) {
    this.constantes = new constantes();
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.url = this.constantes.getRouter();
    this.search_activity =
      this.url +
      "activities/autocomple?term=:keyword&type=1&contract=" +
      this.contract;

    this.searc_employee = this.url + "employee/searc_employee?term=:keyword";
  }

  ngOnInit() {
    this.permisos = JSON.parse(localStorage.getItem("obr"));
    this.Pactividades = this.permisos.actividades;
    this.state_activity();

    this.route.queryParams.subscribe(params => {
      this.id_obr = params["queryParams"];
      if (this.id_obr != undefined) {
        this.Fecha_Svc = this.search_idobr();
        this.search();
      } else {
      }
    });
  }

  spermits() {
    if (!this.permisos) {
      this.permisos = JSON.parse(localStorage.getItem("obr"));
      this.Pactividades = this.permisos.actividades;
    }
  }
  date() {
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
  employe(index: number, row: any) {
    row.idemployee = row.employee.idemployees;
    row.gangs_name = row.employee.gangs_name;

    row.id_state = 1;
    row.acti_date = this.Fecha_Svc;
  }

  activitychange(index: number, row: any) {
    row.idactivity = row.activity.idactivities;
    row.value = row.activity.activities_value;
    row.total = 0;
  }

  add() {
    this.table.push({});
  }

  state_activity() {
    this.InternalService.state_activity().subscribe(
      result => {
        this.list_state_activity = result.response;
      },
      error => {}
    );
  }

  search_idobr() {
    let params = { idobr: this.id_obr };
    this.InternalService.search_idobr(params).subscribe(
      result => {
        return (this.Fecha_Svc = result.response);
      },
      error => {}
    );
  }
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      this.spermits();
      if (this.Pactividades != 1) {
        swal("", "No cuenta Con Permisos", "error");

        return;
      }
      let params = { data: this.table, id_obr: this.id_obr };
      this.InternalService.save_activitys(params).subscribe(
        result => {
          if (result.status == "ok") {
            this.table = result.response;
            swal("", "Activida Guardada", "success");
          }
        },
        error => {}
      );
    }
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F4) {
      this.table.push({});
    }
  }

  search() {
    let params = { id_obr: this.id_obr };
    this.InternalService.search_activitys(params).subscribe(
      result => {
        this.table = result.response;
      },
      error => {}
    );
  }

  delete(event) {
    this.spermits();
    if (this.Pactividades != 1) {
      swal("", "No cuenta Con Permisos", "error");

      return;
    }
    let value = event.target.value;
    let params = { id_obr: this.id_obr, idactivity_internas: value };

    this.InternalService.delete_activitys(params).subscribe(
      result => {
        if (result.status == "ok") {
          this.table = result.response;
          swal("", "Activida Eliminada", "success");
        }
      },
      error => {}
    );
  }

  canDeactivate(): Promise<boolean> | boolean {
    return window.confirm("Desea Salir Sin Guardar");
  }

  operacion(index: number, row: any) {
    row.total = Number(row.quantity * row.value);
  }
}
