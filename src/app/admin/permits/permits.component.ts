import { Component, OnInit, AfterViewInit } from "@angular/core";
import { PermitsService } from "../../services/permisos/permits.service";
import { ListService } from "../../services/list/list.service";
import swal from "sweetalert2";
import { TableResizing } from '../../ResizingTable/ResizingTable';

@Component({
  selector: "app-permits",
  templateUrl: "./permits.component.html",
  styleUrls: ["./permits.component.scss"],
  providers: [PermitsService, ListService]
})
export class PermitsComponent implements OnInit {
  public rowDatatable;
  public company;
  public rowselect;
  public intern;
  public externas;
  public profile_name;
  public contract_employee;
  public id_profile;

  constructor(
    private PermitsService: PermitsService,
    private ListService: ListService
  ) {}

  ngOnInit() {
    this.company = localStorage.getItem("company");
    this.list_profiles();
    TableResizing('#table_permits_resizing th');
  }

  create_profile() {
    if (this.profile_name == undefined) {
      return swal("", "El nombre del Perfil Esta en Blanco", "error");
    }
    let params = { name: this.profile_name, idcompnay: this.company };
    this.PermitsService.create_permise(params).subscribe(
      result => {
        this.id_profile = result.profiles;
        this.list_profiles();
        this.select();
        this.profile_name = "";
      },
      error => {}
    );
  }
  chebox(profile, tipo, permiso, event) {
    let value = event.target.checked;

    console.log(profile, tipo, permiso, value);

    let param = {
      profile: profile,
      permiso: tipo,
      id_permiso: permiso,
      value: value
    };

    this.PermitsService.search_update(param).subscribe(
      response => {},
      error => {
        console.log(error);
      }
    );
  }

  list_profiles() {
    let param = {
      company: this.company
    };
    this.ListService.list_profiles(param).subscribe(
      response => {
        this.rowselect = response.profiles;
      },
      error => {
        console.log(error);
      }
    );
  }

  select() {
    let param = {
      company: this.company,
      idprofile: this.id_profile
    };
    this.PermitsService.search_submenu(param).subscribe(
      response => {
        this.rowDatatable = response.profiles;
        this.intern = response.internas;
        this.externas = response.externas;
        this.contract_employee = response.contract_employee;
      },
      error => {
        console.log(error);
      }
    );
  }

  internas(profile, tipo, permiso, event) {
    let value = event.target.checked;

    let param = {
      profile: profile,
      permiso: tipo,
      id_permiso: permiso,
      value: value,
      permits: "internas"
    };
    console.log();
    this.PermitsService.update_permits(param).subscribe(
      result => {},
      error => {}
    );
  }

  contract(profile, tipo, permiso, event) {
    let value = event.target.checked;

    let param = {
      profile: profile,
      permiso: tipo,
      id_permiso: permiso,
      value: value,
      permits: "contract"
    };
    console.log();
    this.PermitsService.update_permits(param).subscribe(
      result => {},
      error => {}
    );
  }
  externasp(profile, tipo, permiso, event) {
    let value = event.target.checked;

    let param = {
      profile: profile,
      permiso: tipo,
      id_permiso: permiso,
      value: value,
      permits: "externas"
    };
    console.log();
    this.PermitsService.update_permits(param).subscribe(
      result => {},
      error => {}
    );
  }
}
