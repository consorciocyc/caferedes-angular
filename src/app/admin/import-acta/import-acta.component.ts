import { Component, OnInit } from "@angular/core";
import { ActaService } from "../../services/preacta/preacta.service";
import * as XLSX from "xlsx";
type AOA = any[][];
import swal from "sweetalert2";

@Component({
  selector: "app-import-acta",
  templateUrl: "./import-acta.component.html",
  styleUrls: ["./import-acta.component.scss"],
  providers: [ActaService]
})
export class ImportActaComponent implements OnInit {
  public company;
  public contract;
  public date;
  public state;
  public loader = true;
  data_response;
  public btm_acta = true;
  public btm_export = true;

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: "xlsx", type: "array" };
  fileName: string = "Preacta.xlsx";

  constructor(private actaservice: ActaService) {}

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
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

  Preacta() {
    
    if (this.date == undefined) {
      swal("", "La Fecha esta vacia", "error");
      return;
    }
    this.loader = false;
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    let params = {
      data: this.data,
      contract: this.contract,
      company: this.company,
      date: this.date
    };

    this.actaservice.validate(params).subscribe(
      result => {
        this.data_response = result.reponse;
        this.loader = true;
        this.btm_export = false;
        this.btm_acta = false;
      },
      error => {}
    );
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data_response);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Preacta");

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  acta() {
    console.log(this.date);
    if (this.date == undefined) {
      swal("", "La Fecha esta vacia", "error");
      return;
    }
    this.loader = false;
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    let params = {
      data: this.data,
      contract: this.contract,
      company: this.company,
      date: this.date
    };

    this.actaservice.upload_acta(params).subscribe(
      result => {
        this.data_response = result.reponse;
        this.loader = true;
      },
      error => {}
    );
  }
}
