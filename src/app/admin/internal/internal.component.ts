import { Component, OnInit } from "@angular/core";
import { Routes, Router } from "@angular/router";
import { ContractService } from "../../services/contract.service";
import { constantes } from "../../utilitis/constantes";

@Component({
  selector: "app-internal",
  templateUrl: "./internal.component.html",
  styleUrls: ["./internal.component.scss"]
})
export class InternalComponent implements OnInit {
  public consecutive;
  public pedido;
  public ot;
  public cedula;
  public address;
  public instal;
  public active;
  public constantes;
  public url;

  //bariables de busqueda
  public SearchConsecutive;
  public SearchPedido;
  public SearchOt;
  public SearchCedula;
  public SearchAddress;
  public SearchInstal;
  public pageNum;
  public company;
  public salir1 = false;
  public routerLinkVariable;
  public queryParams;
  public valor;
  public queryParam;

  constructor(private router: Router, private parametros: ContractService) {
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.company = localStorage.getItem("company");

    this.SearchConsecutive =
      this.url + "interna/search_consec?term=:keyword&company=" + this.company;
    this.SearchPedido =
      this.url + "interna/search_pedido?term=:keyword&company=" + this.company;

    this.SearchCedula =
      this.url + "interna/search_cedula?term=:keyword&company=" + this.company;

    this.SearchAddress =
      this.url + "interna/search_address?term=:keyword&company=" + this.company;

    this.SearchInstal =
      this.url + "interna/search_instal?term=:keyword&company=" + this.company;
  }

  ngOnInit() {
    this.parametros.TObri.subscribe(data => this.parasm(data));
  }

  parasm(data) {
    this.pageNum = data.consecutive;
    this.queryParams = data.queryParams;
  }
  PedidoChanged() {
    let params = this.pedido;
    this.router.navigate(["/admin/internas/obra"], {
      queryParams: { queryParams: params, valor: "pedido" }
    });

    (this.queryParam = this.pedido), (this.valor = "pedido");
  }

  cedulaChanged() {
    let params = this.cedula;
    this.router.navigate(["/admin/internas/obra"], {
      queryParams: { queryParams: params, valor: "cedula" }
    });

    (this.queryParam = this.cedula), (this.valor = "cedula");
  }

  addressChanged() {
    let params = this.address;
    this.router.navigate(["/admin/internas/obra"], {
      queryParams: { queryParams: params, valor: "address" }
    });

    (this.queryParam = this.address), (this.valor = "address");
  }

  instalChanged() {
    let params = this.instal;
    this.router.navigate(["/admin/internas/obra"], {
      queryParams: { queryParams: params, valor: "instal" }
    });

    (this.queryParam = this.instal), (this.valor = "instal");
  }

  ConsecChanged() {
    let params = this.consecutive;
    this.router.navigate(["/admin/internas/obra"], {
      queryParams: { queryParams: params, valor: "consec" }
    });

    (this.queryParam = this.consecutive), (this.valor = "consec");
  }
}
