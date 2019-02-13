import { Component, OnInit, ɵConsole, ChangeDetectorRef } from "@angular/core";
import { SendhtmlService } from "../../services/senhtml/sendhtml.service";
import { datatables } from "../../utilitis/datatables";
import { NgModel } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { Location } from "../../models/location-model";
import { GeocodeService } from "../../services/senhtml/geocode.service";
import { AgmMap } from "@agm/core";
import { m } from "@angular/core/src/render3";

@Component({
  selector: "app-importhtml",
  templateUrl: "./importhtml.component.html",
  styleUrls: ["./importhtml.component.scss"],
  providers: [SendhtmlService, GeocodeService, AgmMap]
})
export class ImporthtmlComponent implements OnInit {
  public hidden = true;
  public result = [];
  public datatables;
  public loader = true;
  public progress;
  public company;
  public contract;
  public empresa;
  public contrato;
  private geocoder: any;
  public stopCondition: boolean = false;
  public available;
  public loadersave = true;
  public location1;
  address = "London";
  location: Location;
  loading: boolean;
  public data;
  public btn_save = false;

  public file;
  constructor(
    private SendhtmlService: SendhtmlService,
    private ref: ChangeDetectorRef,
    private geocodeService: GeocodeService
  ) {
    this.datatables = new datatables();
  }

  ngOnInit() {
    this.showLocation();
    //this.addressToCoordinates(this.address);
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");
  }

  delay(item) {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async processArray(result) {
    this.loader = false;
    let array = [];
    let redondo = 0;

    let number = 100 / result.length;

    for (const valor of result) {

      let direccion1 = valor["direccion"].split("-");

      let municipio = valor["localidad"].split("(");

      let direci = direccion1[0].trim();
      var CK = direci.replace("KR", "Cra");
      var CL = CK.replace("CL", "Calle");

      var OESTE = CL.replace("OESTE", "Oeste");
      var NORTE = OESTE.replace("NORTE", "Norte");

      let patron = / /g;
      var direccion21 = NORTE.replace(patron, "");

      let direccion12 = direccion21.split("CASA");
      let direccion_1 = direccion12[0].replace("AV", " Avenida ");
      let direccion_2 = direccion_1.replace("Oeste", " Oeste ");
      let direccion_3 = direccion_2.replace("Calle", " Calle ");
      let direccion_4 = direccion_3.replace("Norte", " Norte ");
      let direccion_5 = direccion_4.replace("NORTE", " Norte ");
      let direccion_6 = direccion_5.replace("BIS", " Bis ");
      let direccion_7 = direccion_6.replace("Cra", " Cra ");
      let direccion_8 = direccion_7.replace("DIG", " Diagonal ");
      let direccion_9 = direccion_8.replace("TV", " Transversal ");
      let direccion_10 = direccion_9.replace("DG", " Diagonal ");
      let direccion_11 = direccion_10.replace("MZ", "");
      let direccion_12 = direccion_11.replace("OESTE", " Oeste ");
      let patron2 = /  /g;
      var direccion22 = direccion_12.replace(patron2, " ");

      let direccion_13 = direccion22.trim();

      let dir = direccion_13.split(" ");

      let direccion_full;
      let dire;
      let dire2;
      if (dir.length == 4) {

        dire = this.separador(dir[1]);
        dire2 = this.separador(dir[3]);

        direccion_full = dir[0] + " " + dire + " " + dir[2] + " " + dire2;
      }

      if (dir.length == 5) {

        dire = this.separador(dir[1]);
        dire2 = this.separador(dir[3]);

        if (dire2 == undefined) {
          dire2 = dir[3];
  
        }

        direccion_full =
          dir[0] + " " + dire + " " + dir[2] + " " + dire2 + " " + dir[4];
        direccion_full = direccion_full.replace("Call e", "Calle");
       
      }

      if (dir.length == 6) {
      
        //console.log(direccion_10);
        dire = this.separador(dir[1]);
        dire2 = this.separador(dir[4]);
        direccion_full =
          dir[0] +
          " " +
          dire +
          " " +
          dir[2] +
          " " +
          dir[3] +
          " " +
          dire2 +
          " " +
          dir[5];
        //console.log(direccion_full);
      }

      if (dir.length >= 7) {
  
        dire = this.separador(dir[1]);

        direccion_full =
          dir[0] +
          " " +
          dire +
          " " +
          dir[2] +
          " " +
          dir[3] +
          " " +
          dir[4] +
          " " +
          dir[5] +
          " " +
          dir[6];
      }
      //this.address = ;

      // this.addressToCoordinates(direccion_full, valor["localidad"]);

      let adress_full = direccion_full + ", " + municipio[0] +','+valor["departamento"];
      this.geocodeService
        .geocodeAddress(adress_full)
        .subscribe((location: Location) => {
          this.location1 = location;
          this.loading = false;
          this.ref.detectChanges();
        });

      //<<<---    using ()=> syntax
      redondo += number;
      this.available = Math.round(redondo);

      await this.delay(valor);

      let data = {
        barrio: valor["barrio"],
        categoria: valor["categoria"],
        cedula: valor["cedula"],
        departamento: valor["departamento"],
        direccion: valor["direccion"],
        estado: valor["estado"],
        estrato: valor["estrato"],
        fechaasig: valor["fechaasig"],
        fechasolici: valor["fechasolici"],
        localidad: valor["localidad"],
        ncontrato: valor["ncontrato"],
        nlocalidad: valor["nlocalidad"],
        ntipotrabajo: valor["ntipotrabajo"],
        numeroor: valor["numeroor"],
        numerosolic: valor["numerosolic"],
        obsr: valor["obsr"],
        residencial: valor["residencial"],
        sector: valor["sector"],
        suscrip: valor["suscrip"],
        telefono: valor["telefono"],
        tinmueble: valor["tinmueble"],
        tipoinst: valor["tipoinst"],
        tipotrabajo: valor["tipotrabajo"],
        unidad_operativa: valor["unidad_operativa"],
        vendedor: valor["vendedor"],
        promo: valor["promo"],
        puntos: valor["puntos"],
        direccion_full: this.location1
      };

      array.push(data);
    }
    this.data = array;
    this.loader = true;

    console.log("Done!");
  }

  onFileChange(event) {
    this.loadersave = false;
    this.result = [];
    let archivo: any = event.target.files[0];
    let form = new FormData();
    form.append("file", archivo);
    this.SendhtmlService.insert(form).subscribe(
      result => {
        for (var valor of result) {
          //console.log(valor['direccion']);
        }
        this.loadersave = true;
        this.processArray(result);
        this.result = result;

        this.datatables.reInitDatatable4("#example");
      },
      error => {}
    );
  }

  showLocation() {
    this.addressToCoordinates("poblado", "medellin");
  }

  addressToCoordinates(adrees: any, localidad) {
    this.loading = true;

    let adress_full = adrees + ", " + localidad;
    this.geocodeService
      .geocodeAddress(adress_full)
      .subscribe((location: Location) => {
        this.location = location;
        this.loading = false;
        this.ref.detectChanges();
      });
  }

  separador(numero) {
    let prueba = numero.split("");
    let resultado;

    if (prueba.length == 1) {
      resultado = prueba[0];
    }

    if (prueba.length == 2) {
      resultado = prueba[0] + prueba[1];
    }

    if (prueba.length == 3) {
      if (!/^([0-9])*$/.test(prueba[1])) {
        resultado = prueba[0] + prueba[1] + " " + prueba[2];
      } else {
        resultado = prueba[0] + prueba[1] + prueba[2];
      }
    }

    if (prueba.length == 4) {
      if (!/^([0-9])*$/.test(prueba[2])) {
        resultado = prueba[0] + prueba[1] + prueba[2] + " " + prueba[3];
      } else {
        resultado = prueba[0] + prueba[1] + prueba[2] + prueba[3];
      }
    }

    if (prueba.length == 5) {
      if (!/^([0-9])*$/.test(prueba[3])) {
        //console.log(prueba[3])
        resultado =
          prueba[0] + prueba[1] + prueba[2] + prueba[3] + " " + prueba[4];
      } else {
        resultado = prueba[0] + prueba[1] + prueba[2] + prueba[3] + prueba[4];
      }
      console.log(resultado);
    }

    return resultado;
  }
  save() {
    this.loadersave = false;
    let data = {
      data: this.data,
      contract: this.contract,
      company: this.company
    };

    this.SendhtmlService.save(data).subscribe(
      result => {
        if (result.status == "ok") {
          this.loadersave = true;
          this.btn_save = true;
        }
      },
      error => {}
    );
  }
}
