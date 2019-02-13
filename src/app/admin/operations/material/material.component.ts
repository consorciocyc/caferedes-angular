import { Component, OnInit, HostListener } from "@angular/core";
import { constantes } from "../../../utilitis/constantes";
import { Router, ActivatedRoute } from "@angular/router";
import { InternalService } from "../../../services/internal/internal.service";
import swal from "sweetalert2";
import { PermitsService } from "../../../services/permisos/permits.service";
import { OperacionService } from "../../../services/operacion/operacion.service";

@Component({
  selector: "app-material",
  templateUrl: "./material.component.html",
  styleUrls: ["./material.component.scss"],
  providers: [constantes, InternalService, OperacionService]
})
export class MaterialComponent implements OnInit {
  public table = [{}];
  public search_item;
  public company;
  public contract;
  public constantes: constantes;
  public url;
  public search_oti_name;
  public sub;
  public state;

  public id_oym;
  public user;
  public permisos;
  public Pmateriales;
  public stateitems;
  public search_codigo;
  public search_desc;

  constructor(
    private route: ActivatedRoute,
    private InternalService: InternalService,
    private router: Router,
    private PermitsService: PermitsService,
    private operacionService: OperacionService
  ) {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.search_codigo = this.url + "material/autocomplete?term=:keyword";
    this.search_desc = this.url + "material/autocompletedesc?term=:keyword";
    this.permisos = JSON.parse(localStorage.getItem("obr"));
  }

  ngOnInit() {
    this.state_list();

    this.route.queryParams.subscribe(params => {
      this.id_oym = params["queryParams"];
      if (this.id_oym != undefined) {
        this.search();
      } else {
      }
    });
  }

  add() {
    this.table.push({});
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

  state_list() {
    this.InternalService.state_items().subscribe(
      result => {
        this.stateitems = result.search;
      },
      error => {}
    );
  }

  valueChangedmate(index: number, row: any) {
    row.codigo = row.code.code;
    row.description = row.code.description;
    row.id_material = row.code.idmateriales;
    row.date = this.date();
    row.id_state = 1;
  }
  valueChangeddescri(index: number, row: any) {
    row.codigo = row.description.code;
    row.code = row.description.code;
    row.id_material = row.description.idmateriales;
    row.date = this.date();
    row.id_state = 1;
  }
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      let params = { id_oym: this.id_oym, data: this.table };

      this.operacionService.insert_mate(params).subscribe(
        result => {
          if (result.status == "ok") {
            this.table = result.response;
            swal("", "Items Guardados", "success");
          }
        },
        error => {}
      );
    }
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F4) {
      this.table.push({});
    }
  }

  delete(event) {
    let value = event.target.value;

    let params = { id: value, id_oym: this.id_oym };

    this.InternalService.delete_material(params).subscribe(
      result => {
        if (result.status == "ok") {
          this.table = result.response;
          swal("", "Items Eliminado", "success");
        }
      },
      error => {}
    );
  }

  search() {
    let params = { id_oym: this.id_oym };
    this.operacionService.searc_material(params).subscribe(
      result => {
        this.table = result.response;
      },
      error => {}
    );
  }

  canDeactivate(): Promise<boolean> | boolean {
    return window.confirm("Desea Salir Sin Guardar");
  }
}
