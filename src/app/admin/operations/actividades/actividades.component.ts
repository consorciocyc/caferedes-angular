import { Component, OnInit, HostListener } from "@angular/core";
import swal from "sweetalert2";
import { constantes } from "../../../utilitis/constantes";
import { Router, ActivatedRoute } from "@angular/router";
import { InternalService } from "../../../services/internal/internal.service";
import { OperacionService } from "../../../services/operacion/operacion.service";

@Component({
  selector: "app-actividades",
  templateUrl: "./actividades.component.html",
  styleUrls: ["./actividades.component.scss"],
  providers: [constantes, InternalService, OperacionService]
})
export class ActividadesComponent implements OnInit {
  public table = [{}];
  public company;
  public contract;
  public constantes: constantes;
  public url;
  public search_oti_name;
  public sub;
  public stateitems;

  public id_oym;
  public user;
  public permisos;
  public Pactividades;
  public search_activity;
  public searc_employee;
  public list_state_activity;
  public f_Hace_1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private InternalService: InternalService,
    private OperacionService: OperacionService
  ) {
    this.constantes = new constantes();
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.url = this.constantes.getRouter();
    this.search_activity =
      this.url +
      "activities/autocomple?term=:keyword&type=3&contract=" +
      this.contract;

    this.searc_employee = this.url + "employee/searc_employee?term=:keyword";
  }

  ngOnInit() {
    this.state_activity();
    this.route.queryParams.subscribe(params => {
      this.id_oym = params["queryParams"];

      if (this.id_oym != undefined) {
        this.search();
        this.search_oym();
      } else {
      }
    });
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
    row.acti_date = this.f_Hace_1;
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

  search_oym() {
    let params = { id_oym: this.id_oym };
    this.OperacionService.search_oym(params).subscribe(
      result => {
        this.f_Hace_1 = result.response.f_Hace_1;
      },
      error => {}
    );
  }
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      let params = { data: this.table, id_oym: this.id_oym };
      this.OperacionService.save_activitys(params).subscribe(
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
    let params = { id_oym: this.id_oym };
    this.OperacionService.search_activitys(params).subscribe(
      result => {
        this.table = result.response;
      },
      error => {}
    );
  }

  delete(event) {
    let value = event.target.value;
    let params = { id_oym: this.id_oym, idactivity_oym: value };

    this.OperacionService.delet_activitys(params).subscribe(
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
