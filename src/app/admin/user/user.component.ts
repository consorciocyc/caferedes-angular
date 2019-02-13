import { Component, OnInit } from "@angular/core";
import { constantes } from "../../utilitis/constantes";
import swal from "sweetalert2";
import { UserModel } from "../../models/user_model";
import { UsuarioService } from "../../services/user/usuarios.service";
import { ListService } from "../../services/list/list.service";
import { PermitsService } from "../../services/permisos/permits.service";
import { datatables } from "../../utilitis/datatables";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
  providers: [UsuarioService, ListService, PermitsService, datatables]
})
export class UserComponent implements OnInit {
  public usermodel: UserModel;
  public constantes: constantes;
  public company;
  public list_user;
  public list_profile;
  public btnupdate = true;
  public btninsert;
  public list_states;
  public permisos;
  public Pinsert;
  public Pupdate;
  public Pdelete;
  public datatables: datatables;
  public list_contrac;
  public idprofile;
  public idcontrac;
  public list_contra;
  public idalmacenes;
  public idalmacen;

  constructor(
    private UsuarioService: UsuarioService,
    private ListService: ListService,
    private _PermitsService: PermitsService
  ) {
    this.usermodel = new UserModel();
    this.constantes = new constantes();
    this.datatables = new datatables();
  }

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.getPermits();
    this.list_profiles();
    this.list_state();
  }
  spermits() {
    if (!this.permisos) {
      this.permisos = JSON.parse(localStorage.getItem("Puser"));

      this.Pinsert = this.permisos.save;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
    }
  }

  getPermits() {
    this._PermitsService.getPermits(this.constantes.SUBMENUS.user, "Puser");
  }

  search_init() {
    this.spermits();
    if (this.Pupdate != 1) {
      swal("", "No Tiene Permiso", "error");
      return;
    }
    let params = { idcompany: this.company };
    this.UsuarioService.search_init(params).subscribe(
      result => {
        this.list_user = result.response;
        this.datatables.reInitDatatable("#users");
      },
      error => {}
    );
  }

  list_profiles() {
    let param = {
      company: this.company
    };
    this.ListService.list_profiles(param).subscribe(
      response => {
        this.list_profile = response.profiles;
      },
      error => {
        console.log(error);
      }
    );
  }

  list_state() {
    this.ListService.state().subscribe(
      response => {
        this.list_states = response.states;
      },
      error => {
        console.log(error);
      }
    );
  }

  create_profile() {
    this.spermits();
    if (this.Pinsert != 1) {
      swal("", "No Tiene Permiso", "error");
      return;
    }
    this.usermodel.id_company = this.company;
    this.UsuarioService.create(this.usermodel).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Se Creo Correctamente", "success");
          this.search_init();
        }
      },
      error => {}
    );
  }
  search_user(event) {
    this.spermits();
    if (this.Pupdate != 1) {
      swal("", "No Tiene Permiso", "error");
      return;
    }
    let value = event.target.value;
    let param = {
      idusuarios: value,
      company: this.company
    };
    this.UsuarioService.user_search(param).subscribe(
      result => {
        this.usermodel = result.response;
        this.btninsert = true;
        this.btnupdate = false;
      },
      error => {}
    );
  }
  update_user() {
    this.spermits();
    if (this.Pupdate != 1) {
      swal("", "No Tiene Permiso", "error");
      return;
    }
    this.UsuarioService.update_user(this.usermodel).subscribe(
      result => {
        if (result.response == true) {
          this.search_init();
          swal("", "Se Atualizo Correctamente", "success");
        }
      },
      error => {}
    );
  }

  new_user() {
    this.usermodel = new UserModel();
    this.btnupdate = true;
    this.btninsert = false;
  }

  contratos(event) {
    this.idprofile = event.target.value;
    this.get_type_contrac();
    this.search_contract();
  }

  get_type_contrac() {
    let url = "list/contract";
    let params = { company: this.company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_contrac = res.contract;
      },
      error => {
        console.log(error);
      }
    );
  }

  add_contract() {
    let params = { idprofile: this.idprofile, idcontrac: this.idcontrac };
    this.UsuarioService.add_contract(params).subscribe(
      result => {
        if (result.data == true) {
          swal("", "El Contrato ya esta agregado", "error");
        }

        if (result.data == false) {
          swal("", "El Contrato se agregado", "success");
          this.search_contract();
        }
      },
      error => {}
    );
  }

  search_contract() {
    let params = { idprofile: this.idprofile };
    this.UsuarioService.search_contract(params).subscribe(
      result => {
        this.list_contra = result.data;
      },
      error => {}
    );
  }

  search_cellar() {
    let params = { company: this.company };
    this.UsuarioService.search_cellar(params).subscribe(
      result => {},
      error => {}
    );
  }

  save_cellar() {
    let params = { idalmacen: this.idalmacen };
    this.UsuarioService.save_cellar(params).subscribe(
      result => {},
      error => {}
    );
  }
  delete_cellar() {
    let params = {};
    this.UsuarioService.delete_cellar(params).subscribe(
      result => {},
      error => {}
    );
  }

  delete(event) {
    let params = { idpermisos_contract: event.target.value };
    this.UsuarioService.delete_contract(params).subscribe(
      result => {
        if (result.data == true) {
          this.search_contract();
          swal("", "El Contrato se Eliminado", "success");
        }
      },
      error => {}
    );
  }
}
