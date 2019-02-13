import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ExternalService } from "../../../services/external/external.service";
import { DatatablesService } from "../../../services/datatables/datatables.service";
import { datatables } from "../../../utilitis/datatables";

@Component({
  selector: "app-external-work",
  templateUrl: "./external-work.component.html",
  styleUrls: ["./external-work.component.scss"],
  providers: [ExternalService]
})
export class ExternalWorkComponent implements OnInit {
  public sub;
  public company;
  public datatables;
  public data = [];
  public param;
  public params;
  public contract;
  constructor(
    private ExternalService: ExternalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.datatables = new datatables();
  }

  ngOnInit() {
    this.datatables.initDatatable("#table");
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");

    this.route.queryParams.subscribe(params => {
      this.param = params["queryParams"];
      this.params = params["params"];

      if (this.params == "municipio") {
        this.search_municipaly(this.param);
      }

      if (this.params == "oti") {
        this.search_oti(this.param);
      }

      if (this.params == "addrees") {
        this.search_addrees(this.param);
      }

      if (this.params == "consec") {
        console.log(this.param);
        this.search_params_consec(this.param);
      }
    });
  }

  search_municipaly(municipio) {
    let params = { contract: this.contract, municipio: municipio };
    this.ExternalService.search_municipaly(params).subscribe(
      result => {
        console.log(result);
        this.data = result.consecutive;
        this.datatables.reInitDatatable("#table");
      },
      error => {}
    );
  }

  search_oti(oti) {
    let params = { idoti: oti };
    this.ExternalService.search_params_oti(params).subscribe(
      result => {
        this.data = result.response;
        this.datatables.reInitDatatable("#table");
      },
      error => {}
    );
  }

  search_addrees(addrees) {
    let params = { contract: this.contract, addrees: addrees };
    this.ExternalService.search_params_addrees(params).subscribe(
      result => {
        this.data = result.response;
        this.datatables.reInitDatatable("#table");
      },
      error => {}
    );
  }

  search_params_consec(consec) {
    let params = { contract: this.contract, consec: consec };
    this.ExternalService.search_params_consec(params).subscribe(
      result => {
        this.data = result.response;
        this.datatables.reInitDatatable("#table");
      },
      error => {}
    );
  }
  seach_conse(event) {
    let idobr_externa = event.target.value;

    this.router.navigate(["/admin/obra_externa/detalles_obra"], {
      queryParams: { queryParams: idobr_externa }
    });
  }
}
