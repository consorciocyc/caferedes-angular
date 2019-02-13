import { Component, OnInit } from "@angular/core";
import { Routes, Router } from "@angular/router";
import { ExternalService } from "../../services/external/external.service";
import { ListService } from "../../services/list/list.service";
import { constantes } from "../../utilitis/constantes";


import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";

@Component({
  selector: "app-external",
  templateUrl: "./external.component.html",
  styleUrls: ["./external.component.scss"],
  providers: [ListService, ExternalService]
})
export class ExternalComponent implements OnInit {
  public codemate;
  public oti;
  public search_codigo;
  public search_oti;
  public company;
  public list_city;
  public obr_municipio;
  public queryParams;
  public params;
  public addrees;
  public constantes;
  public url;
  public contract;

  public search_addrees;
  constructor(
    private ListService: ListService,
    private router: Router,
    private ExternalService: ExternalService,
    public http: Http
  ) {
    this.constantes = new constantes();
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.url = this.constantes.getRouter();
    this.search_codigo =
      this.url +
      "external/autoconsecutive?term=:keyword&contract=" +
      this.contract;
    this.search_oti =
      this.url + "external/oti?term=:keyword&contract=" + this.contract;
    this.search_addrees =
      this.url +
      "external/autocomplete_addrees?term=:keyword&contract=" +
      this.contract;
  }

  ngOnInit() {
    this.get_municipality(5);
  }

  get_municipality(id: number) {
    let params = { id_departamento: id };
    let url = "departamentos/municipios";
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_city = res.municipality;
      },
      error => {
        console.log(error);
      }
    );
  }

  search_consec() {
    let params = this.codemate.obr_consecutivo;
    this.buscar(params);
  }
  buscar(params) {
    this.router.navigate(["/admin/obra_externa/detalles_obra"], {
      queryParams: params
    });
  }

  se_oti() {
    let params = {
      oti: this.oti.obr_anillos_ot,
      company: this.company
    };

    this.ExternalService.se_oti(params).subscribe(
      result => {
        this.codemate = result.consecutive.obr_anillos_consecutivo;
        let params = result.consecutive.obr_anillos_consecutivo;
        this.buscar(params);
      },
      error => {}
    );
  }
  valueChanged(event) {
    this.obr_municipio = "";
    this.addrees = "";
    let params = event.idobr_anillos;
    this.queryParams = event.idobr_externa;
    this.params = "oti";
    this.router.navigate(["/admin/obra_externa/obra"], {
      queryParams: { queryParams: params, params: "oti" }
    });
  }
  search_muni() {
    this.oti = "";
    this.addrees = "";
    let params = this.obr_municipio;
    this.queryParams = this.obr_municipio;
    this.params = "municipio";
    this.router.navigate(["/admin/obra_externa/obra"], {
      queryParams: { queryParams: params, params: "municipio" }
    });
  }

  changeaddrees(event) {
    this.oti = "";
    this.obr_municipio = "";
    let params = event.target.value;
    this.queryParams = event.target.value;
    this.params = "addrees";
    this.router.navigate(["/admin/obra_externa/obra"], {
      queryParams: { queryParams: params, params: "addrees" }
    });
  }

  changeconsec(event) {
    this.oti = "";
    this.obr_municipio = "";
    this.addrees = "";

    let params = this.codemate.idobr_externa;
    this.queryParams = this.codemate.idobr_externa;
    this.params = "consec";
    this.router.navigate(["/admin/obra_externa/obra"], {
      queryParams: { queryParams: params, params: "consec" }
    });
  }
}
