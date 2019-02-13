import { Component, OnInit } from "@angular/core";
import { PermitsService } from "../../services/permisos/permits.service";
import { ListService } from "../../services/list/list.service";
import { Contract } from "../../models/contract.model";
import { ContractService } from "../../services/contract/contrac.service";
import { constantes } from "../../utilitis/constantes";
import swal from "sweetalert2";
@Component({
  selector: "app-contracts",
  templateUrl: "./contracts.component.html",
  styleUrls: ["./contracts.component.scss"],
  providers: [PermitsService, ContractService]
})
export class ContractsComponent implements OnInit {
  public permisos;
  public list_contrac;
  public company;
  public contract_model;
  public state;
  public btn_insert;
  public contract;
  public constantes;
  public permiso;

  public btn_update;

  constructor(
    private _PermitsService: PermitsService,
    private ListService: ListService,
    private ContractService: ContractService
  ) {
    this.contract_model = new Contract();
    this.constantes = new constantes();
  }
  ngOnInit() {
    this.getPermits();
    this.items_state();
    this.btn_update = true;
  }

  /*Obtener los permisos del menu*/
  getPermits() {
    this.permiso = this.constantes.getPermist().Contratos;
    console.log(this.permiso);
    this.company = localStorage.getItem("company");
    this._PermitsService.getPermits(this.permiso, "Contratos");
    this.permisos = this._PermitsService.getPermitsSubMenu("Contratos");

    this.get_contract();
    this.permisos = this._PermitsService.getPermitsSubMenu("users");
    console.log(this.permisos);
  }

  get_contract() {
    let params = { company: this.company };
    let url = "list/contract";

    this.ListService.get_list(url, params).subscribe(
      result => {
        this.list_contrac = result.contract;
      },
      error => {}
    );
  }

  items_state() {
    this.ListService.state().subscribe(
      result => {
        console.log(result);
        this.state = result.states;
      },
      error => {}
    );
  }

  Onsave() {
    if (this.permisos.save == 1) {
      let params = { data: this.contract_model, company: this.company };
      this.ContractService.insert(params).subscribe(
        result => {
          if (result.response == true) {
            swal("", "Se ha Creado el Contrato", "success");
          } else {
            swal("", "Comuniquese al Area de Sistemas", "error");
          }
        },
        error => {}
      );
    } else {
      swal("", "No Cuenta con Permisos", "error");
    }
  }

  search() {
    let params = { contract: this.contract, company: this.company };
    this.ContractService.search(params).subscribe(
      result => {
        this.contract_model = result.search;
        this.btn_insert = true;
        this.btn_update = false;
      },
      error => {}
    );
  }

  update() {
    if (this.permisos.update == 1) {
      let params = { data: this.contract_model, company: this.company };
      this.ContractService.update(params).subscribe(
        result => {
          if (result.response == true) {
            swal("", "Se ha Atualizo el Contrato", "success");
          } else {
            swal("", "Comuniquese al Area de Sistemas", "error");
          }
        },
        error => {}
      );
    } else {
      swal("", "No Cuenta con Permisos", "error");
    }
  }
}
