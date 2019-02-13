import { Component, OnInit } from "@angular/core";
import { constantes } from "../../../utilitis/constantes";
import { Pqr } from "../../../models/pqr.models";
import { PqrService } from "../../../services/pqr/pqr.service";
import { datatables } from "../../../utilitis/datatables";
import swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-complaints",
  templateUrl: "./complaints.component.html",
  styleUrls: ["./complaints.component.scss"],
  providers: [PqrService, constantes, datatables]
})
export class ComplaintsComponent implements OnInit {
  public constantes: constantes;
  public url;
  public states;
  public Searchemployee;
  public origin;
  public typepqr;
  public reasonpqr;
  public typequeja;
  public idwork;
  public table;
  public company;
  public SearchConsecutive;

  public btnupdate;
  public btninsert;
  public btnnew;
  public type;

  public pqr_model = new Pqr();
  constructor(
    private datatables: datatables,
    private pqrservice: PqrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.constantes = new constantes();
    this.url = this.constantes.getRouter();
    this.url = this.constantes.getRouter();
    this.company = localStorage.getItem("company");
    this.Searchemployee = this.url + "employee/searc_employee?term=:keyword";
    this.SearchConsecutive =
      this.url + "interna/search_consec?term=:keyword&company=" + this.company;
  }

  ngOnInit() {
    this.btninsert = false;
    this.btnupdate = true;

    this.route.queryParams.subscribe(params => {
      this.idwork = params["queryParams"];
      this.type = params["type"];

      if (this.idwork != undefined) {
        this.search_pqr(this.idwork);
        if (this.type == 1) {
          this.search_obr(this.idwork);
        }
        if (this.type == 2) {
          this.search_externas(this.idwork);
        }
      }
    });

    this.state_pqr();
    this.origin_pqr();
    this.type_pqr();
    this.type_queja();
  }

  state_pqr() {
    this.pqrservice.state_pqr().subscribe(
      result => {
        this.states = result.data;
      },
      error => {}
    );
  }

  origin_pqr() {
    this.pqrservice.origin_pqr().subscribe(
      result => {
        this.origin = result.data;
      },
      error => {}
    );
  }

  type_pqr() {
    this.pqrservice.type_pqr().subscribe(
      result => {
        this.typepqr = result.data;
      },
      error => {}
    );
  }
  type_queja() {
    this.pqrservice.type_queja().subscribe(
      result => {
        this.typequeja = result.data;
      },
      error => {}
    );
  }
  reaso() {
    let params = { id_type: this.pqr_model.type_complaint };
    this.pqrservice.reason_pqr(params).subscribe(
      result => {
        this.reasonpqr = result.data;
      },
      error => {}
    );
  }

  Responsablepqr() {
    this.pqr_model.Responsable_pqrid = this.pqr_model.Responsable_pqr.idemployees;
  }
  Responsableat() {
    this.pqr_model.Responsable_atid = this.pqr_model.Responsable_at.idemployees;
  }

  Responsableges() {
    this.pqr_model.Responsable_gesid = this.pqr_model.Responsable_ges.idemployees;
  }

  save() {
    let params = { data: this.pqr_model, type: this.type };

    this.pqrservice.save_pqr(params).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Se guardo La Pqr", "success");
          this.search_pqr(this.idwork);
        }
      },
      error => {}
    );
  }

  search_pqr(id_obr) {
    let params = { id_obr: id_obr, type: this.type };
    this.pqrservice.search_pqr(params).subscribe(
      result => {
        this.table = result.response;
      },
      error => {}
    );
  }
  Edit(event) {
    let idpqr = event.target.value;
    let params = { idpqr: idpqr, type: this.type };

    this.pqrservice.edit(params).subscribe(
      result => {
        this.pqr_model = result.response;
        this.btnupdate = false;
        this.btninsert = true;
        this.reaso();
      },
      error => {}
    );
  }

  delete(event) {
    let idpqr = event.target.value;
    let params = { idpqr: idpqr, type: this.type };

    this.pqrservice.delete(params).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Se Elimino La Pqr", "success");
          this.search_pqr(this.idwork);
        }
        this.reaso();
      },
      error => {}
    );
  }

  newpqr() {
    this.pqr_model = new Pqr();
    this.btninsert = false;
    this.btnupdate = true;

    if (this.type == 1) {
      this.search_obr(this.idwork);
    }
    if (this.type == 2) {
      this.search_externas(this.idwork);
    }
  }

  update() {
    let params = { data: this.pqr_model, type: this.type };

    this.pqrservice.update(params).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Se Atualizo La Pqr", "success");
          this.search_pqr(this.idwork);
        }
      },
      error => {}
    );
  }

  search_obr(idobr) {
    let params = { idobr: idobr, type: this.type };

    this.pqrservice.search_obr(params).subscribe(
      result => {
        this.pqr_model.consecutive = result.response.consec;
        this.pqr_model.applicant = result.response.applicant;
        this.pqr_model.address = result.response.address;
        this.pqr_model.Installation = result.response.Installation;
        this.pqr_model.consecutive = result.response.consecutive;
      },
      error => {}
    );
  }

  search_externas(idobr) {
    let params = { idobr: idobr, type: this.type };

    this.pqrservice.search_externas(params).subscribe(
      result => {
        this.pqr_model.consecutive = result.response.consec;
        this.pqr_model.address = result.response.address;
        this.pqr_model.Installation = result.response.Installation;
        this.pqr_model.consecutive = result.response.consecutive;
      },
      error => {}
    );
  }
}
