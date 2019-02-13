import { Component, OnInit, ViewChild } from "@angular/core";

import { datatables } from "../../utilitis/datatables";
import { constantes } from "../../utilitis/constantes";
import { ImportService } from "../../services/import/import.service";
import swal from "sweetalert2";
import * as XLSX from "xlsx";

type AOA = any[][];
@Component({
  selector: "app-importoym",
  templateUrl: "./importoym.component.html",
  styleUrls: ["./importoym.component.scss"],
  providers: [ImportService]
})
export class ImportoymComponent implements OnInit {
  public datatables;
  public constantes;
  public company;
  public contract;
  public empresa;
  public contrato;
  public url;
  public rowDatatable;
  public json;
  public date;
  public error;
  public btn_save = true;
  public btn_errors = true;
  public hidden = true;
  public response;
  public total;
  public loader;

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: "xlsx", type: "array" };
  fileName: string = "SheetJS.xlsx";

  constructor(private ImportService: ImportService) {
    this.datatables = new datatables();
    this.constantes = new constantes();
  }
  @ViewChild("fileImportInput")
  fileImportInput: any;
  csvRecords = [];
  ngOnInit() {
    var strMimeType = "application/octet-stream;charset=iso-8859-9";
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.url = this.constantes.getRouterUrl();
    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");
    this.datatables.initDatatable("#table_oym");
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
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
      console.log(this.data);
      this.rowDatatable = this.data;
      this.datatables.reInitDatatable4("#example");
    };
    reader.readAsBinaryString(target.files[0]);
  }

  save() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    if (this.date == undefined) {
      swal("", "La Fecha esta vacia", "error");
      return;
    }
    this.loader = false;
    let params = {
      company: this.company,
      contrat: this.contract,
      data: this.rowDatatable,
      date: this.date
    };
    this.ImportService.import_oym(params).subscribe(
      result => {
        this.loader = true;
        this.btn_save = true;
        this.hidden = false;
        this.total = result.total;
      },
      error => {}
    );
  }

  check() {
    if (this.date == undefined) {
      swal("", "La Fecha esta vacia", "error");
      return;
    }

    this.loader = false;
    let params = {
      company: this.company,
      contrat: this.contract,
      data: this.rowDatatable,
      date: this.date
    };
    this.ImportService.validate_oym(params).subscribe(
      result => {
        if (result.data > 0) {
          this.btn_errors = false;
          this.error = result.data;
          this.loader = true;
          swal("", "hay errores en el formato", "error");
        }
        swal("", "no se encontro ningun error", "success");
        this.btn_save = false;
        this.loader = true;
      },
      error => {}
    );
  }
  cerrar() {
    this.hidden = true;
  }
  errors() {}
}
