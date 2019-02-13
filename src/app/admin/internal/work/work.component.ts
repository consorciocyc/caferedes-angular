import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { InternalService } from "../../../services/internal/internal.service";
@Component({
  selector: "app-work",
  templateUrl: "./work.component.html",
  styleUrls: ["./work.component.scss"],
  providers: [InternalService]
})
export class WorkComponent implements OnInit {
  public company;
  public param;
  public valor;
  public rowDatatable = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private InternalService: InternalService
  ) {}

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.route.queryParams.subscribe(params => {
      this.param = params["queryParams"];
      this.valor = params["valor"];

      if (this.valor == "pedido") {
        this.searchpedido(this.param);
      }

      if (this.valor == "cedula") {
        this.searchcedula(this.param);
      }

      if (this.valor == "address") {
        this.searchaddress(this.param);
      }
      if (this.valor == "instal") {
        this.searchainstall(this.param);
      }

      if (this.valor == "consec") {
        this.searchConsec(this.param);
      }
    });
  }

  searchConsec(param) {
    let params = { company: this.company, consec: param };
    this.InternalService.search_consec(params).subscribe(
      result => {
        this.rowDatatable = result.result;
      },
      error => {}
    );
  }
  searchpedido(param) {
    let params = { company: this.company, pedido: param };
    this.InternalService.search(params).subscribe(
      result => {
        this.rowDatatable = result.result;
      },
      error => {}
    );
  }

  searchcedula(param) {
    let params = { company: this.company, cedula: param };
    this.InternalService.search_cedula(params).subscribe(
      result => {
        this.rowDatatable = result.result;
      },
      error => {}
    );
  }

  searchaddress(param) {
    let params = { company: this.company, address: param };
    this.InternalService.searchaddress(params).subscribe(
      result => {
        this.rowDatatable = result.result;
      },
      error => {}
    );
  }

  searchainstall(param) {
    let params = { company: this.company, install: param };
    this.InternalService.searchainstall(params).subscribe(
      result => {
        this.rowDatatable = result.result;
      },
      error => {}
    );
  }

  searcobr(event) {
    let data = event.target.value;
    this.router.navigate(["/admin/internas/detalles"], {
      queryParams: { queryParams: data }
    });
  }
}
