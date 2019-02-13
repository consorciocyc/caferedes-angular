import {
  Component,
  OnInit,
  HostListener,
  Renderer2,
  ElementRef,
  ViewChild
} from "@angular/core";

declare let plupload: any;
import { OperacionService } from "../../../services/operacion/operacion.service";
import { constantes } from "../../../utilitis/constantes";
import { OperactionModel } from "../../../models/operation.model";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import "rxjs/add/operator/filter";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";

@Component({
  selector: "app-details-operations",
  templateUrl: "./details-operations.component.html",
  styleUrls: ["./details-operations.component.scss"],
  styles: [
    `
      gallery {
        height: 500px; // The gallery must have a height
      }
    `
  ],
  providers: [OperacionService, constantes]
})
export class DetailsOperationsComponent implements OnInit {
  public constantes: constantes;
  public operationmodel: OperactionModel;
  public list_type = [];
  public type;
  public descrition;
  public list_state;
  public action;
  public list_action;
  public list_service;
  public list_type_net;
  public list_causa;
  public id;
  public list_elemnt;
  public list_material;
  public Searchemployee;
  public url;
  public municipali_list;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public url_image;
  public view_pdf = [];
  public loader;
  public btnupload;
  public ANS;
  public list_type_activity;
  @ViewChild("myButton")
  myButton: ElementRef;

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

  constructor(
    private OperacionService: OperacionService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    protected elementRef: ElementRef
  ) {}

  ngOnInit() {
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
    this.operationmodel = new OperactionModel();
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.url_image = this.constantes.getimage();
    this.Searchemployee = this.url + "employee/searc_employee?term=:keyword";
    this.route.queryParams.subscribe(params => {
      this.id = params["queryParams"];

      if (this.id != undefined) {
        this.searchobr(this.id);
        this.municipaly();
        this.type_activity();
      }
    });

    this.state();

    this.subscription = this.addPlupload();
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

      url: "/sip/public/api/operaction/imagesend_oym",
      max_file_size: "10mb",
      filters: {
        mime_types: [{ title: "Image files", extensions: "jpeg,jpg,gif,png" }]
      },
      resize: { width: 1920, height: 1080, quality: 90 },
      multipart: true,
      multipart_params: {
        consec: this.operationmodel.consecutive,
        id_oym: this.operationmodel.id_oym
      },

      init: {
        PostInit: () => {
          // Reset the list of files being uploaded.
          this.fileList = [];
        },

        BeforeUpload: (up, file) => {
          this.uploader.settings.multipart_params = {
            consec: this.operationmodel.consecutive,
            id_oym: this.operationmodel.id_oym
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
          //this.btnupload = false;
        },

        // Update the upload progress in the list of files displayed in the template.
        UploadProgress: (up, file) => {
          const index = this.fileList.findIndex(f => f.id == file.id);
          this.fileList[index].percent = file.percent;
        },

        UploadComplete: (up, file) => {
          this.fileList = [];
          //this.btnupload = true;
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
  searchobr(id) {
    let params = { id_oym: id };
    this.OperacionService.searchoym(params).subscribe(
      result => {
        this.operationmodel = result.search;

        let fechaInicio = new Date(
          this.operationmodel.date_assignment
        ).getTime();
        let fechaFin = new Date(this.date()).getTime();

        var diff = fechaFin - fechaInicio;
        let direfencia = diff / (1000 * 60 * 60 * 24);
        this.ANS = direfencia;
        if (this.operationmodel.ans >= direfencia) {
          this.renderer.addClass(this.myButton.nativeElement, "parpadea");
          this.renderer.addClass(this.myButton.nativeElement, "btn-sm");
          this.renderer.addClass(this.myButton.nativeElement, "mr-3");
          this.renderer.addClass(this.myButton.nativeElement, "btn-success");
          let text = this.renderer.createText("Activa");
          this.renderer.appendChild(this.myButton.nativeElement, text);
        }
        if (this.operationmodel.ans < direfencia) {
          this.renderer.addClass(this.myButton.nativeElement, "parpadea");
          this.renderer.addClass(this.myButton.nativeElement, "btn-sm");
          this.renderer.addClass(this.myButton.nativeElement, "mr-3");
          this.renderer.addClass(this.myButton.nativeElement, "btn-danger");
          let text = this.renderer.createText("Vencida");
          this.renderer.appendChild(this.myButton.nativeElement, text);
        }

        this.list();
      },
      error => {}
    );
  }

  list() {
    let params = { type: this.operationmodel.type };
    this.OperacionService.list(params).subscribe(
      result => {
        this.list_action = result.clasificacion;
        this.list_service = result.servicio;
        this.list_type_net = result.type_net;
        this.list_causa = result.causa;
        this.list_elemnt = result.elemento_int;
        this.list_material = result.material;
      },
      error => {}
    );
  }

  search_type() {
    this.list();
  }

  state() {
    this.OperacionService.state().subscribe(
      result => {
        this.list_state = result.List;
      },
      error => {}
    );
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      this.update();
    }
  }

  update() {
    let params = { data: this.operationmodel };
    this.OperacionService.update(params).subscribe(
      result => {
        if (result.search == true) {
          swal("", "Se Atualizo Correctamente", "success");
          return;
        }
      },
      error => {}
    );
  }

  municipaly() {
    this.OperacionService.municipali().subscribe(
      result => {
        this.municipali_list = result.municipality;
      },
      error => {}
    );
  }

  programado_AChanged() {
    this.operationmodel.idprogramado = this.operationmodel.nameprogramado.idemployees;
  }

  PlaneaChanged() {
    this.operationmodel.idPlanea = this.operationmodel.namePlanea.idemployees;
  }

  Hace1Changed() {
    this.operationmodel.idHace_1 = this.operationmodel.nameHace_1.idemployees;
  }

  Hace2Changed() {
    this.operationmodel.idHace_2 = this.operationmodel.nameHace_2.idemployees;
  }

  VerificaChanged() {
    this.operationmodel.idVerifica = this.operationmodel.nameVerifica.idemployees;
  }

  ApruebaChanged() {
    this.operationmodel.idAprueba = this.operationmodel.nameAprueba.idemployees;
  }

  view_image() {
    this.view_pdf = [];

    let params = { id_oym: this.operationmodel.id_oym, url: this.url_image };

    this.OperacionService.search_image(params).subscribe(
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

  type_activity() {
    this.OperacionService.list_type_activity().subscribe(
      result => {
        this.list_type_activity = result.response;
      },
      error => {}
    );
  }
}
