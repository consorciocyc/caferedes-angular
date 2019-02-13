import { Component, OnInit, HostListener } from "@angular/core";
import { constantes } from "../../../utilitis/constantes";
import { Router, ActivatedRoute } from "@angular/router";
import { InternalService } from "../../../services/internal/internal.service";
import swal from "sweetalert2";
import { PermitsService } from "../../../services/permisos/permits.service";

@Component({
  selector: "app-materials",
  templateUrl: "./materials.component.html",
  styleUrls: ["./materials.component.scss"],
  providers: [constantes, InternalService]
})
export class MaterialsComponent implements OnInit {
  public table = [{}];
  public search_item;
  public company;
  public contract;
  public constantes: constantes;
  public url;
  public search_oti_name;
  public sub;
  public state;

  public id_obr;
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
    private PermitsService: PermitsService
  ) {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.search_codigo = this.url + "material/autocomplete?term=:keyword";
    this.search_desc = this.url + "material/autocompletedesc?term=:keyword";
    this.permisos = JSON.parse(localStorage.getItem("obr"));
    this.Pmateriales = this.permisos.materiales;
  }

  ngOnInit() {
    this.state_list();

    this.route.queryParams.subscribe(params => {
      this.id_obr = params["queryParams"];
      if (this.id_obr != undefined) {
        console.log("si");
        this.search();
      } else {
        console.log("no");
      }
    });
  }
  spermits() {
    if (!this.permisos) {
      this.permisos = JSON.parse(localStorage.getItem("obr"));
      this.Pmateriales = this.permisos.materiales;
    }
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
    console.log(row);
    row.codigo = row.code.code;
    row.description = row.code.description;
    row.id_material = row.code.idmateriales;
    row.date = this.date();
    row.id_state = 1;
  }
  valueChangeddescri(index: number, row: any) {
    console.log(row);
    row.codigo = row.description.code;
    row.code = row.description.code;
    row.id_material = row.description.idmateriales;
    row.date = this.date();
    row.id_state = 1;
  }
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      this.spermits();
      if (this.Pmateriales != 1) {
        swal("", "No cuenta Con Permisos", "error");

        return;
      }

      let params = { id_obr: this.id_obr, data: this.table };

      this.InternalService.insert_mate(params).subscribe(
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

    let params = { id: value, d_obr: this.id_obr };

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
    let params = { id_obr: this.id_obr };
    this.InternalService.searc_material(params).subscribe(
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
