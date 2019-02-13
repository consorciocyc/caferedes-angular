import { Component, OnInit, HostListener } from "@angular/core";
import { ListService } from "../../services/list/list.service";
import { PermitsService } from "../../services/permisos/permits.service";
import { datatables } from "../../utilitis/datatables";
import { constantes } from "../../utilitis/constantes";
import { TravelService } from "../../services/travel/travel.service";
import swal from "sweetalert2";
declare const google: any;
import proj4 from "proj4";
declare var ol: any;

@Component({
  selector: "app-travel",
  templateUrl: "./travel.component.html",
  styleUrls: ["./travel.component.scss"],
  providers: [TravelService, ListService, PermitsService, datatables]
})
export class TravelComponent implements OnInit {
  public constantes: constantes;
  public datatables;
  public substate;
  public progra_hidden = true;
  public recorre_hidden = false;
  public tipe;
  public date_rec;
  public idrecorredor;
  public Searchemployee;
  public url;
  public recorredor;
  public list_table = [];
  public company;
  public date_porp;
  public porprogramar;
  public idporprogramar;

  public map;
  public marker;
  public center;
  public firstProjection;
  public cordenadas;
  public cor = null;

  constructor(
    private ListService: ListService,
    private _PermitsService: PermitsService,
    private travelService: TravelService
  ) {
    this.constantes = new constantes();
    this.datatables = new datatables();
    this.firstProjection =
      'PROJCS["MAGNA-SIRGAS / Colombia Bogota zone",GEOGCS["MAGNA-SIRGAS",DATUM["Marco_Geocentrico_Nacional_de_Referencia",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6686"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4686"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",4.596200416666666],PARAMETER["central_meridian",-74.07750791666666],PARAMETER["scale_factor",1],PARAMETER["false_easting",1000000],PARAMETER["false_northing",1000000],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","3116"]]';
  }

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.url = this.constantes.getRouter();
    this.Searchemployee = this.url + "employee/searc_employee?term=:keyword";
    this.sub_state();

    this.center = { lat: 6.2922634763, lng: -75.543858111800006 };
  }

  sub_state() {
    this.travelService.sub_state().subscribe(
      result => {
        this.substate = result.sub_state;
      },
      error => {}
    );
  }

  /*PRESIONAR LA TECLA F2 PARA CONSULAR*/
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
    }
  }

  recorredorchange() {
    this.idrecorredor = this.recorredor.idemployees;
  }

  checkAll(ev) {
    this.list_table.forEach(x => (x.checkbox = ev.target.checked));
  }

  isAllChecked() {
    return this.list_table.every(_ => _.checkbox);
  }

  search() {
    if (this.tipe == 1) {
      let params = {
        date_re: this.date_rec,
        idemployee: this.idrecorredor
      };
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.center,
        zoom: 11
      });
      this.travelService.searchrecorredor(params).subscribe(
        result => {
          this.list_table = result.response;

          for (var e in this.list_table) {
            this.cordenadas = proj4(this.firstProjection).inverse([
              Number(this.list_table[e].x),
              Number(this.list_table[e].y)
            ]);

            this.cor = {
              lat: this.cordenadas[1],
              lng: this.cordenadas[0]
            };

            this.marker = new google.maps.Marker({
              position: this.cor,
              map: this.map,
              title:
                this.list_table[e].Direccion +
                " " +
                this.list_table[e].consecutive
            });
          }

          this.datatables.reInitDatatable1("#table_p");
        },
        error => {}
      );
    }

    if (this.tipe == 2) {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: this.center,
        zoom: 11
      });
      let params = { company: this.company };

      this.travelService.searchporpragramar(params).subscribe(
        result => {
          this.list_table = result.response;

          for (var e in this.list_table) {
            this.cordenadas = proj4(this.firstProjection).inverse([
              Number(this.list_table[e].x),
              Number(this.list_table[e].y)
            ]);

            this.cor = {
              lat: this.cordenadas[1],
              lng: this.cordenadas[0]
            };

            this.marker = new google.maps.Marker({
              position: this.cor,
              map: this.map,
              title:
                this.list_table[e].Direccion +
                " " +
                this.list_table[e].consecutive
            });
          }
          this.datatables.reInitDatatable1("#table_p");
        },
        error => {}
      );
    }
  }
  dia() {
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
  save() {
    if (this.tipe == 1) {
      let params = {
        date_re: this.date_rec,
        idemployee: this.idrecorredor,
        data: this.list_table,
        hoy: this.dia()
      };
      this.travelService.saverecorredor(params).subscribe(
        result => {
          if (result.response == true) {
            swal("", "Se Programado El Recorrido", "success");
          }
        },
        error => {}
      );
    }

    if (this.tipe == 2) {
      let params = {
        date_porp: this.date_porp,
        idemployee: this.idporprogramar,
        data: this.list_table,
        hoy: this.dia()
      };

      this.travelService.saveporprogramar(params).subscribe(
        result => {
          if (result.response == true) {
            swal("", "Se Programado ", "success");
          }
        },
        error => {}
      );
    }
  }

  chnage() {
    if (this.tipe == 1) {
      this.progra_hidden = true;
      this.recorre_hidden = false;
    }
    if (this.tipe == 2) {
      this.recorre_hidden = true;
      this.progra_hidden = false;
    }
  }

  porprogramarchange() {
    this.idporprogramar = this.porprogramar.idemployees;
  }
}
