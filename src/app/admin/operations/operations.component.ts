import { Component, OnInit } from "@angular/core";
import { constantes } from "../../utilitis/constantes";
import { Routes, Router } from "@angular/router";
import { ContractService } from "../../services/contract.service";

@Component({
  selector: "app-operations",
  templateUrl: "./operations.component.html",
  styleUrls: ["./operations.component.scss"]
})
export class OperationsComponent implements OnInit {
  public SearchConsecutive;
  public company;
  public url;
  public constantes;
  public pedido;

  public pageNum;
  public queryParams;
  public consecutive;
  public queryParam;
  public valor;
  public SearchPedido;

  constructor(private router: Router, private parametros: ContractService) {
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.company = localStorage.getItem("company");
    this.SearchConsecutive =
      this.url +
      "operaction/search_consec?term=:keyword&company=" +
      this.company;
    this.SearchPedido =
      this.url +
      "operaction/search_pedido?term=:keyword&company=" +
      this.company;
  }

  ngOnInit() {
    this.parametros.TObri.subscribe(data => this.parasm(data));
  }

  parasm(data) {
    this.pageNum = data.consecutive;
    this.queryParams = data.queryParams;
  }

  ConsecChanged() {
    let params = this.consecutive.id_oym;
    this.router.navigate(["admin/operaciones/obra"], {
      queryParams: { queryParams: params, valor: "consec" }
    });
    this.queryParams = this.consecutive.id_oym;
    this.valor = "consec";
  }

  PedidoChanged() {
    let params = this.pedido.id_oym;
    this.router.navigate(["admin/operaciones/obra"], {
      queryParams: { queryParams: params, valor: "consec" }
    });
    this.queryParams = this.pedido.id_oym;
    this.valor = "consec";
  }
}
