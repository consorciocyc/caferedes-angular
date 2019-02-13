import { Component, OnInit } from "@angular/core";
import { PermitsService } from "../../services/permisos/permits.service";
import { ListService } from "../../services/list/list.service";
import { Company } from "../../models/company.model";
import { CompanyService } from "../../services/company/company.service";
import swal from "sweetalert2";
import { constantes } from "../../utilitis/constantes";
@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.scss"],
  providers: [PermitsService, ListService, CompanyService]
})
export class CompanyComponent implements OnInit {
  public permisos;
  public company_models = new Company();
  public list_company;
  public logo;
  public imagePath;
  public url;
  public botoon_;
  public botoon_update = true;
  public buttoinsert;
  public Pinsert;
  public Pupdate;
  public Pdelete;
  public buttonupdate;
  public constantes;

  constructor(
    private _PermitsService: PermitsService,
    private ListService: ListService,
    private CompanyService: CompanyService
  ) {
    this.constantes = new constantes();
  }
  ngOnInit() {
    this.getPermits();
    this.getCompany();
    this.url = this.constantes.getRouterimage()
    this.imagePath = 'http://via.placeholder.com/200x150';
  }

  /*Obtener los permisos del menu*/
  getPermits() {
    this._PermitsService.getPermits("14", "company");
    this.permisos = this._PermitsService.getPermitsSubMenu("company");

    this.Pinsert = this.permisos.insert;
    this.Pupdate = this.permisos.update;
    this.Pdelete = this.permisos.delete;
  }

  getCompany() {
    this.ListService.getCompany().subscribe(
      result => {
        this.list_company = result;
      },
      error => {}
    );
  }

  search() {
    let params = { company: this.company_models.idbusiness };
    this.CompanyService.search(params).subscribe(
      result => {
        this.company_models = result.company;
        this.imagePath = this.url + this.company_models.logo;
        this.buttoinsert = true;
        this.botoon_update = false;
      },
      erro => {}
    );
  }

  upload(event) {
    this.logo = event.target.files[0];
  }

  save() {
    if (this.Pinsert == 0) {
      swal("", "No Tiene Permisos", "error");
      return;
    }
    const fd = new FormData();
    console.log(this.logo);

    fd.append("image", this.logo);
    fd.append("company_name", this.company_models.company_name);
    fd.append("nit", this.company_models.nit);
    fd.append("phone", this.company_models.phone);
    fd.append("address", this.company_models.address);

    let params = { data: this.company_models };

    this.CompanyService.insert(fd).subscribe(
      result => {
        swal("", "Se Ha Creado La Empresa", "success");
        this.imagePath = this.url + this.logo.name;
        this.company_models.logo = this.logo.name;
      },
      error => {}
    );
  }

  update() {
    if (this.Pupdate == 0) {
      swal("", "No Tiene Permisos", "error");

      return;
    }
    const fd = new FormData();

    fd.append("image", this.logo);
    fd.append("company_name", this.company_models.company_name);
    fd.append("nit", this.company_models.nit);
    fd.append("phone", this.company_models.phone);
    fd.append("address", this.company_models.address);
    fd.append("idbusiness", this.company_models.idbusiness);
    fd.append("logo", this.company_models.logo);

    let params = { data: this.company_models };

    this.CompanyService.update(fd).subscribe(
      result => {
        swal("", "Se Ha Atualizado La Empresa", "success");

        this.imagePath = this.url + result.image;
      },
      error => {}
    );
  }
}
