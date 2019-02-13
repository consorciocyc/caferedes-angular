import { Component, OnInit, ViewChild } from "@angular/core";
import { ListService } from "../../services/list/list.service";
import { FileUtil } from "./file.util";
import { Constants } from "./control-series.constants";
import { constantes } from '../../utilitis/constantes';
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { SeriesService } from "../../services/series/series.service";

import swal from "sweetalert2";
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

  constructor(
    private ListService: ListService,
    private _fileUtil: FileUtil,
    private datatableservice: DatatablesService,
    private SeriesService: SeriesService
  ) {
    this.datatables = new datatables();
    this.constantes = new constantes();
  }

  @ViewChild("fileImportInput") fileImportInput: any;
  csvRecords = [];

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.url = this.constantes.getRouterUrl()
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

  fileChangeListener($event): void {
    var text = [];
    var target = $event.target || $event.srcElement;
    var files = target.files;

    if (Constants.validateHeaderAndRecordLengthFlag) {
      if (!this._fileUtil.isCSVFile(files[0])) {
        alert("Please import valid .csv file.");
        this.fileReset();
      }
    }

    var input = $event.target;
    var reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = data => {
      let csvData = reader.result;
      let csvRecordsArray = csvData.split(/\r\n|\n/);

      var headerLength = -1;
      if (Constants.isHeaderPresentFlag) {
        let headersRow = this._fileUtil.getHeaderArray(
          csvRecordsArray,
          Constants.tokenDelimeter
        );
        headerLength = headersRow.length;
      }

      this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(
        csvRecordsArray,
        headerLength,
        Constants.validateHeaderAndRecordLengthFlag,
        Constants.tokenDelimeter
      );
      this.table();
      if (this.csvRecords == null) {
        //If control reached here it means csv file contains error, reset file.
        this.fileReset();
      }
    };

    reader.onerror = function() {
      alert("Unable to read " + input.files[0]);
    };
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }

  table() {
    let array = [];
    for (let j = 0; j < this.csvRecords.length; j++) {
      let serie_nro_serie = this.csvRecords[j][0];
      let serie_flujo = this.csvRecords[j][1];
      let serie_codigo = this.csvRecords[j][2];
      let serie_marca = this.csvRecords[j][3];
      let serie_lote = this.csvRecords[j][4];
      let serie_entrega = this.csvRecords[j][5];
      let serie_caja = this.csvRecords[j][6];
      let serie_fecha = this.csvRecords[j][7];
      let serie_obs = this.csvRecords[j][8];

      array.push({
        checkbox: false,
        serie_nro_serie: serie_nro_serie,
        serie_flujo: serie_flujo,
        serie_codigo: serie_codigo,
        serie_marca: serie_marca,
        serie_lote: serie_lote,
        serie_entrega: serie_entrega,
        serie_caja: serie_caja,
        serie_fecha: serie_fecha,
        serie_obs: serie_obs
      });
    }

    this.rowDatatable = array;
    console.log(this.rowDatatable);
    this.datatables.reInitDatatable("#example");
  }

  Onsave() {
    console.log(this.rowDatatable);

    let params = {
      data: this.rowDatatable,
      company: this.company,
      contract: this.contract,
      cellar: this.cellarsave
    };

    this.SeriesService.insert(params).subscribe(
      result => {
        if (result.data == true) {
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
    console.log("prueba");

    let params = {
      date_ini: this.ini_date,
      date_end: this.end_date,
      cellar: this.cellarsearch
    };

    this.SeriesService.search(params).subscribe(
      result => {
        this.addRow(result.search);
      },
      error => {}
    );
  }

  public addRow(datos): void {
    this.rowDatasearch = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.rowDatasearch.push(data1);
    }
    this.datatables.reInitDatatable("#searchtable");
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
        window.open( this.url + result.data);
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

    if(row.serie_estado==1){

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
  searchs(){

    let params={series:this.series}
    this.SeriesService.searchs(params).subscribe(result=>{
      this.rowDatasearch=result.search;

    },error=>{
      
    })
  }
}
