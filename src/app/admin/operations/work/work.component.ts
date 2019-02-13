import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { OperacionService } from "../../../services/operacion/operacion.service";
@Component({
  selector: "app-work",
  templateUrl: "./work.component.html",
  styleUrls: ["./work.component.scss"],
  providers: [OperacionService]
})
export class WorkComponent implements OnInit {
  public company;
  public param;
  public valor;
  public rowDatatable;
  public queryParams;
  public id;

  constructor(
    private route: ActivatedRoute,
    private OperacionService: OperacionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.company = localStorage.getItem("company");

    this.route.queryParams.subscribe(params => {
      this.param = params["queryParams"];
      this.valor = params["valor"];

      if (this.valor == "consec") {
        this.searchConsec(this.param);
      }
    });
  }

  searchConsec(params) {
    let param = { id_oym: params };
    this.OperacionService.serach_consec(param).subscribe(
      result => {
        this.rowDatatable = result.search;
      },
      error => {}
    );
  }

  searcobr(event) {
    let id = event.target.value;
    this.id = id;
    this.router.navigate(["/admin/operaciones/detalles"], {
      queryParams: { queryParams: id }
    });
  }
}
