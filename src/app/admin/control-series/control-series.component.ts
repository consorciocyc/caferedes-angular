import { Component, OnInit, ViewChild } from "@angular/core";
import { ListService } from "../../services/list/list.service";
import { FileUtil } from "./file.util";
import { constantes } from "../../utilitis/constantes";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { SeriesService } from "../../services/series/series.service";

import swal from "sweetalert2";
import * as XLSX from "xlsx";
type AOA = any[][];

@Component({
  selector: "app-control-series",
  templateUrl: "./control-series.component.html",
  styleUrls: ["./control-series.component.scss"],
  providers: [ListService, DatatablesService, SeriesService]
})
export class ControlSeriesComponent implements OnInit {
  public company;
  public contract;
  public empresa;
  public contrato;
  public cellar;
  public cellarsearch;
  public ini_date;
  public end_date;
  public tipomedidor;
  public rowDatatable = [];
  public myJsonString;
  public datatables;
  public checkbox = false;
  public cellarsave;
  public rowDatasearch = [];
  public buttonDisabled;
  public btn_add = true;
  public series;
  public constantes;
  public url;
  public btn_save = false;

  public loader = true;

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: "xlsx", type: "array" };
  fileName: string = "SheetJS.xlsx";

  constructor(
    private ListService: ListService,
    private _fileUtil: FileUtil,
    private datatableservice: DatatablesService,
    private SeriesService: SeriesService
  ) {
    this.datatables = new datatables();
    this.constantes = new constantes();
  }

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.url = this.constantes.getRouterUrl();
    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");
    this.get_cellar(this.company);
    this.tipo_medidor();
  }
  get_cellar(idcompany) {
    this.ListService.cellar(this.company).subscribe(
      res => {
        this.cellar = res.cellar;
      },
      error => {
        console.log(error);
      }
    );
  }

  tipo_medidor() {
    this.ListService.tipo_medidor().subscribe(
      res => {
        this.tipomedidor = res.tipo_medidor;
      },
      error => {
        console.log(error);
      }
    );
  }

  addrowtable() {
    this.rowDatatable.push({});
    console.log("prueba");
  }

  onFileChange(evt: any) {
    this.data = [];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error("Cannot use multiple files");
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {
        type: "binary",
        cellDates: true,
        cellText: false,
        cellNF: false
      });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, {
        raw: false,
        header: "A",
        dateNF: "YYYY-MM-DD"
      });

      this.data;
      this.rowDatatable = this.data;
      this.datatables.reInitDatatable4("#example");
    };
    reader.readAsBinaryString(target.files[0]);
  }

  Onsave() {
    this.loader = false;
    this.btn_save = true;

    let params = {
      data: this.rowDatatable,
      company: this.company,
      contract: this.contract,
      cellar: this.cellarsave
    };

    this.SeriesService.insert(params).subscribe(
      result => {
        if (result.data == true) {
          this.loader = true;
          swal("", "Se han Guardado los medidores ", "success");
        }
      },
      error => {}
    );
  }

  seleccionar(index: number, row: any) {
    row.checkbox = true;
  }

  search() {
    this.loader = false;
    let params = {
      date_ini: this.ini_date,
      date_end: this.end_date,
      cellar: this.cellarsearch,
      contract: this.contract
    };

    this.SeriesService.search(params).subscribe(
      result => {
        this.loader = true;
        this.rowDatasearch = result.search;
        this.datatables.reInitDatatable("#searchtable");
      },
      error => {}
    );
  }

  handleClick(index: number, newrow: any) {
    let params = { data: newrow };

    this.SeriesService.update(params).subscribe(
      result => {
        if (result.result == true) {
          swal("", "Se Ha Atualizado", "success");
        }
      },
      error => {}
    );
  }

  btn_true() {
    this.btn_add = false;
  }

  // funcion para imprimir antes de guardar
  print() {
    let params = { company: this.company, data: this.rowDatatable };
    this.SeriesService.print(params).subscribe(
      result => {
        window.open(this.url + result.data);
      },
      error => {}
    );
  }

  // funcion para imprimir despues de guardar o a posterior
  printsave() {
    let params = { company: this.company, data: this.rowDatasearch };
    this.SeriesService.print(params).subscribe(
      result => {
        window.open(this.url + result.data);
      },
      error => {}
    );
  }

  // funcion para eliminar la serie
  delete(index: number, row: any) {
    let params = {
      idseries: row.idseries
    };

    if (row.serie_estado == 1) {
      swal("", "El serial no puede estar Disponible", "error");
      return;
    }
    this.SeriesService.delete(params).subscribe(
      result => {
        if (result.result == true) {
          swal("", "Se ha Eliminado La Serie", "success");
          row.state = "Eliminado";
        }
      },
      error => {}
    );
  }

  // funcion para buscar por numero de serie
  searchs() {
    let params = { series: this.series };
    this.SeriesService.searchs(params).subscribe(
      result => {
        this.rowDatasearch = result.search;
      },
      error => {}
    );
  }
}
