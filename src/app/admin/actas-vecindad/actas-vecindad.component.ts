import {
  Component,
  OnInit,
  HostListener,
  Renderer2,
  ViewChild,
  ElementRef
} from "@angular/core";
declare let plupload: any;

import { Lightbox } from "angular2-lightbox";
import { constantes } from "../../utilitis/constantes";
import swal from "sweetalert2";
import { datatables } from "../../utilitis/datatables";
import { actavmodel } from "../../models/actavecinda.model";
import { ActasService } from "../../services/actas/actas.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";

@Component({
  selector: "app-actas-vecindad",
  templateUrl: "./actas-vecindad.component.html",
  styleUrls: ["./actas-vecindad.component.scss"],
  providers: [ActasService, constantes]
})
export class ActasVecindadComponent implements OnInit {
  public consecutive;
  public acta;
  public ficha;
  public date_send;
  public address;
  public phone;
  public cel;
  public date_acta;
  public user;
  public identification;
  public mail;
  public type;
  public constantes: constantes;
  public btnupdateacta;
  public btnsendmail;
  public btninsert_acta = true;
  public newacta = false;
  public actavmodel;
  public datatables;
  public lis_type_acta;
  public loader;
  public list_acta;
  public btnupload;
  public btnitems;
  public input_image;
  public urlactas = "/sip/public/public/";
  public search_oti;
  public company;
  public contract;
  public url;
  public OTI;
  public obr_anillos_oti;
  public obr_consecutivo;
  public _album;
  public lisimage;
  public company_name;
  public contract_name;
  public url_api;
  public itemscode;
  public items_name;
  public stateitems;
  public btnclose = true;
  public newAddress_multiple;

  public auto_acta;
  public auto_user;
  public auto_address;
  public btnauto_user;
  public addrees;
  public newAddress;
  public ipid;
  public employee;
  public idoti;
  public tramo;
  public searc_employee;
  public obsC;
  public idacta_address;
  public list_ipid = [];
  public addrees_item;
  // Subscription
  subscription: any;

  // Reference to the plupload instance.
  uploader: any;

  // Files being uploaded.
  fileList: any[] = [];

  // Flag to display the uploader only once the library is ready.
  isPluploadReady = false;
  public items_cobro = [];

  // Reference to the `pickfiles` element
  // so we can bind plupload's "browse_button" to it.
  @ViewChild("pickfiles")
  pickfiles: ElementRef;

  @ViewChild("btncerrar")
  btncerrar: ElementRef;

  constructor(
    private ActasService: ActasService,
    private route: ActivatedRoute,
    private router: Router,
    protected elementRef: ElementRef,
    private renderer: Renderer2,
    private _lightbox: Lightbox
  ) {
    this.datatables = new datatables();
    this.constantes = new constantes();
    this.actavmodel = new actavmodel();
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.company_name = localStorage.getItem("company_name");
    this.contract_name = localStorage.getItem("contract_name");
    this.url = this.constantes.getRouter();
    this.url_api = this.constantes.getRouterApi();
    this.search_oti =
      this.url + "external/oti?term=:keyword&contract=" + this.contract;

    this.itemscode =
      this.url +
      "external/autocomplecode?term=:keyword&company=" +
      this.company +
      "&contract=" +
      this.contract;

    this.items_name =
      this.url +
      "external/autocomplename?term=:keyword&company=" +
      this.company +
      "&contract=" +
      this.contract;

    this.auto_acta = this.url + "external/auto_acta?term=:keyword";

    this.auto_user = this.url + "external/auto_user?term=:keyword";
    this.auto_address = this.url + "external/auto_address?term=:keyword";
    this.searc_employee = this.url + "employee/searc_employee?term=:keyword";
  }

  ngOnInit() {
    this.subscription = this.addPlupload();
    this.actasv();
    this.itemsbtn();
    this.state_items();
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
        idoti: this.actavmodel.idoti,
        oti: this.obr_anillos_oti,
        company_name: this.company_name,
        contract_name: this.contract_name,
        acta: this.actavmodel.id_actav,
        consecutive: this.obr_consecutivo
      },

      init: {
        PostInit: () => {
          // Reset the list of files being uploaded.
          this.fileList = [];
        },

        BeforeUpload: (up, file) => {
          this.uploader.settings.multipart_params = {
            idoti: this.actavmodel.idoti,
            oti: this.obr_anillos_oti,
            company_name: this.company_name,
            contract_name: this.contract_name,
            acta: this.actavmodel.id_actav,
            consecutive: this.obr_consecutivo
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
  actasv() {
    this.btnupdateacta = true;
    this.btnsendmail = true;
    this.btninsert_acta = true;

    this.ActasService.lis_type_acta().subscribe(
      result => {
        this.lis_type_acta = result.sarch;
      },
      error => {}
    );
  }

  save_acta() {
    let params = {
      data: this.actavmodel,
      idoti: this.actavmodel.idoti,
      addresm: this.newAddress_multiple
    };

    if (
      this.actavmodel.address == "" ||
      this.actavmodel.address == null ||
      this.actavmodel.type == "" ||
      this.actavmodel.type == null
    ) {
      swal("", "Hay Campos Requeridos Sin llenar", "error");
      return;
    }
    if (this.actavmodel.idoti == null && this.actavmodel.type != 4) {
      swal("", "Seleccione una OTI", "error");
      return;
    }
    this.ActasService.saveacta(params).subscribe(
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
    this.addrees_item = "";
    this.btnitems = false;
    let idacta = event.target.value;
    let params = { idacta: idacta };
    this.ActasService.search_actas(params).subscribe(
      result => {
        this.actavmodel = result.response;
        if (this.actavmodel.date_send != null) {
          let res = this.actavmodel.date_send.replace(" ", "T");
          res = res.replace(":00", "");
          this.actavmodel.date_send = res;
          this.newacta = false;
        }
        if (result.address == null) {
          this.addrees_item = null;
        } else {
          this.addrees_item = result.address.address;
        }

        this.search_name_oti(this.actavmodel.idoti);
        this.search_listipid();
        this.btnupdateacta = false;
        this.btninsert_acta = true;
        this.btnsendmail = false;
        this.newacta = false;
      },
      error => {}
    );
  }
  search_name_oti(idoti) {
    let params = { idoti: idoti };
    this.ActasService.search_oti(params).subscribe(
      result => {
        this.tramo = result.search.obr_anillos_oti;
        this.obr_anillos_oti = result.search.obr_anillos_oti;
        this.obr_consecutivo = result.search_conse;
      },
      error => {}
    );
  }

  search_a(idacta) {
    let params = { idacta: idacta };
    this.ActasService.search_actas(params).subscribe(
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
    let params = { idoti: this.actavmodel.idoti };
    this.ActasService.search_act(params).subscribe(
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
    let params = { data: this.actavmodel, idoti: this.actavmodel.idoti };
    this.ActasService.update_acta(params).subscribe(
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
    let params = { data: this.actavmodel, idoti: this.actavmodel.idoti };
    this.ActasService.send_mail(params).subscribe(
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
    this.btnupload = false;
  }

  nuevo() {
    if (this.actavmodel.idoti == null || this.actavmodel.idoti == " ") {
      swal("", "Seleccione Una OTI", "error");
      return;
    }
    let idoti = this.actavmodel.idoti;
    this.btninsert_acta = false;
    this.btnupdateacta = true;
    this.actavmodel = new actavmodel();
    this.actavmodel.idoti = idoti;
  }

  valueChanged(event) {
    this.tramo = this.OTI.obr_anillos_oti;
    this.actavmodel.idoti = this.OTI.idobr_anillos;

    this.search_listipid();
    let params = { idoti: this.actavmodel.idoti };
    this.ActasService.searchidobr(params).subscribe(
      result => {
        if (result.sarch != null) {
          this.obr_anillos_oti = result.sarch.obr_anillos_oti;
          this.btninsert_acta = false;
        }
      },
      error => {}
    );
  }

  searchoti() {
    if (this.actavmodel.idoti == null) {
      swal("", "Seleccione una OTI", "error");
      return;
    }
    let params = { data: this.actavmodel, idoti: this.actavmodel.idoti };
    this.ActasService.search_act(params).subscribe(
      result => {
        this.list_acta = result.response;
        this.datatables.reInitDatatable("#actas");
      },
      error => {}
    );
  }
  download() {
    window.open(
      this.url_api +
        "acta/download?idacta=" +
        this.actavmodel.id_actav +
        "&consec=" +
        this.obr_consecutivo +
        "&oti=" +
        this.obr_anillos_oti +
        "&acta=" +
        this.actavmodel.acta
    );
  }

  search_image() {
    this._album = [];
    let params = { idacta: this.actavmodel.id_actav };

    this.ActasService.search_imageactas(params).subscribe(
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

  add_item() {
    this.items_cobro.push({});
  }

  state_items() {
    this.ActasService.state_items().subscribe(
      result => {
        this.stateitems = result.search;
      },
      error => {}
    );
  }
  itemsbtn() {
    this.btnitems = true;
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
  valueChanged_items(index: number, row: any) {
    row.item_cobro_name = row.item_cobro_code.item_cobro_name;
    row.item = row.item_cobro_code.item;
    row.iditem_cobro = row.item_cobro_code.iditem_cobro;
    row.item_cobro_unidad = row.item_cobro_code.item_cobro_unidad;
    let date = this.date();
    row.id_state = 1;
    row.date = date;
  }

  valueChanged_name(index: number, row: any) {
    row.item_cobro_code = row.item_cobro_name.item_cobro_code;
    row.item = row.item_cobro_name.item;
    row.iditem_cobro = row.item_cobro_name.iditem_cobro;
    row.item_cobro_unidad = row.item_cobro_name.item_cobro_unidad;
    let date = this.date();
    row.date = date;
    row.id_state = 1;
  }

  /*PRESIONAR LA TECLA F2 PARA CONSULAR*/
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      let params = {
        data: this.items_cobro,
        id_acta: this.actavmodel.id_actav,
        idoti: this.actavmodel.idoti,
        id_address: this.idacta_address
      };
      this.ActasService.save_items(params).subscribe(
        result => {
          this.items_cobro = result.result;
          if (result.response == true) {
            swal("", "Item Guardado", "success");
            return;
          }
        },
        error => {}
      );
    }
  }

  items() {
    let params = {
      id_acta: this.actavmodel.id_actav
    };

    this.ActasService.search_items(params).subscribe(
      result => {
        this.items_cobro = result.sarch;
      },
      error => {}
    );
  }

  delete_item(event) {
    let params = {
      id_item: event.target.value,
      id_acta: this.actavmodel.id_actav
    };
    this.ActasService.delet_items(params).subscribe(
      result => {
        this.items_cobro = result.result;
      },
      error => {}
    );
  }

  search_acta_auto(event) {
    let acta = event.target.value;

    let params = { acta: acta };
    this.ActasService.search_acta(params).subscribe(
      result => {
        this.actavmodel = new actavmodel();
        this.list_acta = result.response;
        this.actavmodel.idoti = result.response.idoti;
        this.acta = "";
        this.btnauto_user = "";
        this.addrees = "";
        this.OTI = "";
      },
      error => {}
    );
  }

  search_user_auto(event) {
    let user = event.target.value;

    let params = { user: user };
    this.ActasService.search_user(params).subscribe(
      result => {
        this.actavmodel = new actavmodel();
        this.list_acta = result.response;
        this.actavmodel.idoti = result.response.idoti;
        this.acta = "";
        this.btnauto_user = "";
        this.addrees = "";
        this.OTI = "";
      },
      error => {}
    );
  }

  search_address_auto(event) {
    let address = event.target.value;

    let params = { address: address };
    this.ActasService.search_address(params).subscribe(
      result => {
        this.actavmodel = new actavmodel();
        this.list_acta = result.response;
        this.actavmodel.idoti = result.response.idoti;
        this.acta = "";
        this.btnauto_user = "";
        this.addrees = "";
        this.OTI = "";
      },
      error => {}
    );
  }

  changeacta() {}

  close() {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false
    });

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
        let params = {
          data: this.items_cobro,
          id_acta: this.actavmodel.id_actav,
          idoti: this.actavmodel.idoti,
          id_address: this.idacta_address
        };
        this.ActasService.save_items(params).subscribe(
          result => {
            this.items_cobro = result.result;
            if (result.response == true) {
              this.btncerrar.nativeElement.click();
            }
          },
          error => {}
        );
      } else if (
        // Read more about handling dismissals

        result.dismiss === swal.DismissReason.cancel
      ) {
        this.btncerrar.nativeElement.click();
      }
    });
  }

  save_multiple() {
    if (this.actavmodel.multiple == "no" || this.actavmodel.multiple == null) {
      swal("", "Selecione si es Interior o Multiple", "error");
      return;
    }
    if (this.newAddress_multiple == " " || this.newAddress_multiple == null) {
      swal("", "Direccion Vacio", "error");
      return;
    }

    this.save_acta();
  }

  search_listipid() {
    let params = { idoti: this.actavmodel.idoti };
    this.ActasService.search_list_ipid(params).subscribe(
      result => {
        this.list_ipid = result.response;
      },
      error => {}
    );
  }

  valueChanged_tramo() {
    this.actavmodel.idoti = this.tramo.idobr_anillos;
    this.search_listipid();
    this.btninsert_acta = false;
  }

  employe() {
    this.actavmodel.idemployee = this.actavmodel.employee.idemployees;
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
      row.quantity = Number(row.l1 * row.l2 * row.e).toFixed(6);
      console.log(row.l1 * row.l2 * row.e);
    } else {
      row.quantity = row.l1;
    }
  }

  search_address_items(event) {
    if (this.addrees_item == "") {
      this.idacta_address = "";
    } else {
      this.idacta_address = this.addrees_item.id_actav;
    }
  }
}
