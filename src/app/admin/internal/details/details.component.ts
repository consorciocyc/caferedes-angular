import { Component, OnInit, HostListener } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { InternalModel } from "../../../models/internal.model";
import { InternalService } from "../../../services/internal/internal.service";
import { InternalDac } from "../../../models/internal.model";
import { OT } from "../../../models/internal.model";
import { constantes } from "../../../utilitis/constantes";
import { PermitsService } from "../../../services/permisos/permits.service";

import { DatatablesService } from "../../../services/datatables/datatables.service";
import { datatables } from "../../../utilitis/datatables";
import { ContractService } from "../../../services/contract.service";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
declare const google: any;
import proj4 from "proj4";
declare var ol: any;
import swal from "sweetalert2";
import Tesseract from "tesseract.js";
declare let PDFJS: any;
import { filter, catchError, tap, map, switchMap } from "rxjs/operators";
import "rxjs/add/operator/filter";
@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
  styles: [
    `
      gallery {
        height: 500px; // The gallery must have a height
      }
    `
  ],
  providers: [
    InternalService,
    constantes,
    PermitsService,
    DatatablesService,
    datatables
  ]
})
export class DetailsComponent implements OnInit {
  public idwork;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public internalmodel = new InternalModel();
  public internaldac = new InternalDac();
  public ot = new OT();
  public TAnillo;
  public Templame;
  public acces;
  public permisoruptura;
  public EstadoAcometida;
  public constantes: constantes;
  public Searchemployee;
  public idemployees;
  public municipaly;
  public consecutivo;
  public name_item;
  public id_itemapli;
  public input_image;
  public imageData;

  public clasificacion;
  public clasificacion_dac;
  public image_upload = [];
  public motv;
  public motivo_dac;
  public date_dac;
  public obs_dac;
  public btninsert;
  public btnupdate = true;

  totalPages: number;
  pageNumber: number = 1;

  pdf: any;
  public company;
  public company_name;
  public contract_name;
  public contract;
  public rowdac = [];
  public rowot = [];
  public user;
  public permit_obr;
  public permisos;

  public type_obr;
  public Pinsert;
  public Pupdate;
  public Pdelete;

  public Pactividades;
  public Peventos;
  public Pitems;
  public Pmateriales;
  public Pprogramacion;
  public subtipo;
  public disabled;
  public substate;
  public estado;
  public histo;
  public items_aplic;
  public insert_name_item;
  public otitems;
  public nameot;
  public medidor;
  public url;
  public url_image;
  public view_pdf = [];
  public guard = 0;
  public cordenadas;
  public firstProjection;
  public loader = true;
  title = "app";

  public map;
  public marker;
  public center;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private InternalService: InternalService,
    private PermitsService: PermitsService,
    private datatableservice: DatatablesService,
    private datatables: datatables,
    public parametros: ContractService
  ) {
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.url_image = this.constantes.getimage();
    this.Searchemployee = this.url + "employee/searc_employee?term=:keyword";
  }

  ngOnInit() {
    this.firstProjection =
      'PROJCS["MAGNA-SIRGAS / Colombia Bogota zone",GEOGCS["MAGNA-SIRGAS",DATUM["Marco_Geocentrico_Nacional_de_Referencia",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6686"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4686"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",4.596200416666666],PARAMETER["central_meridian",-74.07750791666666],PARAMETER["scale_factor",1],PARAMETER["false_easting",1000000],PARAMETER["false_northing",1000000],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","3116"]]';

    this.galleryOptions = [
      {
        width: "600px",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [];

    this.user = JSON.parse(localStorage.getItem("user"));
    this.permist_obr();
    this.tipo_obr();
    this.state();
    this.get_permits();

    this.company = localStorage.getItem("company");
    this.company_name = localStorage.getItem("company_name");
    this.contract_name = localStorage.getItem("contract_name");
    this.contract = localStorage.getItem("contract");
    this.medidor =
      this.url + "series/search_series?term=:keyword&contrac=" + this.contract;
    this.route.queryParams.subscribe(params => {
      this.idwork = params["queryParams"];

      if (this.idwork != undefined) {
        this.guard = 1;
        this.searchobr(this.idwork);
      }
    });

    this.center = { lat: 4.0000000, lng: -72.0000000 };
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: this.center,
      zoom: 11
    });
  }

  spermits() {
    if (!this.permisos) {
      this.permisos = JSON.parse(localStorage.getItem("internas"));

      this.Pinsert = this.permisos.insert;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
    }

    if (!this.permit_obr) {
      this.permit_obr = JSON.parse(localStorage.getItem("obr"));

      this.Peventos = this.permit_obr.eventos;
      this.Pitems = this.permit_obr.items;
      this.Pmateriales = this.permit_obr.materiales;
      this.Pprogramacion = this.permit_obr.programacion;
    }
  }

  get_permits() {
    this.PermitsService.getPermits(31, "internas");
  }

  permist_obr() {
    let params = { user: this.user.identification };
    this.PermitsService.permits_obr(params);
    this.PermitsService.getPermits(
      this.constantes.SUBMENUS.Obras_Internas,
      "internas"
    );
  }
  tipo_obr() {
    this.InternalService.tipo_obr().subscribe(
      result => {
        this.type_obr = result.tipos_obr_internas;
      },
      error => {}
    );
  }

  state() {
    this.InternalService.state().subscribe(
      result => {
        this.estado = result.state_obr;
      },
      error => {}
    );
  }

  valuemedidor() {
    if (this.internalmodel.Serie_Medidor == "") {
      this.internalmodel.serie_marca = "";
      this.internalmodel.serie_id = "";
      return;
    }
    if (this.internalmodel.Tipo_medidor == 1) {
      return;
    }
    let params = { serie: this.internalmodel.Serie_Medidor };

    this.InternalService.serie_medidor(params).subscribe(
      result => {
        if (result.search == null) {
          swal("", "El Medidor No Existe", "error");
          this.internalmodel.serie_marca = "";
          this.internalmodel.Serie_Medidor = "";
          this.internalmodel.serie_id = "";
          return;
        }

        if (result.search.serie_estado == 3) {
          swal("", "El Medidor ya Esta Instalado", "error");
          this.internalmodel.serie_marca = "";
          this.internalmodel.Serie_Medidor = "";
          return true;
        }
        this.internalmodel.serie_marca = result.search.serie_marca;
        this.internalmodel.Serie_Medidor = result.search.serie_nro_serie;
        this.internalmodel.serie_id = result.search.idseries;
      },
      error => {}
    );
  }
  searchobr(param) {
    this.loader = false;
    this.subtipo_obr_internas();
    this.sub_state();
    let params = { idwork: param };

    this.InternalService.searchobr(params).subscribe(
      result => {
        this.internalmodel = result.result;
        this.rowot = result.ot;
        this.guard = 0;
        let param = {
          consecutive: this.internalmodel.consecutive,
          company: this.internalmodel.id_company,
          queryParams: this.internalmodel.idworkI
        };
        this.parametros.addObri(param);
        if (this.contract != this.internalmodel.idcontrato) {
          this.parametros.addCrib(this.internalmodel.idcontrato);
        }

        let dia = this.dia();
        var f1 = this.internalmodel.Atualizacion;
        var f2 = this.dia();

        var aFecha1 = f1.split("-");
        var aFecha2 = f2.split("-");

        var fFecha1 = Date.UTC(aFecha1[0], aFecha1[1] - 1, aFecha1[2]);
        var fFecha2 = Date.UTC(aFecha2[0], aFecha2[1] - 1, aFecha2[2]);

        var dif = fFecha2 - fFecha1;
        var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        this.internalmodel.ans = dias;

        this.cordenadas = proj4(this.firstProjection).inverse([
          Number(this.internalmodel.x),
          Number(this.internalmodel.y)
        ]);
        let cor;

        if (this.internalmodel.x == null) {
          cor = {
            lat: this.internalmodel.lat,
            lng: this.internalmodel.lng
          };
          this.map = new google.maps.Map(document.getElementById("map"), {
            center: cor,
            zoom: 11
          });
        } else {
          cor = {
            lat: this.cordenadas[1],
            lng: this.cordenadas[0]
          };
        }

        this.marker = new google.maps.Marker({
          position: cor,
          map: this.map,
          title: this.internalmodel.Direccion
        });
        this.loader = true;
      },
      error => {}
    );
  }

  subtipo_obr_internas() {
    this.InternalService.subtipo_obr_internas().subscribe(
      result => {
        this.subtipo = result.subtipo_obr_internas;
      },
      error => {}
    );
  }
  sub_state() {
    this.InternalService.sub_state().subscribe(
      result => {
        this.substate = result.sub_state;
      },
      error => {}
    );
  }

  fsubstate(index: number, newrow: any) {
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

    newrow.fstate = hoy;
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

  change_stat() {}

  Tipo_Anillo() {
    this.InternalService.Tipo_Anillo().subscribe(
      result => {
        this.TAnillo = result.Tipo_Anillo;
      },
      error => {}
    );
  }
  Tipo_Empalme() {
    this.InternalService.Tipo_Empalme().subscribe(
      result => {
        this.Templame = result.Tipo_Empalme;
      },
      error => {}
    );
  }
  Accesorio() {
    this.InternalService.Accesorio().subscribe(
      result => {
        this.acces = result.accesorio;
      },
      error => {}
    );
  }
  Permiso_Ruptura() {
    this.InternalService.Permiso_Ruptura().subscribe(
      result => {
        this.permisoruptura = result.permiso_ruptura;
      },
      error => {}
    );
  }
  Estado_Acometida() {
    this.InternalService.Estado_Acometida().subscribe(
      result => {
        this.EstadoAcometida = result.estado_acometida;
      },
      error => {}
    );
  }

  /*PRESIONAR LA TECLA F2 PARA CONSULAR*/
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      if (this.internalmodel.nameprogramado == "") {
        this.internalmodel.programado_A = "";
      }
      if (this.internalmodel.nameAprueba == "") {
        this.internalmodel.Aprueba = "";
      }
      if (this.internalmodel.nameHace_1 == "") {
        this.internalmodel.Hace_1 = "";
      }
      if (this.internalmodel.nameHace_1 == "") {
        this.internalmodel.Hace_1 = "";
      }
      if (this.internalmodel.nameHace_2 == "") {
        this.internalmodel.Hace_2 = "";
      }
      if (this.internalmodel.nameHace_3 == "") {
        this.internalmodel.Hace_3 = "";
      }
      if (this.internalmodel.nameVerifica == "") {
        this.internalmodel.Verifica = "";
      }
      if (this.internalmodel.nameVerifica == "") {
        this.internalmodel.Verifica = "";
      }
      if (this.internalmodel.namePlanea == "") {
        this.internalmodel.Planea = "";
      }

      let state = this.internalmodel.worki_state;

      this.spermits();
      if (this.Pupdate != 1) {
        swal("", "No cuenta Con Permisos", "error");

        return;
      }
      let params = { data: this.internalmodel, user: this.user.identification };
      this.InternalService.update(params).subscribe(
        result => {
          if (this.Pprogramacion != 1) {
          } else {
          }

          if (result.state == true) {
            this.internalmodel.worki_state_ant = this.internalmodel.worki_state;
            swal("", "Se Ha Atualizado Correctamente", "success");
          } else {
            swal("", "Error Comuniquese A Sistemas", "error");
          }
        },
        error => {}
      );
    }
  }

  searchobri(index: number, newrow: any) {

    let params = newrow.idworkI;
    this.router.navigate(["/admin/internas/detalles"], {
      queryParams: { queryParams: params}
    });
   // [queryParams]="{queryParams: queryParams}"
    //(this.queryParam = this.pedido), (this.valor = "pedido");

    //this.searchobr(newrow.idworkI);
  }

  search_itemsapli(index: number, newrow: any) {
    this.name_item = newrow.items_name;
    this.id_itemapli = newrow.iditems_aplicables;

    let params = {
      consec: this.internalmodel.consecutive,
      company: this.company
    };
    this.InternalService.search_itemsapli(params).subscribe(
      result => {
        this.items_aplic = result.response;
      },
      error => {}
    );
  }

  itemsaplic(index: number, newrow: any) {
    this.nameot = newrow.OT;
    this.otitems = newrow.idOT;

    let params = { idOT: this.otitems };
    this.InternalService.item_ap(params).subscribe(
      result => {
        this.items_aplic = result.response;
      },
      error => {}
    );
  }

  search_items() {
    let params = { idOT: this.otitems };
    this.InternalService.item_ap(params).subscribe(
      result => {
        this.items_aplic = result.response;
      },
      error => {}
    );
  }
  itemaplic_update() {
    if (this.Pupdate != 1) {
      swal("", "No cuenta Con Permisos", "error");

      return;
    }

    let params = { name: this.name_item, id: this.id_itemapli };
    this.InternalService.itemaplic_update(params).subscribe(
      result => {
        if (result.response == true) {
          this.search_items();
          swal("", "Se Atualizo Corretamente", "success");
        }
      },
      error => {}
    );
  }

  itemaplic_inser() {
    if (this.Pupdate != 1) {
      swal("", "No cuenta Con Permisos", "error");

      return;
    }
    let params = {
      campany: this.company,
      contract: this.contract,
      consec: this.internalmodel.consecutive,
      name: this.name_item,
      idot: this.otitems
    };
    this.InternalService.itemaplic_inser(params).subscribe(
      result => {
        if (result.response == true) {
          this.name_item = "";
          this.search_items();
          swal("", "Se Creo Corretamente", "success");
        }
      },
      error => {}
    );
  }
  delete_items(index: number, newrow: any) {
    if (this.Pupdate != 1) {
      swal("", "No cuenta Con Permisos", "error");

      return;
    }
    let iditems_aplicables = newrow.iditems_aplicables;

    let params = { iditem: iditems_aplicables };
    this.InternalService.itemaplic_delet(params).subscribe(
      result => {
        if (result.response == true) {
          this.search_items();
          swal("", "Se Elimino Corretamente", "success");
        }
      },
      error => {}
    );
  }

  programado_AChanged() {}

  PlaneaChanged() {
    this.internalmodel.f_Planea = this.dia();
  }
  f_statdo() {
    this.internalmodel.Fecha_Estado = this.dia();
  }
  Hace1Changed() {
    this.internalmodel.f_Hace_1 = this.dia();
  }

  Hace2Changed() {
    this.internalmodel.f_Hace_2 = this.dia();
  }

  Hace3Changed() {
    this.internalmodel.f_Hace_3 = this.dia();
  }

  VerificaChanged() {
    this.internalmodel.f_Verifica = this.dia();
  }

  ApruebaChanged() {
    this.internalmodel.f_Aprueba = this.dia();
  }

  search_histo() {
    let params = {
      contract: this.contract,
      consec: this.internalmodel.consecutive
    };
    this.InternalService.search_histo(params).subscribe(
      result => {
        this.histo = result.response;
        this.datatables.reInitDatatable("#histo_table");
      },
      error => {}
    );
  }
  event() {
    this.internaldac = new InternalDac();
    let params = {
      consecutive: this.internalmodel.consecutive,
      company: this.company
    };
    this.InternalService.dac(params).subscribe(
      result => {
        this.rowdac = result.dac;
      },
      error => {}
    );

    this.InternalService.clasificacion().subscribe(
      result => {
        this.clasificacion = result.clasificacion_dac;
      },
      error => {}
    );
  }

  motivos() {
    this.internaldac.id_mot = "";
    let params = { clasificacion: this.internaldac.id_clasif };
    this.InternalService.motivos_dac(params).subscribe(
      result => {
        this.motv = result.motivos_dac;
      },
      error => {}
    );
  }

  save_dac() {
    let params = {
      consecutive: this.internalmodel.consecutive,
      idcontrato: this.contract,
      company: this.company,
      dac: this.internaldac
    };

    this.InternalService.save_dac(params).subscribe(
      result => {
        if (result.response == true) {
          swal("", "evento Guardado", "success");
        }
      },
      error => {}
    );
  }

  update_dac() {
    if (this.Pupdate != 1) {
      swal("", "No cuenta Con Permisos", "error");

      return;
    }

    let params = { dac: this.internaldac };

    this.InternalService.update_dac(params).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Se Ha Atualizado", "success");
        }
      },
      error => {}
    );
  }

  search_dac(event) {
    let params = { iddac_worki: event.target.value };
    this.InternalService.search_dac(params).subscribe(
      result => {
        this.internaldac.id_clasif = result.response.id_clasif;
        this.motivos();
        this.internaldac = result.response;
        this.btninsert = true;
        this.btnupdate = false;
      },
      error => {}
    );
  }

  upload(event) {
    let ruta = event.target.files[0];

    const fd = new FormData();

    fd.append("pdf", ruta);
    fd.append("company_name", this.company_name);
    fd.append("company", this.company);
    fd.append("contract_name", this.contract_name);
    fd.append("contract", this.contract);

    this.InternalService.pdf(fd).subscribe(
      result => {
        let url = result.url;
        this.setInitialProof(url);
      },
      error => {}
    );
  }

  upload_image(event) {
    this.image_upload = event.target.files;
  }

  imagesend() {
    const formData = new FormData();

    this.image_upload.length;

    if (this.image_upload.length > 20) {
      swal("", "Solo se Puede Subir 20 Archivos", "error");
      return;
    }

    if (this.image_upload.length == 0) {
      swal("", "No Hay Ninguna Imagen Selecionada", "error");
      return;
    }
    for (var i = 0; i < this.image_upload.length; i++) {
      formData.append(this.image_upload[i].name, this.image_upload[i]);
    }
    formData.append("id_obr", this.internalmodel.idworkI);
    formData.append("contract", this.internalmodel.idcontrato);
    formData.append("company_name", this.company_name);
    formData.append("contract_name", this.contract_name);
    formData.append("consec", this.internalmodel.consecutive);

    this.InternalService.send_image(formData).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Imagenes subidas", "success");

          this.image_upload = [];
          this.input_image = "";
        }
      },
      error => {}
    );
  }

  view_image() {
    this.view_pdf = [];
    let params = { id_obr: this.internalmodel.idworkI, url: this.url_image };

    this.InternalService.search_image(params).subscribe(
      result => {
        this.galleryImages = result.response;

        let data;
        for (data of this.galleryImages) {
          var name_image = data.name_image.split(".");

          if (name_image[1] == "pdf") {
            this.view_pdf.push({ ulr: data.small, name: data.name_image });
          }
        }
      },
      error => {}
    );
  }
  setInitialProof(ruta) {
    this.InternalService.setPdfDocObjects(ruta).then(pdf => {
      this.pdf = pdf;
      this.generateView();
    });
  }

  generateView() {
    this.consecutivo;
    var pageNumber = 1;
    this.pdf.getPage(pageNumber).then(page => {
      var scale = 6;
      let viewport = page.getViewport(scale);
      let canvas: any = document.getElementById("main-canvas");
      let context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      let renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      var renderTask = page.render(renderContext);
      renderTask.then(function() {
        console.log("Page rendered");
        // procesar(canvas);
        procesar1(canvas);
      });

      page.getTextContent().then(function(textContent) {
        // let textLayer = new TextLayerBuilder({
        //   textLayerDiv: textLayerDiv,
        //   pageIndex: pageNumber - 1,
        //   viewport: viewport
        // });
        // textLayer.setTextContent(textContent);
        // textLayer.render(20);
      });
    });

    function cargaContextoCanvas(idCanvas) {
      let elemento: any = document.getElementById(idCanvas);
      if (elemento && elemento.getContext) {
        var contexto = elemento.getContext("2d");
        if (contexto) {
          return contexto;
        }
      }
      return false;
    }

    function procesar(canvas) {
      // var ctx = cargaContextoCanvas("micanvas");
      //Creo una imagen conun objeto Image de Javascript
      var img = new Image();
      //indico la URL de la imagen
      // img.src = canvas;
      //defino el evento onload del objeto imagen

      //  ctx.drawImage(canvas, 1630, 635, 1100, 200, 10, 10, 700, 176);
      //tamaño natural
      //  img.src = canvas.toDataURL("image/png");
      // console.log(img.src);
      // Tesseract.recognize(ctx, {
      //  lang: "spa",
      //  tessedit_char_blacklist: "e"
      //}).then(function(result) {
      //  var cadena01 = result.text.substr(0, 500);

      //  var loh = getCleanedString(cadena01)
      //  loh = loh.substr(0, 50);
      // console.log(loh, ' camvas1')
      //});
    }

    function procesar1(canvas) {
      var ctx = cargaContextoCanvas("micanvas2");
      //Creo una imagen conun objeto Image de Javascript
      var img = new Image();
      //indico la URL de la imagen
      // img.src = canvas;
      //defino el evento onload del objeto imagen

      ctx.drawImage(canvas, 2750, 350, 400, 400, 10, 10, 200, 176);
      //tamaño natural
      img.src = canvas.toDataURL("image/png");

      Tesseract.recognize(ctx, {
        lang: "spa",
        tessedit_char_blacklist: "e"
      }).then(function(result) {
        let cadena01: any = result.text.substr(0, 20);

        var loh = getCleanedString(cadena01);
        loh = loh.substr(0, 6);

        var inputValue = ((<HTMLInputElement>(
          document.getElementById("consec")
        )).value = loh);
      });
    }

    function getCleanedString(cadena) {
      // Definimos los caracteres que queremos eliminar
      var specialChars = "!@#$^&%*()+=-[]/{}|:<>?,._QJy’'’IUWNP;ABCOTLAG";

      // Los eliminamos todos
      for (var i = 0; i < specialChars.length; i++) {
        cadena = cadena.replace(new RegExp("\\" + specialChars[i], "gi"), "");
      }

      // Lo queremos devolver limpio en minusculas

      // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi

      // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
      cadena = cadena.replace("_1", "");

      cadena = cadena.replace("mm", "");
      cadena = cadena.replace(" ", "");
      cadena = cadena.replace("c", "");
      cadena = cadena.replace("s", "");
      cadena = cadena.replace("C", "");
      cadena = cadena.replace("S", "");
      cadena = cadena.replace("C", "");

      cadena = cadena.replace("w", "");
      cadena = cadena.replace("PEDIDO:", "");
      cadena = cadena.replace("MOIN", "");
      cadena = cadena.replace("- BAJO/N", "");
      cadena = cadena.replace("-", "");
      cadena = cadena.replace("AJO", "");
      cadena = cadena.replace("/", "");
      cadena = cadena.replace("B", "");
      cadena = cadena.replace("A", "");
      cadena = cadena.replace("_", "");
      cadena = cadena.replace("‘", "");
      cadena = cadena.replace(":", "");
      cadena = cadena.replace("a", "");
      cadena = cadena.replace("e", "");
      cadena = cadena.replace("i", "");
      cadena = cadena.replace("o", "");
      cadena = cadena.replace("u", "");
      cadena = cadena.replace("b", "");
      cadena = cadena.replace("c", "");
      cadena = cadena.replace("d", "");
      cadena = cadena.replace("e", "");
      cadena = cadena.replace("f", "");
      cadena = cadena.replace("g", "");

      cadena = cadena.replace("h", "");
      cadena = cadena.replace("i", "");
      cadena = cadena.replace("j", "");
      cadena = cadena.replace("k", "");
      cadena = cadena.replace("l", "");
      cadena = cadena.replace("m", "");
      cadena = cadena.replace("ñ", "");
      cadena = cadena.replace("n", "");
      cadena = cadena.replace("o", "");
      cadena = cadena.replace("p", "");
      cadena = cadena.replace("k", "");
      cadena = cadena.replace("r", "");
      cadena = cadena.replace("s", "");
      cadena = cadena.replace("’", "");
      cadena = cadena.replace("_", "");
      cadena = cadena.replace("ODGOTLAO18DGTOS", "");
      cadena = cadena.replace("DGOTLAO18DGTOS", "");
      cadena = cadena.replace("_ODGOTLA1DGTOS", "");

      cadena = cadena.replace("18D", "");
      cadena = cadena.replace("AO", "");
      cadena = cadena.replace("D", "");
      cadena = cadena.replace("1S", "");
      cadena = cadena.replace("S", "");
      cadena = cadena.replace("15D", "");
      cadena = cadena.replace("0W", "");

      return cadena;
    }
  }



  
  enviarpdf() {
    let data: any = (<HTMLInputElement>document.getElementById("consec")).value;
    console.log(data);
  }
  canDeactivate(): Promise<boolean> | boolean {
    if (this.guard == 0) {
      return window.confirm("Desea Salir Sin Guardar");
    }
  }


  
}
