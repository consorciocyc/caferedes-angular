import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from "@angular/core";
import { ListService } from "../../services/list/list.service";
import { PermitsService } from "../../services/permisos/permits.service";
import { datatables } from "../../utilitis/datatables";
import { constantes } from "../../utilitis/constantes";
import { TravelService } from "../../services/travel/travel.service";
import swal from "sweetalert2";
import { Location } from "../../models/location-model";
import { GeocodeService } from "../../services/senhtml/geocode.service";
import proj4 from "proj4";
import { GoogleMapsAPIWrapper } from "@agm/core/services";
import { MouseEvent } from "@agm/core";
import { MapsAPILoader, AgmMap } from "@agm/core";
declare const google: any;


@Component({
  selector: "app-travel",
  templateUrl: "./travel.component.html",
  styleUrls: ["./travel.component.scss"],
  providers: [
    TravelService,
    ListService,
    PermitsService,
    datatables,
    GeocodeService,
    AgmMap
  ]
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
  public progratotal_hidden;

  //public map;
  public marker;
  public center;
  public firstProjection;
  public cordenadas;
  public cor = null;
  // google maps zoom level
  zoom: number = 6;
  geocoder: any;
  // initial center position for the map
  lat: number = 4.570868;
  lng: number = -74.2973328;
  address = "London";
  location: Location;
  loading: boolean;
  @ViewChild(AgmMap) map: AgmMap;
  public markers: marker[] = [];
  constructor(
    private ListService: ListService,
    private _PermitsService: PermitsService,
    private travelService: TravelService,
    private ref: ChangeDetectorRef,
    private geocodeService: GeocodeService,
    public mapsApiLoader: MapsAPILoader,
    public wrapper: GoogleMapsAPIWrapper
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

    this.center = { lat: 4.570868, lng: -74.2973328 };
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
    this.markers = [];
    if (this.tipe == 1 || 2) {
      let params = {
        date_re: this.date_rec,
        idemployee: this.idrecorredor
      };

      this.travelService.searchrecorredor(params).subscribe(
        result => {
          this.list_table = result.response;

          for (var e in this.list_table) {
            this.cordenadas = proj4(this.firstProjection).inverse([
              Number(this.list_table[e].x),
              Number(this.list_table[e].y)
            ]);
            if (this.list_table[e].worki_type_obr != 1) {
              if (this.list_table[e].x == null) {
                this.markers.push({
                  lat: this.list_table[e].lat,
                  lng: this.list_table[e].lng,
                  draggable: false,
                  label: this.list_table[e].Direccion,
                  consecutive: this.list_table[e].idworkI,
                  estado: "",
                  row: this.list_table[e]
                });
              } else {
                this.markers.push({
                  lat: this.cordenadas[1],
                  lng: this.cordenadas[0],
                  draggable: false,
                  label: this.list_table[e].Direccion,
                  consecutive: this.list_table[e].idworkI,
                  estado: "",
                  row: this.list_table[e]
                });
              }
            }
          }
          this.datatables.reInitDatatable1("#table_p");
        },
        error => {}
      );
    }

    if (this.tipe == 2) {
      let params = { company: this.company };

      this.travelService.searchporpragramar(params).subscribe(
        result => {
          this.list_table = result.response;

          for (var e in this.list_table) {
            this.cordenadas = proj4(this.firstProjection).inverse([
              Number(this.list_table[e].x),
              Number(this.list_table[e].y)
            ]);
            if (this.list_table[e].worki_type_obr != 1) {
              if (this.list_table[e].x == null) {
                this.markers.push({
                  lat: this.list_table[e].lat,
                  lng: this.list_table[e].lng,
                  draggable: false,
                  label: this.list_table[e].Direccion,
                  consecutive: this.list_table[e].idworkI,
                  estado: "",
                  row: this.list_table[e]
                });
              } else {
                this.markers.push({
                  lat: this.cordenadas[1],
                  lng: this.cordenadas[0],
                  draggable: false,
                  label: this.list_table[e].Direccion,
                  consecutive: this.list_table[e].idworkI,
                  estado: "",
                  row: this.list_table[e]
                });
              }
            }
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

    if (this.tipe == 3) {
      let params = {
        date_porp: this.date_porp,
        idemployee: this.idporprogramar,
        data: this.list_table,
        hoy: this.dia()
      };

      this.travelService.saveporprogramar_total(params).subscribe(
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
      this.recorre_hidden = false;
      this.progratotal_hidden = true;
      this.progra_hidden = true;
    }
    if (this.tipe == 2) {
      this.progra_hidden = false;
      this.recorre_hidden = true;
      this.progratotal_hidden = true;
    }

    if (this.tipe == 3) {
      this.progratotal_hidden = false;
      this.recorre_hidden = true;
      this.progra_hidden = false;
    }
  }

  porprogramarchange() {
    this.idporprogramar = this.porprogramar.idemployees;
  }

  clickedMarker(label: string, index: number) {
    this.markers[index].icon = "../../../assets/images/marcador.png";

    console.log(`clicked the marker: ${label || index}`);
    this.prueba(index, this.markers[index].row);
  }

  clickedMarke1(label: string, index: number) {
    this.markers[index].icon = "../../../assets/images/marcador.png";

    console.log(`clicked the marker: ${label || index}`);
  }

  prueba(i: number, row: any) {
    this.clickedMarke1(row, i);
    console.log(row);
    row.checkbox = true;
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  consecutive: any;
  icon?: string;
  draggable: boolean;
  estado: any;
  row: any;
}
