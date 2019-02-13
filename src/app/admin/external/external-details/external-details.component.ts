import {
  Component,
  OnInit,
  HostListener,
  Renderer2,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ExternalService } from "../../../services/external/external.service";
import { External } from "../../../models/external_model";
import { actavmodel } from "../../../models/actavecinda.model";
import { Anillos } from "../../../models/external_model";
import { Presupuesto_Oti } from "../../../models/external_model";
import { ipidmodel } from "../../../models/external_model";
import { Dobra } from "../../../models/external_model";
import { topografiamodel } from "../../../models/external_model";
import { ListService } from "../../../services/list/list.service";
import { constantes } from "../../../utilitis/constantes";
import swal from "sweetalert2";
import { datatables } from "../../../utilitis/datatables";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
declare let plupload: any;

import { Lightbox } from "angular2-lightbox";
import * as XLSX from "xlsx";
import { rowhear } from "../../../models/dispatches_models";
type AOA = any[][];

@Component({
  selector: "app-external-details",
  templateUrl: "./external-details.component.html",
  styleUrls: ["./external-details.component.scss"],
  providers: [ExternalService, ListService, constantes]
})
export class ExternalDetailsComponent implements OnInit {
  public sub: any;
  public consecutive;
  public company;
  public anillos: Anillos;
  public external: External;
  public dobra: Dobra;
  public presupuesto_oti: Presupuesto_Oti;
  public image_upload;
  public btnsendmail;
  public loader;
  public urlactas = "/sip/public/public/";
  public _album = [];
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: "xlsx", type: "array" };
  fileName: string = "Preacta.xlsx";

  //tablas
  public table_activiti1 = [];
  public anillo_detail = [];
  public informe_table = [];
  public items_table = [];
  public items_cobro = [];
  public table_activiti = [];
  public list_state_activity = [];
  public items_gerenciales = [];
  public itemsP_display = [];
  public list_topo = [];
  public image;
  public imageenv;
  public idemployees;
  public datatables;
  public active = "active";
  public tipo_obra;
  public estado_obra;
  public list_city;
  public contract;
  public btn_update;
  public btn_insert;
  public oti;
  public type_obr_anillo;
  public state_anillo;
  public list_acta;
  public list_gans;

  public btn_inser_oti;
  public btninsert_acta = false;
  public btnupdateacta = false;

  public class;
  public nombre;
  public presupuesto_tab;
  public constantes: constantes;
  public search_oti_name;
  public lis_type_acta;
  public informe_tab;

  public btn_update_oti;
  public class_items;
  public search_oti1;
  public oti1;
  public btnupload = true;

  public searc_employee;

  public detalle_items = [];
  public stateitems;
  public search_ipi;

  //botones
  public btn_dinsert;
  public btn_dupdate;
  public id_detalle;

  public idoti;

  public tabpresupuesto = false;
  public taboti = false;
  public tabinforme = false;
  public tab_items = false;
  public tab_materiales = false;
  public tab_activity = false;
  public tabactasv = false;

  public table_materiales = [];
  public search_codigo;
  public search_desc;
  public search_activity;
  public company_name;
  public contract_name;
  public url;
  public actavmodel;
  public input_image;
  public lisimage;
  public url_api;
  public quejas;
  public problems;
  public typeTeam;
  public item_cobro_code2;
  public item_presupuesto_class2;
  public item2;
  public item_cobro_name2;
  public item_presupuesto_cantidad2;
  public otiStartDate;
  public otiLastDate;

  public topotramo;
  public topoipid;
  public toponodeslength;
  public topoDiameter;
  public topoMaterial;
  public topoDate;
  public ininode;
  public iniaddress;
  public iniTypeMaterial;
  public inidiameterMaterial;
  public inicoorEste;
  public inicoorNorte;
  public inicotaKey;
  public inicotaTerreno;
  public iniObservation;
  public finnode;
  public finaddress;
  public finTypeMaterial;
  public findiameterMaterial;
  public fincoorEste;
  public fincoorNorte;
  public fincotaKey;
  public fincotaTerreno;
  public finObservation;
  public id_topo;
  public id_material;
  public topoidipid;
  public toponodoinicial;
  public toponodofinal;
  public autocomplename4;
  public autocomplecodeexternal4;

  public topografiamodel;
  public ipidmodel;

  public btnsavetopo;
  public btnupdatetopo = true;
  public btnnewtopo = true;

  public ipidipid;
  public ipiddirection;
  public list_items_ow = [];
  public tabs_ow = false;
  public tabs_ipid = false;
  public tabs_topografia = false;
  public list_ipid = [];
  public btnclosedo = true;
  public list_cmaterial = [];
  public btnclosegeren = true;
  public items_topo;

  public codMaterial;
  public descMaterial;


 public ingresidente;
 public gestambiental;
 public gestsocial;
 public gestsst;
 public gestcalidad;
 public gestcomercial;
 public supervisor;
 public tecauxhseqsst;
 public eencargado;
 public oficiales;
 public operadores;
 public topografo;
 public soldador;
 public silleteros;
 public ayudantesobra;
 public ayudanteimpacto;
 public conductor;
 public cadenero;
 public concretadora;
 public canguros;
 public cortadora;
 public equiposoldadura;
 public pplanta;
 public pulidora;
 public martiloelec;
 public alimentadorh20;
 public camion;
 public retroexcavadora;
 public minicargador;
 public compresor;
 public volqueta;
 public eqteroelecfusion;
 public planta;
 public soldadura;



  // Subscription
  subscription: any;

  // Reference to the plupload instance.
  uploader: any;

  // Files being uploaded.
  fileList: any[] = [];

  // Flag to display the uploader only once the library is ready.
  isPluploadReady = false;
  numbers: number[] = [];
  // Reference to the `pickfiles` element
  // so we can bind plupload's "browse_button" to it.
  @ViewChild("pickfiles")
  pickfiles: ElementRef;

  @ViewChild("OTI")
  OTI: ElementRef;

  @ViewChild("btncerrardo")
  btncerrardo: ElementRef;

  @ViewChild("btncerrargeren")
  btncerrargeren: ElementRef;

  //variables informe de obra
  constructor(
    private ExternalService: ExternalService,
    private route: ActivatedRoute,
    private router: Router,
    private ListService: ListService,
    protected elementRef: ElementRef,
    private renderer: Renderer2,
    private _lightbox: Lightbox
  ) {
    for (let index = 0; index < 10000; index++) {
      this.numbers.push(index);
    }
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.company_name = localStorage.getItem("company_name");
    this.contract_name = localStorage.getItem("contract_name");
    this.anillos = new Anillos();
    this.ipidmodel = new ipidmodel();
    this.external = new External();
    this.actavmodel = new actavmodel();
    this.datatables = new datatables();
    this.presupuesto_oti = new Presupuesto_Oti();
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.url_api = this.constantes.getRouterApi();
    this.dobra = new Dobra();
    this.search_oti1 =
      this.url +
      "external/autocomplecode?term=:keyword&company=" +
      this.company +
      "&contract=" +
      this.contract;

    this.items_topo =
      this.url +
      "external/autocomplecodetopo?term=:keyword&company=" +
      this.company +
      "&contract=" +
      this.contract;

    this.search_oti_name =
      this.url +
      "external/autocomplename?term=:keyword&company=" +
      this.company +
      "&contract=" +
      this.contract;

    this.search_activity =
      this.url +
      "activities/autocomple?term=:keyword&type=2&contract=" +
      this.contract;

    this.searc_employee = this.url + "employee/searc_employee?term=:keyword";
    this.search_codigo = this.url + "material/autocomplete?term=:keyword";
    this.search_desc = this.url + "material/autocompletedesc?term=:keyword";

    this.autocomplecodeexternal4 =
      this.url +
      "external/autocomplecode4?term=:keyword&company=" +
      this.company +
      "&contract=" +
      this.contract;

    this.autocomplename4 =
      this.url +
      "external/autocomplename4?term=:keyword&company=" +
      this.company +
      "&contract=" +
      this.contract;

    this.search_ipi =
      this.url + "external/search_ipi?term=:keyword&contract=" + this.contract;
    this.topografiamodel = new topografiamodel();
  }

  ngOnInit() {
    this.subscription = this.addPlupload();
    this.nombre = "prueb";

    this.get_state();
    this.get_type();
    this.get_municipality(5);
    this.btn_update;
    this.route.queryParams.subscribe(params => {
      this.sub = params["queryParams"];
      if (!this.sub) {
        this.btn_update = true;
      } else {
        this.search_obr_ext(this.sub);
        this.btn_insert = true;
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  addPlupload() {
    return this.addPluploadScript().subscribe(() => {
      this.isPluploadReady = true;
      this.initPlupload();
    });
  }

  // Add a <script> tag to index.html to load Plupload from a CDN.
  addPluploadScript(): Observable<any> {
    const id = "plupload-sdk";
    // Return immediately if the script tag is already here.
    if (document.getElementById(id)) {
      return Observable.of(true);
    }
    let js,
      fjs = document.getElementsByTagName("script")[0];
    js = document.createElement("script");
    js.id = id;
    js.src = "//unpkg.com/plupload@2.3.2/js/plupload.full.min.js";
    fjs.parentNode.insertBefore(js, fjs);
    return Observable.timer(1000).take(1); // @TODO: Replace this with more robust code
  }

  // Configure and initialize Plupload.
  initPlupload() {
    //console.log('initPlupload -- this.pickfiles.nativeElement', this.pickfiles.nativeElement);

    this.uploader = new plupload.Uploader({
      runtimes: "html5,html4",

      browse_button: this.pickfiles.nativeElement,

      url: "http://192.168.1.8/sip/public/api/external/imagesend_acta",
      max_file_size: "10mb",
      filters: {
        mime_types: [{ title: "Image files", extensions: "jpeg,jpg,gif,png" }]
      },
      resize: { width: 1920, height: 1080, quality: 90 },
      multipart: true,
      multipart_params: {
        idoti: this.oti,
        oti: this.anillos.obr_anillos_oti,
        company_name: this.company_name,
        contract_name: this.contract_name,
        acta: this.actavmodel.id_actav,
        consecutive: this.external.obr_consecutivo
      },

      init: {
        PostInit: () => {
          // Reset the list of files being uploaded.
          this.fileList = [];
        },

        BeforeUpload: (up, file) => {
          this.uploader.settings.multipart_params = {
            idoti: this.oti,
            oti: this.anillos.obr_anillos_oti,
            company_name: this.company_name,
            contract_name: this.contract_name,
            acta: this.actavmodel.id_actav,
            consecutive: this.external.obr_consecutivo
          };
        },
        /**
         * Every time a file is selected, it's added to a list of files
         * displayed in the template with the regular Angular template syntax.
         */
        FilesAdded: (up, files) => {
          plupload.each(files, file => {
            this.fileList.push({
              id: file.id,
              name: file.name,
              size: plupload.formatSize(file.size),
              percent: 0
            });
          });
          this.btnupload = false;
        },

        // Update the upload progress in the list of files displayed in the template.
        UploadProgress: (up, file) => {
          const index = this.fileList.findIndex(f => f.id == file.id);
          this.fileList[index].percent = file.percent;
        },

        UploadComplete: (up, file) => {
          console.log(file);
          this.fileList = [];
          this.btnupload = true;
        },

        Error: (up, err) => {
          console.error(err);
        }
      }
    });

    this.uploader.init();
  }

  uploadFiles() {
    this.uploader.start();
  }

  adddobra() {
    this.detalle_items.push({});
  }

  adddobra_gerencial() {
    this.items_gerenciales.push({});
  }
  search_obr_ext(consec) {
    let params = { consecutive: consec, contract: this.contract };
    this.ExternalService.search_consec(params).subscribe(
      result => {
        this.anillo_detail = result.anillo;
        this.external = result.search_obr;
        this.consecutive = this.external.obr_consecutivo;
      },
      error => {}
    );
  }

  get_type_obr_anillo() {
    this.ListService.type_obr_anillo().subscribe(
      result => {
        this.type_obr_anillo = result.type_obr_anillo;
      },
      error => {}
    );
  }

  get_state_anillo() {
    this.ListService.state_anillo().subscribe(
      result => {
        this.state_anillo = result.state_anillo;
      },
      error => {}
    );
  }

  get_type() {
    this.ListService.list_tipeext().subscribe(
      result => {
        this.tipo_obra = result.type_obraext;
      },
      error => {}
    );
  }

  get_state() {
    this.ListService.state_ext().subscribe(
      result => {
        this.estado_obra = result.state_ext;
      },
      error => {}
    );
  }

  get_municipality(id: number) {
    let params = { id_departamento: id };
    let url = "departamentos/municipios";
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_city = res.municipality;
      },
      error => {
        console.log(error);
      }
    );
  }

  calcular_fecha() {
    let dias = this.external.obr_ans;
    let fecha = this.external.obr_date_ini;

    var Fecha = new Date();
    var sFecha =
      fecha ||
      Fecha.getDate() +
        "/" +
        (Fecha.getMonth() + 1) +
        "/" +
        Fecha.getFullYear();
    var sep = sFecha.indexOf("/") != -1 ? "/" : "-";
    var aFecha = sFecha.split(sep);
    fecha = aFecha[0] + "/" + aFecha[1] + "/" + aFecha[2];
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + parseInt(dias));
    var anno = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    mes = mes < 10 ? "0" + mes : mes;
    dia = dia < 10 ? "0" + dia : dia;
    var fechaFinal = anno + sep + mes + sep + dia;
    this.external.obr_date_end = fechaFinal;
  }

  update() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    let params = {
      data: this.external,
      company: this.company,
      contract: this.contract
    };
    this.ExternalService.update(params).subscribe(
      result => {
        if (result.data == true) {
          swal("", "Se Ha Atualizado Correctamente", "success");
        } else {
          swal("", "Comuniquese A sistemas", "error");
        }
      },
      error => {}
    );
  }

  insert() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    let params = {
      data: this.external,
      company: this.company,
      contract: this.contract
    };

    this.ExternalService.insert(params).subscribe(
      result => {
        if (result.data == true) {
          this.consecutive = result.consecutive;
          this.btn_insert = true;
          this.btn_update = false;
          this.external.idobr_externa = result.id_obr;
          swal("", "Se Ha Creado Correctamente", "success");
        } else {
          swal("", "Comuniquese A sistemas", "error");
        }
      },
      error => {}
    );
  }

  new() {
    this.consecutive = "";
    this.external = new External();
    this.btn_insert = false;
    this.btn_update = true;
  }

  search_oti(event) {
    this.anillos = new Anillos();
    this.OTI.nativeElement.click();
    this.btn_update_oti = false;
    this.get_type_obr_anillo();
    this.get_state_anillo();
    let oti1 = event.target.value;
    let data = oti1.split(",");

    let oti = data[0];
    this.oti = oti;
    let id_oti = data[1];
    this.idoti = id_oti;
    this.btn_inser_oti = true;

    let params = { idobr_anillos: id_oti };
    this.ExternalService.search_oti(params).subscribe(
      result => {
        this.anillos = result.oti;
        this.search_listipid();
      },
      error => {}
    );
  }

  update_oti() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    let params = {
      obr_consecutivo: this.consecutive,
      contract: this.contract,
      company: this.company,
      data: this.anillos
    };
    this.ExternalService.update_oti(params).subscribe(
      result => {
        if (result.update == true) {
          swal("", "Se Ha Atualizado Correctamente", "success");
        } else {
          swal("", "Comuniquese A sistemas", "error");
        }
      },
      error => {}
    );
  }

  new_oti() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.OTI.nativeElement.click();
    this.anillos = new Anillos();
    this.get_type_obr_anillo();
    this.get_state_anillo();
    this.btn_inser_oti = false;
    this.btn_update_oti = true;
  }

  insert_oti() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.btn_inser_oti = true;
    this.btn_update_oti = false;
    let params = {
      obr_consecutivo: this.consecutive,
      contract: this.contract,
      company: this.company,
      data: this.anillos,
      idobr_externa: this.external.idobr_externa
    };
    this.ExternalService.insert_anillo(params).subscribe(
      result => {
        if (result.result == true) {
          this.idoti = result.Idoti;
          this.anillos.idobr_anillos = result.Idoti;
          this.search_obr_ext(this.sub);
          swal("", "Se Ha Creado Correctamente", "success");
        } else {
          swal("", "Comuniquese A sistemas", "error");
        }
      },
      error => {}
    );
  }

  onchange_oti() {
    this.anillos.obr_anillos_gpz = "";
    this.anillos.obr_anillos_oti = this.anillos.obr_anillos_anillo;
  }
  onchange_gpz() {
    this.anillos.obr_anillos_anillo = "";
    this.anillos.obr_anillos_oti =
      this.external.obr_nplano + "-" + this.anillos.obr_anillos_gpz;
  }

  clas_items() {
    let params = { company: this.company, contract: this.contract };
    this.ListService.clasificacion_item(params).subscribe(
      result => {
        this.class_items = result.clasificacion_item;
      },
      error => {}
    );
  }

  presupuesto() {
    this.clas_items();

    this.search_presupuesto_item();

    this.presupuesto_tab = true;
    this.taboti = false;
    this.informe_tab = false;
    this.tab_items = false;
    this.tab_materiales = false;
    this.tab_activity = false;
    this.tabactasv = false;
    this.tabs_ipid = false;
    this.tabs_ow = false;
  }

  informe() {
    this.items_table = [];

    this.searc_detalle_obra();
    this.presupuesto_tab = false;
    this.taboti = false;
    this.informe_tab = true;
    this.tab_items = false;
    this.tab_materiales = false;
    this.tab_activity = false;
    this.tabactasv = false;
    this.tabs_ipid = false;
    this.tabs_ow = false;
    let params = {};

    this.ExternalService.type_gans().subscribe(
      result => {
        this.list_gans = result.response;
      },
      eror => {}
    );
  }

  items_cbr() {
    this.state_items();
    this.search_item_cbr();
    this.items_table = [];
    this.presupuesto_tab = false;
    this.taboti = false;
    this.informe_tab = false;
    this.tab_items = true;
    this.tab_materiales = false;
    this.tab_activity = false;
    this.tabactasv = false;
    this.tabs_ipid = false;
    this.tabs_ow = false;
  }

  tab_mate() {
    this.items_table = [];
    this.search_mate();
    this.presupuesto_tab = false;
    this.taboti = false;
    this.informe_tab = false;
    this.tab_items = false;
    this.tab_materiales = true;
    this.tab_activity = false;
    this.tabactasv = false;
    this.tabs_ipid = false;
    this.tabs_ow = false;
  }

  tabactivity() {
    this.presupuesto_tab = false;
    this.taboti = false;
    this.informe_tab = false;
    this.tab_items = false;
    this.tab_materiales = false;
    this.tab_activity = true;
    this.tabactasv = false;
    this.tabs_ipid = false;
    this.tabs_ow = false;

    this.state_activity();
    this.search_activity_table();
  }

  actasv() {
    this.items_table = [];
    this.search_act();
    this.presupuesto_tab = false;
    this.taboti = false;
    this.informe_tab = false;
    this.tab_items = false;
    this.tab_materiales = false;
    this.tab_activity = false;
    this.tabs_ipid = false;
    this.tabs_ow = false;

    this.tabactasv = true;
    this.btnupdateacta = true;
    this.btnsendmail = true;
    this.btninsert_acta = false;
    this.actavmodel = new actavmodel();

    this.ExternalService.lis_type_acta().subscribe(
      result => {
        this.lis_type_acta = result.sarch;
      },
      error => {}
    );
  }

  ow() {
    this.items_table = [];
    this.search_ow();

    this.presupuesto_tab = false;
    this.taboti = false;
    this.informe_tab = false;
    this.tab_items = false;
    this.tab_materiales = false;
    this.tab_activity = false;
    this.tabs_ipid = false;
    this.tabactasv = false;
    this.tabs_ow = true;
  }

  public valueChanged(index: number, row: any) {
    row.item_cobro_name = row.item_cobro_code.item_cobro_name;
    row.item = row.item_cobro_code.item;
    row.iditem_cobro = row.item_cobro_code.iditem_cobro;
    let date = this.date();
    row.items_externas_state = 1;
    row.item_presupuesto_class = row.item_cobro_code.item_cobro_clasificacion;

    row.items_externas_date = date;

    row.item_cobro_unidad = row.item_cobro_code.item_cobro_unidad;
  }

  public valueChanged_name(index: number, row: any) {
    row.item_cobro_code = row.item_cobro_name.item_cobro_code;
    row.item = row.item_cobro_name.item;

    row.iditem_cobro = row.item_cobro_name.iditem_cobro;

    row.item_cobro_unidad = row.item_cobro_name.item_cobro_unidad;

    let date = this.date();
    row.items_externas_date = date;
    row.items_externas_state = 1;
    row.item_presupuesto_class = row.item_cobro_name.item_cobro_clasificacion;
  }

  add() {
    this.items_table.push({});
  }

  add_informe() {
    this.informe_table.push({});
  }

  /*PRESIONAR LA TECLA F2 PARA CONSULAR*/
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      if (this.presupuesto_tab == true) {
        this.save_presupuesto_item();
      }
      if (this.tab_items == true) {
        this.save_item_cbr();
      }
      if (this.tab_materiales == true) {
        this.save_mate();
      }

      if (this.tab_activity == true) {
        this.save_activity();
      }
      if (this.tabs_ow == true) {
        this.saveow();
      }
    }

    if (event.keyCode === this.constantes.KEYBOARD.TECLA_plus) {
      if (this.presupuesto_tab == true) {
        this.add();
      }
    }
  }

  save_presupuesto_item() {
    let params = {
      company: this.company,
      contract: this.contract,
      consecutive: this.consecutive,
      idexterna: this.external.idobr_externa,
      oti: this.idoti,
      data: this.items_table
    };
    this.ExternalService.save_presupuesto_item(params).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Se Ha Guardado Correctamente", "success");
          this.search_presupuesto_item();
        }
      },
      error => {}
    );
  }

  search_presupuesto_item() {
    let params = {
      oti: this.anillos.idobr_anillos
    };
    this.ExternalService.search_presupuesto_item(params).subscribe(
      result => {
        this.items_table = result.search;
      },
      error => {}
    );
  }

  delete_itemp(event) {
    let iditemp = event.target.value;

    let params = { iditemp: iditemp };
    this.ExternalService.delete_itemsp(params).subscribe(
      result => {
        if (result.result == true) {
          swal("", "Se Ha Eliminado Correctamente", "success");
          this.search_presupuesto_item();
        }
      },
      error => {}
    );
  }
  encargado() {
    this.dobra.detalles_obra_encargado = this.dobra.detalles_obra_encargado1.Users_id_identification;
    this.dobra.detalles_obra_encargado1 = this.dobra.detalles_obra_encargado1.full_name;
  }

  pegador() {
    this.dobra.detalles_obra_pegador = this.dobra.detalles_obra_pegador1.Users_id_identification;
    this.dobra.detalles_obra_pegador1 = this.dobra.detalles_obra_pegador1.full_name;
  }
  insert_dobra() {
    let params = {
      data: this.dobra,
      idobr: this.external.idobr_externa,
      company: this.company,
      contract: this.contract,
      idoti: this.anillos.idobr_anillos
    };
    this.ExternalService.insert_dobra(params).subscribe(
      result => {
        if (result.result == true) {
          swal("", "Se Ha Creado Correctamente", "success");
          this.searc_detalle_obra();
        }
      },
      error => {}
    );
  }

  update_dobra() {
    let params = {
      data: this.dobra,
      idobr: this.external.idobr_externa,
      company: this.company,
      contract: this.contract,
      idoti: this.anillos.idobr_anillos
    };
    this.ExternalService.update_dobra(params).subscribe(
      result => {
        if (result.result == true) {
          swal("", "Se Ha Atualizado Correctamente", "success");
          this.searc_detalle_obra();
        }
      },
      error => {}
    );
  }

  searc_detalle_obra() {
    let params = {
      idobr: this.external.idobr_externa,
      idoti: this.anillos.idobr_anillos
    };
    this.ExternalService.searc_detalle_obra(params).subscribe(
      result => {
        this.informe_table = result.search;
        this.datatables.reInitDatatable("#table_informe");
      },
      error => {}
    );
  }

  searc_detalle_obra_edit(event) {
    this.btn_dinsert = true;
    this.btn_dupdate = false;
    let iddetalles_obra = event.target.value;
    let params = { iddetalles_obra: iddetalles_obra };

    this.ExternalService.searc_detalle_obra_edit(params).subscribe(
      result => {
        this.dobra = result.search;
      },
      error => {}
    );
  }

  btn_insert_d() {
    this.btn_dupdate = true;
    this.btn_dinsert = false;
    this.dobra = new Dobra();
  }

  searc_detalle(event) {
    this.id_detalle = event.target.value;
    console.log(event.target.value);
    this.clas_items();
    this.search_dobra();
  }

  searc_detalle_gerencial(event) {
    this.id_detalle = event.target.value;
    console.log(event.target.value);
    this.clas_items();
    this.search_dobra_gerencial();
  }

  search_dobra_gerencial() {
    let params = { id_detalle: this.id_detalle };
    this.ExternalService.search_dobra_gerencial(params).subscribe(
      result => {
        this.items_gerenciales = result.search;
      },
      error => {}
    );
  }

  save_dobra() {
    let params = { id_detalle: this.id_detalle, data: this.detalle_items };
    this.ExternalService.save_dobra(params).subscribe(
      result => {
        if (result.search == true) {
          this.search_dobra();
          swal("", "Se Ha Guardado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  save_dobra_gerencial() {
    let params = { id_detalle: this.id_detalle, data: this.items_gerenciales };
    this.ExternalService.save_dobra_gerencial(params).subscribe(
      result => {
        if (result.search == true) {
          this.search_dobra_gerencial();
          swal("", "Se Ha Guardado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  delete_detalle_obra(event) {
    let parasm = { iddobr: event.target.value };
    this.ExternalService.delete_detalle_obra(parasm).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Se Ha Eliminado Correctamente", "success");
          this.searc_detalle_obra();
        } else {
          swal("", "Elimine Primero el Detalle de la Obra", "error");
        }
      },
      error => {}
    );
  }
  search_dobra() {
    let params = { id_detalle: this.id_detalle };
    this.ExternalService.search_dobra(params).subscribe(
      result => {
        this.detalle_items = result.search;
      },
      error => {}
    );
  }

  delete_det_itemp(event) {
    let params = { idd_obra: event.target.value };
    this.ExternalService.delete_dobra(params).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_dobra();
          swal("", "Se Ha Eliminado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  delete_det_itemp_gen(event) {
    let params = { idd_obra_ge: event.target.value };
    this.ExternalService.delete_det_itemp_gen(params).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_dobra_gerencial();
          swal("", "Se Ha Eliminado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  add_item() {
    this.items_cobro.push({});
  }
  state_items() {
    this.ExternalService.state_items().subscribe(
      result => {
        this.stateitems = result.search;
      },
      error => {}
    );
  }

  save_item_cbr() {
    for (var e in this.items_cobro) {
      if (
        this.items_cobro[e].items_externas_state == 0 ||
        this.items_cobro[e].items_externas_state == undefined
      ) {
        swal("", "Todos los Items Deben Tener Estado", "error");
        return;
      }
    }

    let params = { id_oti: this.idoti, data: this.items_cobro };
    this.ExternalService.save_item_cbr(params).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_item_cbr();
          swal("", "Se Ha Guardado Correctamente", "success");
        }
      },
      error => {}
    );
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

  search_item_cbr() {
    let params = { id_oti: this.idoti };
    this.ExternalService.search_item_cbr(params).subscribe(
      result => {
        this.items_cobro = result.serach;
        this.datatables.reInitDatatable("#id_itemc");
      },
      error => {}
    );
  }

  delete_item_cbr(event) {
    let params = { id_item_cbr: event.target.value };

    this.ExternalService.delete_item_cbr(params).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_item_cbr();
          swal("", "Se Ha Eliminado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  add_materiales() {
    this.table_materiales.push({});
  }

  valueChangedmate(index: number, row: any) {
    row.material = row.code.code;
    row.description = row.code.description;
    row.idmateriales = row.code.idmateriales;
    let hoy = this.date();
    row.date = hoy;
  }

  valueChangeddescri(index: number, row: any) {
    row.material = row.description.code;
    row.code = row.description.code;
    row.idmateriales = row.description.idmateriales;
    let hoy = this.date();
    row.date = hoy;
  }

  save_mate() {
    let params = { idoti: this.idoti, data: this.table_materiales };
    this.ExternalService.save_mate(params).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_mate();
          swal("", "Se Ha Guardado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  search_mate() {
    let params = { id_oti: this.idoti };
    this.ExternalService.search_mate(params).subscribe(
      result => {
        this.table_materiales = result.search;
        this.datatables.reInitDatatable("#id_mate");
      },
      error => {}
    );
  }

  delete_mate(event) {
    let params = { id_mate_cbr: event.target.value };
    this.ExternalService.delete_mate(params).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_mate();
          swal("", "Se HaEliminado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  state_activity() {
    this.ExternalService.state_activity().subscribe(
      result => {
        this.list_state_activity = result.response;
      },
      error => {}
    );
  }
  add_activiti() {
    this.table_activiti.push({});
  }

  add_ow() {
    this.list_items_ow.push({});
  }
  employe(index: number, row: any) {
    row.idemployee = row.employee.Users_id_identification;
    let hoy = this.date();
    row.activity_externas_date = hoy;
  }

  activitychange(index: number, row: any) {
    row.idactivity = row.activity.idactivities;
    row.value = row.activity.activities_value;
    row.activity_externas_state = 1;
  }

  save_activity() {
    let params = { data: this.table_activiti, idoti: this.idoti };
    this.ExternalService.save_activity(params).subscribe(
      result => {
        if ((result.response = true)) {
          this.search_activity_table();
          this.table_activiti = [];
          swal("", "Se Ha Guardado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  search_activity_table() {
    let params = { idoti: this.idoti };
    this.ExternalService.search_activity(params).subscribe(
      result => {
        this.table_activiti1 = result.response;
      },
      error => {}
    );
  }

  delete_activity(event) {
    let id_activity = event.target.value;
    let params = { id_activity: id_activity };
    this.ExternalService.delete_activity(params).subscribe(
      result => {
        if (result.response == true) {
          this.search_activity_table();
          swal("", "Se Ha Eliminado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  update_activity(event) {
    let id_activity = event.target.value;
    let params = { id_activity: id_activity };

    this.ExternalService.update_activity(params).subscribe(
      result => {
        this.table_activiti = result.response;
      },
      error => {}
    );
  }

  imagesend(event) {
    this.imageenv = event.target.files;

    const formData = new FormData();

    for (var i = 0; i < this.imageenv.length; i++) {
      formData.append(this.imageenv[i].name, this.imageenv[i]);
    }
    formData.append("idoti", this.idoti);
    formData.append("oti", this.oti);
    formData.append("company_name", this.company_name);
    formData.append("contract_name", this.contract_name);
    this.ExternalService.send_image(formData).subscribe(
      result => {},
      error => {}
    );
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error("Cannot use multiple files");
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, {
        header: "A"
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  import_presu() {
    let params = { data: this.data, idoti: this.idoti };
    this.ExternalService.import_presu(params).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Se Ha Guardado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  save_acta() {
    if (this.actavmodel.acta == undefined) {
      swal("", "Hay Campos vacios", "error");
      return;
    }
    let params = { data: this.actavmodel, idoti: this.idoti };
    this.ExternalService.saveacta(params).subscribe(
      result => {
        if (result.response == false) {
          swal("", "Se Ha Guardado Correctamente", "success");
          this.search_act();
          this.btninsert_acta = true;
          this.btnupdateacta = false;
          this.btnsendmail = false;

          this.search_a(result.id_acta);
          return;
        }
        if (result.response == true) {
          swal("", "El acta ya Eiste", "success");
        }
      },
      error => {}
    );
  }

  search_acta(event) {
    let idacta = event.target.value;
    let params = { idacta: idacta };
    this.ExternalService.search_actas(params).subscribe(
      result => {
        this.actavmodel = result.response;

        if (this.actavmodel.date_send != null) {
          let res = this.actavmodel.date_send.replace(" ", "T");
          res = res.replace(":00", "");
          this.actavmodel.date_send = res;
        }

        this.btnupdateacta = false;
        this.btninsert_acta = true;
        this.btnsendmail = false;
      },
      error => {}
    );
  }

  search_a(idacta) {
    let params = { idacta: idacta };
    this.ExternalService.search_actas(params).subscribe(
      result => {
        this.actavmodel = result.response;
        if (this.actavmodel.date_send != null) {
          let res = this.actavmodel.date_send.replace(" ", "T");
          res = res.replace(":00", "");
          this.actavmodel.date_send = res;
        }

        this.btnupdateacta = false;
        this.btninsert_acta = true;
        this.btnsendmail = false;
      },
      error => {}
    );
  }

  search_act() {
    let params = { idoti: this.idoti };
    this.ExternalService.search_act(params).subscribe(
      result => {
        this.list_acta = result.response;
        this.datatables.reInitDatatable("#actas");
      },
      error => {}
    );
  }

  update_acta() {
    if (this.actavmodel.date_send != null) {
      let res = this.actavmodel.date_send.replace("T", " ");
      this.actavmodel.date_send = res;
    }
    let params = { data: this.actavmodel, idoti: this.idoti };
    this.ExternalService.update_acta(params).subscribe(
      result => {
        if (result.response == true) {
          this.search_a(this.actavmodel.id_actav);
          swal("", "Se Ha Atualizado Correctamente", "success");
        }
      },
      error => {}
    );
  }

  send_mail() {
    this.loader = false;
    let params = { data: this.actavmodel, idoti: this.idoti };
    this.ExternalService.send_mail(params).subscribe(
      result => {
        if (result.response == true) {
          this.loader = true;
          swal("", "Se Ha Enviado el Correo", "success");
        }
      },
      error => {}
    );
  }

  upload_image_btn() {
    console.log(this.input_image);
    this.btnupload = false;
  }

  nuevo() {
    this.btninsert_acta = false;
    this.btnupdateacta = true;
    this.actavmodel = new actavmodel();
  }

  search_image() {
    this._album = [];
    let params = { idacta: this.actavmodel.id_actav };

    this.ExternalService.search_imageactas(params).subscribe(
      result => {
        this.lisimage = result.response;

        for (var e in result.response) {
          const src =
            this.urlactas +
            result.response[e].url +
            result.response[e].name_image;
          const caption =
            this.urlactas +
            result.response[e].url +
            result.response[e].name_image;
          const thumb =
            this.urlactas +
            result.response[e].url +
            result.response[e].name_image;
          const album = {
            name: result.response[e].name_image,
            src: src,
            caption: caption,
            thumb: thumb
          };

          this._album.push(album);
        }
      },
      error => {}
    );
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  download() {
    window.open(
      this.url_api +
        "acta/download?idacta=" +
        this.actavmodel.id_actav +
        "&consec=" +
        this.external.obr_consecutivo +
        "&oti=" +
        this.anillos.obr_anillos_oti +
        "&acta=" +
        this.actavmodel.acta
    );
  }

  valueChanged_name_geren(index: number, row: any) {
    row.item_cobro = row.item_cobro_name.item_cobro_code;
    row.item = row.item_cobro_name.item_cobro_code;
    row.item_presupuesto_class = row.item_cobro_name.item_cobro_clasificacion;
    row.valor = row.item_cobro_name.item_cobro_valor;
    row.iditem_cobro = row.item_cobro_name.iditem_cobro;
  }

  valueChanged_geren(index: number, row: any) {
    row.item = row.item_cobro.item_cobro_code;
    row.item_presupuesto_class = row.item_cobro.item_cobro_clasificacion;
    row.item_cobro_name = row.item_cobro.item_cobro_name;
    row.valor = row.item_cobro.item_cobro_valor;
    row.iditem_cobro = row.item_cobro.iditem_cobro;
  }

  saveow() {
    let params = { idoti: this.idoti, ow: this.list_items_ow };
    this.ExternalService.saveow(params).subscribe(
      result => {
        if (result.response == true) {
          this.search_ow();
          swal("", "Se Ha Guardado", "success");
        }
      },
      error => {}
    );
  }

  search_listipid() {
    let params = { idoti: this.idoti };
    this.ExternalService.search_list_ipid(params).subscribe(
      result => {
        this.list_ipid = result.response;
      },
      error => {}
    );
  }

  delete(event) {
    let iditem_ow = event.target.value;
    let params = { iditem_ow: iditem_ow };
    this.ExternalService.delete_itemsow(params).subscribe(
      result => {
        if (result.response == true) {
          this.search_ow();
          swal("", "Se Ha Eliminado", "success");
        }
      },
      error => {}
    );
  }

  search_ow() {
    let params = { idoti: this.idoti };
    this.ExternalService.search_ow(params).subscribe(
      result => {
        this.list_items_ow = result.search;
      },
      error => {}
    );
  }

  //topografia (hecho por anderson)
  savetopo() {
    let params = {
      data: this.topografiamodel,
      id_oti: this.anillos.idobr_anillos
    };
    this.ExternalService.savetopo(params).subscribe(
      result => {
        if (result.response == true) {
          this.btnsavetopo = true;
          this.btnupdatetopo = false;
          this.btnnewtopo = false;
          this.topografiamodel.id_topografia = result.id;
          swal("", "Resgitro Guardado", "success");
        }
      },
      error => {}
    );
  }
  updatetopo() {
    let params = { data: this.topografiamodel };
    this.ExternalService.updatetopo(params).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Resgitro Atualizado", "success");
        }
      },
      error => {}
    );
  }

  searchtopo() {
    let params = { id_oti: this.anillos.idobr_anillos };
    this.ExternalService.searchtopo(params).subscribe(
      result => {
        this.list_topo = result.search;
      },
      error => {}
    );
  }

  searchOne(event) {
    let id_topo = event.target.value;
    let params = { id_topo: id_topo };
    this.ExternalService.searchOne(params).subscribe(
      result => {
        this.btnnewtopo = false;
        this.btnsavetopo = true;
        this.btnupdatetopo = false;
        this.topografiamodel = result.search;
      },
      error => {}
    );
  }

  search_dataipid() {
    console.log(this.topografiamodel.topoipid.n_ini);

    this.topografiamodel.toponodofinal = this.topografiamodel.topoipid.n_end;
    this.topografiamodel.toponodoinicial = this.topografiamodel.topoipid.n_ini;
    this.topografiamodel.toponodeslength = this.topografiamodel.topoipid.log;
    this.topografiamodel.id_material = this.topografiamodel.topoipid.items;
    this.topografiamodel.topoMaterial = this.topografiamodel.topoipid.item_cobro_name;
    this.topografiamodel.topoidipid = this.topografiamodel.topoipid.idipd;
    this.topografiamodel.topoipid = this.topografiamodel.topoipid.ipid;
  }

  newtopo() {
    this.topografiamodel = new topografiamodel();
    this.btnsavetopo = false;
    this.btnupdatetopo = true;
  }

  formula(i: number, row: any) {
    if (row.item_cobro_unidad == "m3" || row.item_cobro_unidad == "m2") {
      if (row.l2 >= 0 || row.l2 == "") {
      } else {
        row.l2 = 1;
      }
      if (row.e >= 0 || row.e == "") {
      } else {
        row.e = 1;
      }
      row.item_presupuesto_cantidad = Number(row.l1 * row.l2 * row.e).toFixed(
        2
      );
      console.log(row.l1 * row.l2 * row.e);
    } else {
      row.item_presupuesto_cantidad = row.l1;
    }
  }

  updateipid() {
    let params = { data: this.ipidmodel };
    this.ExternalService.updateipid(params).subscribe(
      result => {},
      error => {}
    );
  }
  saveipid() {
    let params = { data: this.ipidmodel };
    this.ExternalService.saveipid(params).subscribe(result => {}, error => {});
  }
  searchipid() {
    let params = { data: this.ipidmodel };
    this.ExternalService.searchipid(params).subscribe(
      result => {},
      error => {}
    );
  }
  editipid() {
    let params = { data: this.ipidmodel };
    this.ExternalService.editipid(params).subscribe(result => {}, error => {});
  }

  add_cmaterial() {
    this.list_cmaterial.push({});
  }

  searchcmaterial() {
    let params = { data: this.ipidmodel };
    this.ExternalService.searchcmaterial(params).subscribe(
      result => {},
      error => {}
    );
  }

  closedo() {
    swal({
      title: "Desea Guardar?",
      text: "Guardar Antes De Salir!",
      type: "question",
      showCancelButton: true,
      showConfirmButton: true,
      showCloseButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Salir sin Guardar",
      confirmButtonText: "Guardar y Salir !"
    }).then(result => {
      if (result.value) {
        this.save_dobra();
        this.btncerrardo.nativeElement.click();
      } else if (
        // Read more about handling dismissals

        result.dismiss === swal.DismissReason.cancel
      ) {
        this.btncerrardo.nativeElement.click();
      }
    });
  }

  closegeren() {
    swal({
      title: "Desea Guardar?",
      text: "Guardar Antes De Salir!",
      type: "question",
      showCancelButton: true,
      showConfirmButton: true,
      showCloseButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Salir sin Guardar",
      confirmButtonText: "Guardar y Salir !"
    }).then(result => {
      if (result.value) {
        this.save_dobra_gerencial();
        this.btncerrargeren.nativeElement.click();
      } else if (
        // Read more about handling dismissals

        result.dismiss === swal.DismissReason.cancel
      ) {
        this.btncerrargeren.nativeElement.click();
      }
    });
  }

  valueChangedcodemate(index: number, row: any) {
    console.log(row);
    row.idmaterial = row.codemate.idmateriales;
    row.desmate = row.codemate.description;
  }

  valueChanged_namemate(index: number, row: any) {
    console.log(row);
    row.idmaterial = row.desmate.idmateriales;
    row.codemate = row.desmate.code;
  }

  valueChanged_iniitemtopo() {
    this.topografiamodel.inimateid = this.topografiamodel.inimate.iditem_cobro;
  }

  valueChanged_enditemtopo() {
    console.log(this.topografiamodel.finmate);
    this.topografiamodel.finmateid = this.topografiamodel.finmate.iditem_cobro;
  }
}
