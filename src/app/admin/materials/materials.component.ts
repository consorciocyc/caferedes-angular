import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { materialsModel } from "../../models/materials_model";
import { MaterialsListService } from "../../services/materials/materials-list.service";
import { MaterialsService } from "../../services/materials/materials.service";
import { CustomValidators } from "ng2-validation";
import swal from "sweetalert2";
import { PermitsService } from "../../services/permisos/permits.service";
import { constantes } from '../../utilitis/constantes';

@Component({
  selector: "app-materials",
  templateUrl: "./materials.component.html",
  styleUrls: ["./materials.component.scss"],
  providers: [
    materialsModel,
    MaterialsListService,
    MaterialsService,
    PermitsService
  ]
})
export class MaterialsComponent implements OnInit {
  public material_models;
  public list_status: any[];
  public list_type: any[];
  public list_unity: any[];
  public search_codigo: string;
  public materials_permits;
  public permisos;
  public constantes;
  public url;

  public search_desc;
  public btn_update;
  public btn_insert;
  public table;

  public Pinsert;
  public Pupdate;
  public Pdelete;
  public company;
  public owner;
  public line;
  public subline;


  constructor(
    public material_list: MaterialsListService,
    public material_service: MaterialsService,
    public PermisosService: PermitsService
  ) {
    this.constantes = new constantes();
    this.url = this.constantes.getRouter()
    this.material_models = new materialsModel();
    this.search_codigo =this.url + "material/autocomplete?term=:keyword";
    this.search_desc = this.url +"material/autocompletedesc?term=:keyword";
    
  }

  ngOnInit() {
    this.getPermits();
    this.get_material_list();
    this.company = localStorage.getItem("company");
  }

  spermits(){
    if(!this.permisos){
      this.permisos = JSON.parse(localStorage.getItem("materials"));

      this.Pinsert = this.permisos.save;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
    }
  }
  valueChanged(newVal) {
    console.log(newVal.idmateriales)
    let params={idmateriales:newVal.idmateriales,company:this.company};

    this.material_service.search_inventary(params).subscribe(result=>{
      this.table=result.results;
    },error=>{})


    if (newVal.idmateriales !== undefined) this.material_models = newVal;
    this.btn_update=false;
    this.btn_insert=false;
  }

  /*consultar la lista de opciones de los materiales*/
  get_material_list() {
    this.material_list.get_list().subscribe(
      res => {
        this.list_status = res.states;
        this.list_type = res.Type_input;
        this.list_unity = res.Unity;
      },
      error => {
        console.log(error);
      }
    );
  }

  /*crear un nuevo material*/
  save_materials(params: materialsModel) {
    this.spermits()
    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }

    this.material_service.save_materials(params).subscribe(
      response => {
        let res = response;
        if (res.data === true) {
          swal("", "material creado con exito", "success");
          return;
        } else {
          swal("", "error al crear el material", "error");
          return false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*consultar materiales*/
  query_materials(params: materialsModel) {
    this.material_service.query_materials(params).subscribe(
      response => {
        if (response.data === true) {
          swal("", "el material ya se encuenta registrado", "error");
          return false;
        } else {
          this.save_materials(params);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*actualizar materials*/
  update_materials(params: materialsModel) {
    this.spermits()
    if (this.Pupdate != 1) {
      swal("", "No Cuenta con Permiso Para Atualizar", "error");
      return;
    }

    this.material_service.update_materials(params).subscribe(
      response => {

        if (response.data === true) {
          swal("", "material actializado corrextamente", "success");
        } else {
          swal("", "no se pudo actualizar el material", "error");
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*eliminar el material*/
  delete_materials(params: materialsModel) {
    this.spermits()
    this.material_service.delete_materials(params).subscribe(
      response => {
        if (response.data === true) {
          swal("", "material eliminado corrextamente", "success");
        } else {
          swal("", "no se pudo eliminar el material", "error");
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*Obtener los permisos del menu*/
  getPermits() {
    this.PermisosService.getPermits("1", "materials");
  }
}
