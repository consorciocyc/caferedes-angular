import { Component, OnInit, HostListener } from "@angular/core";
import { constantes } from "../../../utilitis/constantes";
import { Router, ActivatedRoute } from "@angular/router";
import { OperacionService } from "../../../services/operacion/operacion.service";
import swal from "sweetalert2";
import { PermitsService } from "../../../services/permisos/permits.service";
import { InternalService } from "../../../services/internal/internal.service";
@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"],
  providers: [constantes, OperacionService, InternalService]
})
export class ItemsComponent implements OnInit {
  public items_table = [];
  public search_item;
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
  public PItems;
  public Fecha_Svc;

  constructor(
    private route: ActivatedRoute,
    private operacionService: OperacionService,
    private InternalService: InternalService,
    private router: Router,
    private PermitsService: PermitsService
  ) {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();

    this.search_item =
      this.url +
      "items/autocompleoym?term=:keyword&company=" +
      this.company +
      "&contract=" +
      this.contract;

    this.search_oti_name =
      this.url +
      "items/autocomplenameoym?term=:keyword&company=" +
      this.company +
      "&contract=" +
      this.contract;
  }

  ngOnInit() {
    this.state_items();
    this.route.queryParams.subscribe(params => {
      this.id_oym = params["queryParams"];
      if (this.id_oym != undefined) {
        this.Fecha_Svc = this.search_idobr();
        this.search_items();
      } else {
      }
    });
  }

  search_idobr() {
    let params = { idobr: this.id_oym };
    this.operacionService.search_idobr(params).subscribe(
      result => {
        return (this.Fecha_Svc = result.response);
      },
      error => {}
    );
  }

  add_ite() {
    this.items_table.push({});
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

  valueChangedcode(index: number, row: any) {
    row.codigo = row.item_cobro_code.item_cobro_code;
    row.item_cobro_name = row.item_cobro_code.item_cobro_name;
    row.id_state = 1;
    row.date = this.Fecha_Svc;
    row.iditem_cobro = row.item_cobro_code.iditem_cobro;
  }

  valueChanged_name(index: number, row: any) {
    row.codigo = row.item_cobro_name.item_cobro_code;
    row.item_cobro_code = row.item_cobro_name.item_cobro_code;
    row.id_state = 1;
    row.date = this.Fecha_Svc;
    row.iditem_cobro = row.item_cobro_name.iditem_cobro;
  }

  state_items() {
    this.InternalService.state_items().subscribe(
      result => {
        this.stateitems = result.search;
      },
      error => {}
    );
  }

  search_items() {
    let params = { id_oym: this.id_oym };
    this.operacionService.search_items(params).subscribe(
      result => {
        this.items_table = result.response;
      },
      error => {}
    );
  }
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      let params = { data: this.items_table, id_oym: this.id_oym };
      this.operacionService.insert_items(params).subscribe(
        result => {
          if (result.status == "ok") {
            this.items_table = result.response;
            swal("", "Items Guardados", "success");
          }
        },
        error => {}
      );
    }
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F4) {
      this.items_table.push({});
    }
  }

  delete(event) {
    let id_item = event.target.value;
    let params = { iditem_cobro: id_item, id_oym: this.id_oym };

    this.operacionService.delete_items(params).subscribe(
      result => {
        if (result.status == "ok") {
          this.items_table = result.response;
          swal("", "Se ha Eliminado el Item", "success");
        }
      },
      error => {}
    );
  }

  canDeactivate(): Promise<boolean> | boolean {
    return window.confirm("Desea Salir Sin Guardar");
  }
}
