import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { constantes } from "../../utilitis/constantes";
import { PermitsService } from "../../services/permisos/permits.service";
import { ListService } from "../../services/list/list.service";
import swal from "sweetalert2";
import { Routes, Router } from "@angular/router";
import { CustomValidators } from "ng2-validation";
import { datatables } from "../../utilitis/datatables";
import { PaymentService } from "../../services/payment-activity/payment.service";
import { PayActiviti } from "../../models/payment.model";

@Component({
  selector: "app-payment-activities",
  templateUrl: "./payment-activities.component.html",
  styleUrls: ["./payment-activities.component.scss"],
  providers: [PaymentService, ListService, PermitsService, datatables]
})
export class PaymentActivitiesComponent implements OnInit {
  public state_obra = [];
  public state_pay = [];
  public constantes;
  public url;
  public datatables;
  public company;
  public contract;
  public Searchemployee;
  public employee;
  public idemployee;
  public list_gangs;
  public date_end;
  public date_ini;
  public id_gangs;
  public list_searchpay;
  public list_searc_total;
  public loader = true;
  public payhideen = false;
  public detailhidden = true;
  public consultapago = true;

  public date_ini1;
  public date_end2;
  public employee1;

  public payactiviti: PayActiviti;

  public employeepay;
  public total;
  public vpuntos;
  public opay;
  public btnpay;
  public btnupdate = true;
  public idemployee1;
  public search_pay;
  public url_api;

  @ViewChild("detalles") detalles: ElementRef;
  @ViewChild("pago") pago: ElementRef;
  constructor(
    private PermitsService: PermitsService,
    private ListService: ListService,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.constantes = new constantes();
    this.datatables = new datatables();
    this.payactiviti = new PayActiviti();
    this.url = this.constantes.getRouter();
    this.url_api = this.constantes.getRouterApi();
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.Searchemployee = this.url + "employee/searc_employee?term=:keyword";
  }

  ngOnInit() {
    this.state();
    this.state_activity();
    this.get_place_gangs();
    this.payactiviti.meta = 0;
    this.payactiviti.saldo = 0;
    this.payactiviti.tpay = 0;
    this.payactiviti.vpuntos = 0;
    this.payactiviti.opay = 0;
    this.payactiviti.odesc = 0;
    this.payactiviti.presta = 0;
    this.payactiviti.total = 0;
  }

  state() {
    this.paymentService.state().subscribe(
      result => {
        this.state_obra = result.state_obr;
      },
      error => {}
    );
  }

  state_activity() {
    this.paymentService.state_activity().subscribe(
      result => {
        this.state_pay = result.response;
      },
      error => {}
    );
  }
  get_place_gangs() {
    let url = "list/gangs";
    let company = localStorage.getItem("company");
    let params = { company: company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_gangs = res.gangs;
      },
      error => {
        console.log(error);
      }
    );
  }
  Changed() {
    if (this.employee == "") {
      this.idemployee = "";
    } else {
      this.idemployee = this.employee.idemployees;
    }
  }
  Changed1() {
    if (this.employee1 == "") {
      this.idemployee1 = "";
    } else {
      this.idemployee1 = this.employee1.idemployees;
    }
  }
  search() {
    this.loader = false;
    let params = {
      data_ini: this.date_ini,
      date_end: this.date_end,
      idemployee: this.idemployee,
      state_data: this.state_obra,
      state_pay: this.state_pay
    };
    this.paymentService.search(params).subscribe(
      result => {
        this.list_searchpay = result.search;
        this.datatables.reInitDatatable("#searchtable");
        this.loader = true;
      },
      error => {}
    );
  }

  view(event) {
    this.btnpay = false;
    this.btnupdate = true;
    this.payactiviti = new PayActiviti();
    this.payactiviti.meta = 0;
    this.payactiviti.saldo = 0;
    this.payactiviti.tpay = 0;
    this.payactiviti.vpuntos = 0;
    this.payactiviti.opay = 0;
    this.payactiviti.odesc = 0;
    this.payactiviti.presta = 0;
    this.payactiviti.total = 0;
    let data = event.target.value;
    let data1 = data.split(",");
    let idemplo = data1[0];
    let name = data1[1];
    this.loader = false;
    this.payhideen = true;
    this.detailhidden = false;

    this.idemployee = idemplo;

    this.detalles.nativeElement.click();
    let params = {
      data_ini: this.date_ini,
      date_end: this.date_end,
      idemployee: this.idemployee,
      name: name,
      state_data: this.state_obra,
      state_pay: this.state_pay
    };
    this.paymentService.search_total(params).subscribe(
      result => {
        this.list_searc_total = [{}];
        this.list_searc_total = result.search;
        this.payactiviti.employeepay = result.name;

        this.datatables.reInitDatatable1("#searchtable1");
        this.loader = true;
        let total = 0;
        Number(total);
        for (var e in this.list_searc_total) {
          total += this.list_searc_total[e].total;
        }

        this.payactiviti.total = Number(total.toFixed(2));
      },
      error => {}
    );
  }

  operaciones() {
    this.payactiviti.saldo = this.payactiviti.total - this.payactiviti.meta;

    let totalpago =
      this.payactiviti.vpuntos * this.payactiviti.saldo +
      Number(this.payactiviti.opay) -
      Number(this.payactiviti.odesc) -
      Number(this.payactiviti.presta);

    this.payactiviti.tpay = Number(totalpago.toFixed(2));
  }

  pay() {
    let params = {
      data: this.payactiviti,
      idemployee: this.idemployee,
      data_ini: this.date_ini,
      date_end: this.date_end
    };

    this.paymentService.pay(params).subscribe(
      result => {
        if (result.status == "ok") {
          swal("", "Pago Realizado Exitozamente", "success");
        }
      },
      error => {}
    );
  }

  pagos() {
    this.pago.nativeElement.click();
    this.payhideen = false;
    this.detailhidden = true;
    this.consultapago = true;
    this.idemployee = "";
  }

  consultapagos() {
    this.payhideen = true;
    this.detailhidden = true;
    this.consultapago = false;
  }

  detallestab() {
    this.payhideen = true;
    this.detailhidden = false;
    this.consultapago = true;
    this.hoy();
  }

  searchpay() {
    let params = {
      idemployee: this.idemployee1,
      data_ini: this.date_ini1,
      date_end: this.date_end2
    };
    this.paymentService.searchpay(params).subscribe(
      result => {
        this.search_pay = result.response;
        this.datatables.reInitDatatable("#searchtablepay");
      },
      error => {}
    );
  }

  viewpay(event) {
    this.detalles.nativeElement.click();

    let data = event.target.value;
    let data1 = data.split(",");
    let idemplo = data1[0];
    let name = data1[1];
    let idpay_activity = data1[2];
    this.loader = false;
    this.payhideen = true;
    this.detailhidden = false;
    this.consultapago = true;
    this.idemployee = idemplo;
    let params = {
      idemployee: idemplo,
      name: name,
      idpay_activity: idpay_activity
    };

    this.paymentService.search_payupdate(params).subscribe(
      result => {
        this.list_searc_total = [{}];
        this.list_searc_total = result.search;
        console.log(result.search);
        this.loader = true;

        this.btnpay = true;
        this.btnupdate = false;
        this.payactiviti = result.pay;
        this.payactiviti.employeepay = result.name;
        this.datatables.reInitDatatable1("#searchtable1");
      },
      error => {}
    );
  }

  update() {
    let params = {
      data: this.payactiviti,
      idemployee: this.idemployee
    };

    this.paymentService.payupdate(params).subscribe(
      result => {
        if (result.status == "ok") {
          swal("", "Pago Atualizado", "success");
        }
      },
      error => {}
    );
  }

  hoy() {
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

    this.payactiviti.datepay = hoy;
  }

  print(){
    window.open(
      this.url_api + "pay_activity/print?id_pay=" + this.payactiviti.idpay+"&idemployee="+this.idemployee+"&name="+this.payactiviti.employeepay
    );
  }
}
