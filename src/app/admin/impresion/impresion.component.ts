import { Component, OnInit, ViewChild } from "@angular/core";
import swal from "sweetalert2";
import { constantes } from "../../utilitis/constantes";
import { ListService } from "../../services/list/list.service";
import { PermitsService } from "../../services/permisos/permits.service";
import { datatables } from "../../utilitis/datatables";
import { ImpresionService } from "../../services/impresion/impresion.service";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
@Component({
  selector: "app-impresion",
  templateUrl: "./impresion.component.html",
  styleUrls: ["./impresion.component.scss"],
  providers: [ImpresionService, ListService, PermitsService, datatables]
})
export class ImpresionComponent implements OnInit {
  public documento;
  public date;
  public list_programacion;
  public datatables;
  public constantes;
  public list_resultp = [];
  public checkbox = [];
  public url;
  public data = [];
  public company;

  constructor(
    private ListService: ListService,
    private _PermitsService: PermitsService,
    private impresionService: ImpresionService
  ) {
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.datatables = new datatables();
  }
  @ViewChild("checkbox1") checkbox1: any;
  ngOnInit() {
    this.company = localStorage.getItem("company");
  }

  search_pro() {
    let params = { date: this.date, documento: this.documento };
    this.impresionService.search(params).subscribe(
      result => {
        this.list_programacion = result.response;
      },
      error => {}
    );
  }

  search_progra(event) {
  
    let idemployee = event.target.value;
    let params = { idemployee: idemployee, date: this.date };
    this.impresionService.search_progra(params).subscribe(
      result => {
        this.list_resultp = result.response;
        this.datatables.reInitDatatable1("#tab");
      },
      error => {}
    );
  }

  imprimir() {
    if (this.documento == undefined) {
      swal("", "Seleccione Documento", "error");
      return;
    }


    this.data = [];
    for (let e of this.list_resultp) {
      if (e.checkbox == true) {
        this.data.push(e.idworkI);
      }
    }
if(this.documento==1){
  window.open(
    this.url +
      "impresion/printliquidacion?idobr=" +
      encodeURIComponent(JSON.stringify(this.data)) +
      "&company=" +
      encodeURIComponent(JSON.stringify(Number(this.company)))
  );
  return;
}
if(this.documento==2){
  window.open(
    this.url +
      "impresion/printfc?idobr=" +
      encodeURIComponent(JSON.stringify(this.data)) +
      "&company=" +
      encodeURIComponent(JSON.stringify(Number(this.company)))
  );
  return;
}
  }

  checkAll(ev) {
    this.list_resultp.forEach(x => (x.checkbox = ev.target.checked));
  }

  isAllChecked() {
    return this.list_resultp.every(_ => _.checkbox);
  }

  
  public captureScreen() {
    var data = document.getElementById("contentToConvert");

    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 297;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("L", "mm", "A4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); // Generated PDF
    });
  }
}
