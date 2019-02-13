import $ from "jquery";
import "datatables.net-bs4/js/dataTables.bootstrap4";

export class datatables {
  constructor() {}

  public tableWidget: any;
  public tableWidget1: any;
  public tableWidget2: any;
  public idtable: any;

  public initDatatable(table): void {
    let exampleId: any = $(table);
    let exampleId2: any = $(table + "td input");

    this.idtable = exampleId;
    this.tableWidget = exampleId.DataTable({
      select: true,
      lengthMenu: [[5, 10, 20, 100, -1], [5, 10, 20, 50, 100, "Todo"]],
      columnDefs: [{ type: "html-input", targets: [1, 2, 3] }],
      zeroRecords: "NO HAY RESULTADOS",

      language: {
        paginate: {
          first: "Primera",
          last: "Última ",
          next: "Siguiente",
          previous: "Anterior"
        },
        lengthMenu: "MOSTRAR _MENU_",
        emptyTable: "No hay datos disponibles en la tabla",
        search: "BUSCAR"
      }
    });

    exampleId2.on("change", function() {
      var $td = $(this).parent();
      $td.find("input").attr("value", this.value);
      this.tableWidget
        .cell($td)
        .invalidate()
        .draw();
    });
  }

  public initDatatablexcroll(table): void {
    let exampleId: any = $(table);
    this.tableWidget1 = exampleId.DataTable({
      scrollX: true,
      select: true,
      lengthMenu: [[10, 20, 50, 100, -1], [10, 20, 50, 100, "Todo"]],
      zeroRecords: "NO HAY RESULTADOS",

      language: {
        paginate: {
          first: "Primera",
          last: "Última ",
          next: "Siguiente",
          previous: "Anterior"
        },
        lengthMenu: "MOSTRAR _MENU_",
        emptyTable: "No hay datos disponibles en la tabla",
        search: "BUSCAR"
      }
    });
  }


  public initDatatablenumeber(table, array, array1): void {
    let exampleId: any = $(table);
    this.tableWidget1 = exampleId.DataTable({
      scrollX: true,
      select: true,
      lengthMenu: [[10, 20, 50, 100, -1], [10, 20, 50, 100, "Todo"]],
      zeroRecords: "NO HAY RESULTADOS",

      language: {
        paginate: {
          first: "Primera",
          last: "Última ",
          next: "Siguiente",
          previous: "Anterior"
        },
        lengthMenu: "MOSTRAR _MENU_",
        emptyTable: "No hay datos disponibles en la tabla",
        search: "BUSCAR"
      }
    });
  }

  public initDatatable2(table): void {
    let exampleId: any = $(table);

    this.idtable = exampleId;
    this.tableWidget2 = exampleId.DataTable({
      select: true,
      lengthMenu: [[5, 10, 50, 100, -1], [5, 10, 20, 50, 100, "Todo"]],
      zeroRecords: "NO HAY RESULTADOS",

      language: {
        paginate: {
          first: "Primera",
          last: "Última ",
          next: "Siguiente",
          previous: "Anterior"
        },
        lengthMenu: "MOSTRAR _MENU_",
        emptyTable: "No hay datos disponibles en la tabla",
        search: "BUSCAR"
      }
    });
  }

  public reInitDatatable(table): void {
    if (this.tableWidget) {
      this.tableWidget.destroy();
      this.tableWidget = null;
    }
    setTimeout(() => this.initDatatable(table), 0);
  }

  public reInitDatatable1(table, array, array1): void {
    if (this.tableWidget1) {
      this.tableWidget1.destroy();
      this.tableWidget1 = null;
    }
    setTimeout(() => this.initDatatablenumeber(table, array, array1), 0);
  }

  public reInitDatatable2(table): void {
    if (this.tableWidget2) {
      this.tableWidget2.destroy();
      this.tableWidget2 = null;
    }
    setTimeout(() => this.initDatatable2(table), 0);
  }



  public reInitDatatable4(table): void {
    if (this.tableWidget) {
      this.tableWidget.destroy();
      this.tableWidget = null;
    }
    setTimeout(() => this.initDatatablexcroll(table), 0);
  }

}
