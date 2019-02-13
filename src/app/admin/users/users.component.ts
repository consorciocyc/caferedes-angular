import { Component, OnInit, HostListener } from "@angular/core";
import { PermitsService } from "../../services/permisos/permits.service";
import { CompanyService } from "../../services/login/company.service";
import { ListService } from "../../services/list/list.service";
import swal from "sweetalert2";
import { Employees } from "../../models/employees_models";

import $ from "jquery";
import { SerializerService } from "../../services/serializer/serializer.service";
import { UserService } from "../../services/users/user.service";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { Contracts } from "../../models/contracts_models";
import { datatables } from "../../utilitis/datatables";
import { constantes } from "../../utilitis/constantes";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { TableResizing } from '../../ResizingTable/ResizingTable';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
  providers: [
    PermitsService,
    CompanyService,
    ListService,
    SerializerService,
    UserService,
    AutocompleteService,
    Contracts,
    datatables,
    constantes
  ]
})
export class UsersComponent implements OnInit {
  /*LISTAS*/
  public list_company: Array<any>;
  public list_departaments: Array<any>;
  public list_city: Array<any>;
  public list_sex: Array<any>;
  public list_account_type: Array<any>;
  public list_bank: Array<any>;
  public list_eps: Array<any>;
  public list_arl: Array<any>;
  public list_pension: Array<any>;
  public list_state: Array<any>;
  public list_charges: Array<any>;
  public list_clasificaciones: Array<any>;
  public list_education_level: Array<any>;
  public list_profiles: Array<any>;
  public list_place_of_work: Array<any>;
  public list_gangs: Array<any>;
  public list_contracts: Array<any>;
  public list_location: Array<any>;
  public list_civil_status: Array<any>;
  public list_type_contracts: Array<any>;
  public list_type_charge: Array<any>;
  public url;
  public const_sexo;
  public Pinsert;
  public Pupdate;
  public Pdelete;

  /*MODELOS*/
  public employees: Employees;
  public datatables: datatables;
  public constantes: constantes;
  public contracts: Contracts;
  public btnupdate;

  public subcharge;

  /*VARIABLES */
  public edad: number;
  public identification: number;
  public img_base = "../../assets/images/users.png";
  public url_image = this.img_base;
  public permisos: any;
  public data_table: any[];
  public contrac_company;
  public image_employee;
  public image;
  public btninsert;

  public permits_edit;
  public permits_save;
  public permits_view;
  public permits_contract;

  constructor(
    private AutocompleteService: AutocompleteService,
    private UserService: UserService,
    private SerializerService: SerializerService,
    private _PermitsService: PermitsService,
    private CompanyService: CompanyService,
    private ListService: ListService
  ) {
    this.employees = new Employees();
    this.contracts = new Contracts();
    this.datatables = new datatables();
    this.constantes = new constantes();
    this.url = this.constantes.getRouterUrl();

  }

  ngOnInit() {
    TableResizing('#table_contracts th');
    this.list_sex = this.constantes.getSEXO();
    this.getPermits();
    this.getCompany();
    this.get_departments();

    this.get_account_type();
    this.get_bank();
    this.get_eps();
    this.get_arl();
    this.get_pension();
    this.get_state();
    this.get_subcharges();
    this.get_clasificaciones();
    this.get_education_level();

    this.get_place_gangs();
    this.get_place_location();
    this.get_civil_status();
    this.get_municipality(5);
    this.get_type_contracts();
    this.datatables.initDatatable("#table_contracts");
    this.sub_chargef();
    

    /*
    this.AutocompleteService.autocomplete_user(this.employees);
    */
  }

  permits_employee() {
    if (!this.permisos ) {
      this.permisos = JSON.parse(localStorage.getItem("users"));
      this.Pinsert = this.permisos.save;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
      let params = { cedula: this.permisos.identification };
      this._PermitsService.getPermist_employee(params);
    }
  }
  permits_contract_employee() {
    this.permits_employee();
    if (!this.permits_contract) {
      this.permits_contract = JSON.parse(
        localStorage.getItem("contract_employee")
      );

      console.log(this.permits_contract)
      this.permits_edit = this.permits_contract.permits_edit;
      this.permits_save = this.permits_contract.permits_save;
      this.permits_view = this.permits_contract.permits_view;
    }
  }

  /*OBTENER LOS PERMISOS DEL SUBMENU*/
  getPermits() {
    this._PermitsService.getPermits(this.constantes.SUBMENUS.Usuario, "users");

  }
  /*--FIN--*/

  /*OBTENER TODAS LAS LISTAS*/
  getCompany() {
    this.CompanyService.load_company().subscribe(
      res => {
        this.list_company = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_departments() {
    let url = "departamentos/departamentos";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_departaments = res.departments;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_city(id: number) {
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

  get_municipality(id: number) {
    let params = { id_departamento: id };
    let url = "departamentos/municipios";
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_place_of_work = res.municipality;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_sex() {
    let url = "list/sexo";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_sex = res.sexo;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_account_type() {
    let url = "list/account_type";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_account_type = res.account_type;
      },
      error => {
        console.log(error);
      }
    );
  }
  get_bank() {
    let url = "list/bank";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_bank = res.bank;
      },
      error => {
        console.log(error);
      }
    );
  }
  get_eps() {
    let url = "list/eps";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_eps = res.eps;
      },
      error => {
        console.log(error);
      }
    );
  }
  get_arl() {
    let url = "list/arl";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_arl = res.arl;
      },
      error => {
        console.log(error);
      }
    );
  }
  get_pension() {
    let url = "list/pensions";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_pension = res.pensions;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_state() {
    let url = "list/states";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_state = res.states;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_subcharges() {
    let url = "list/charges";
    let company = localStorage.getItem("company");
    let params = { company: company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_charges = res.charges;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_clasificaciones() {
    let url = "list/clasificaciones";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_clasificaciones = res.clasificaciones;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_education_level() {
    let url = "list/education_level";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_education_level = res.education_level;
      },
      error => {
        console.log(error);
      }
    );
  }
  get_profiles() {
    let url = "list/profiles";
    let company = localStorage.getItem("company");
    let params = { company: company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_profiles = res.p_profiles;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_place_gangs() {
    let url = "list/gangs";
    let company = localStorage.getItem("company");
    let params = { company: company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_gangs = res.gangs;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_contracts(company: number) {
    console.log(company);
    let url = "list/contract";
    let params = { company: company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_contracts = res.contract;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_place_location() {
    let url = "list/location";
    let company = localStorage.getItem("company");
    let params = { company: company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_location = res.location;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_civil_status() {
    let url = "list/civil_status";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_civil_status = res.civil_status;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_type_contracts() {
    let url = "list/type_contract";
    this.ListService.get_list(url).subscribe(
      res => {
        this.list_type_contracts = res.type_contract;
      },
      error => {
        console.log(error);
      }
    );
  }

  get_type_charge(company: number) {
    let url = "list/type_charges";
    let params = { company: company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.list_type_charge = res.type_charges;
      },
      error => {
        console.log(error);
      }
    );
  }

  /*--FIN--*/

  /*FUNCTIONES QUE SE USAN DURANTE EL FLUJO DEL PROGRAMA*/
  /*CALCULAR LA FECHA*/
  calcular_anios(date) {
    if (date === "" || date === null || date === undefined) {
      this.employees.age = 0;
      return swal("", "por favor ingrese la fecha de nacimiento", "info");
    } else {
      const fechaNace = new Date(date),
        fechaActual = new Date(),
        mes = fechaActual.getMonth(),
        dia = fechaActual.getDate(),
        año = fechaActual.getFullYear();

      fechaActual.setDate(dia);
      fechaActual.setMonth(mes);
      fechaActual.setFullYear(año);
      this.employees.age = Math.floor(
        (Number(fechaActual) - Number(fechaNace)) / (1000 * 60 * 60 * 24) / 365
      );
    }
  }

  /*PRESIONAR LA TECLA F2 PARA CONSULAR*/
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.constantes.KEYBOARD.TECLA_F2) {
      if (
        this.employees.Users_id_identification === undefined ||
        this.employees.Users_id_identification === null
      ) {
        return swal(
          "",
          "por favor ingrese un numero de documento valido",
          "error"
        );
      } else {
        let params = { identification: this.employees.Users_id_identification };
        this.consultar_usuario(params);
      }
    }
  }

  /*--FIN--*/

  /*FUNCION PARA CONSULTAR EL USUARIO*/
  consultar_usuario(params: any) {
    this.permits_employee();



    const ID_USER = this.employees.Users_id_identification;
    this.UserService.consultar_users(params).subscribe(
      response => {
        if (response.data.length === 0) {
          this.url_image = this.img_base;
          this.employees = this.employees = new Employees();
          this.employees.Users_id_identification = ID_USER;
          return swal("", "el usuario no se encuentra registrado", "info");
        } else {
          this.employees = response.data;
          this.url_image = this.url + "public/images/" + this.employees.image;
          this.calcular_anios(this.employees.birth_date);
          this.get_account_type();
          this.get_type_contrac();
          this.get_clasificaciones();
          this.sub_chargef();
          this.get_city(this.employees.id_depart);
          this.get_place_gangs();
          this.charge();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  /*--FIN--*/

  /*FUNCION PARA ALMACEN LOS USUARIOS*/
  guardar_usuario() {
    this.permits_employee();
    let params = { identification: this.employees.Users_id_identification };

    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso ", "error");
      return;
    }
    this.UserService.consultar_users(params).subscribe(
      response => {
        if (response.data != null) {
          return swal("", "el usuario ya esta registrado", "info");
        } else {
          this.insertar_usuario();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  /*--FIN--*/

  /*--FUNCION PARA ACTUALIZAR LOS USUARIOS--*/
  actualizar_usuario() {
    this.permits_employee();
    if (this.Pupdate == 0) {
      swal("", "No Cuenta con Permiso ", "error");
      return;
    }
    this.UserService.actualizar_users(this.employees).subscribe(
      response => {
        swal("", "usuario actualizado con exito", "success");
      },
      error => {
        console.log(error);
      }
    );
  }
  /*--FIN--*/

  /*--FUNCION PARA OBTENER LA INFORMACION DEL USUARIO Y ALMACENRLO SIN FOTO-*/
  insertar_usuario() {
    this.permits_employee();
    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso ", "error");
      return;
    }
    this.UserService.save_user(this.employees).subscribe(
      response => {
        if (
          response.idemploye !== "" ||
          response.idemploye !== null ||
          response.idemploye !== undefined
        ) {
          this.employees.idemployees = response.idemploye;
          swal("", "usuario creado correctamente", "success");
        } else {
          return swal(
            "",
            "error al crear el usuario por favor cominicarse con el area de sistemas",
            "error"
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  /*--FIN--*/

  /*--FUCIONES PARA LOS CONTRATOS--*/
  /*FUNCION PARA LA DATATABLE*/
  // funciones del datatable
  public addRow(datos): void {
    this.data_table = [];
    for (let llenar_data of datos) {
      this.data_table.push(llenar_data);
    }
    this.datatables.reInitDatatable("#table_contracts");
  }
  /*FUNCION PARA CARGAR LOS CONTRATOS*/
  ver_contratos() {
    this. permits_contract_employee();
    if (this.permits_view == 0) {
      swal("", "No Cuenta con Permiso ", "error");
      return;
    }
    let params = { id_employee: this.employees.idemployees };
    this.UserService.getAll_contracts(params).subscribe(
      response => {
        this.addRow(response.contract);
      },
      error => {
        console.log(error);
      }
    );
  }

  /*FUNCION PARA ACTUALIZAR LOS CONTRATOS*/
  actualizar_contratos(id) {
    this. permits_contract_employee();
    if (this.permits_edit == 0) {
      swal("", "No Cuenta con Permiso ", "error");
      return;
    }
    let params = { id_contract: id };

    this.UserService.getId_contract(params).subscribe(
      response => {
        {
          this.contracts = response.contract[0];
          this.get_contracts(this.contracts.id_company);
          console.log(this.contracts.id_company);
          this.btninsert = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /*FUNCION PARA GUARDAR LOS CONTRATOS*/
  guardar_contratos() {
    this. permits_contract_employee();
    if (this.permits_save == 0) {
      swal("", "No Cuenta con Permiso ", "error");
      return;
    }
    this.contracts.id_employee = this.employees.idemployees;
    this.UserService.save_contracts(this.contracts).subscribe(
      response => {
        if (response.status == "ok") {
          this.contracts.idcontracts = response.idcontrat;
          this.btninsert = true;
        }
        swal("", "el contrato se creo correctamente", "success");
        this.ver_contratos();
      },
      error => {
        console.log(error);
      }
    );
  }

  /*FUNCIONES PARA LOS PROCESOS DISCIPLINARIOS*/
  ver_dotacion() {}
  abrir_procesos() {}

  sub_chargef() {
    let params = { idcharge: this.employees.id_charge };
    this.UserService.get_SubCharge(params).subscribe(
      result => {
        // let selectedCategory = result.response.find(c => c.id_charge == 2);
        // this.employees.final_risk_level = selectedCategory["final_risk_level"];
        this.subcharge = result.response;
      },
      error => {}
    );
  }

  charge() {
    let params = { idsubcharge: this.employees.sub_charge };

    this.UserService.charge(params).subscribe(
      result => {
        this.employees.final_risk_level = result.response.final_risk_level;
        this.employees.id_charge = result.response.id_charge;
        this.employees.name_charge = result.response.name_charges;
      },
      error => {}
    );
  }

  get_type_contrac() {
    let url = "list/contract";
    let params = { company: this.employees.id_company };
    this.ListService.get_list(url, params).subscribe(
      res => {
        this.contrac_company = res.contract;
      },
      error => {
        console.log(error);
      }
    );
  }

  upl_image(event) {
    if (this.employees.idemployees == undefined) {
      swal("", "Seleccione Un Usuario", "error");
      return;
    }

    console.log(event);
    this.image = event.target.files[0];

    console.log(this.image);
    const fd = new FormData();

    fd.append("image", this.image);
    fd.append("idemploye", this.employees.idemployees);

    this.UserService.upload_image(fd).subscribe(
      result => {
        this.url_image = this.url + "public/images/" + this.image.name;
      },
      error => {}
    );
  }

  create_contract() {
    this.contracts = new Contracts();
    this.btninsert = false;
    this.btnupdate = true;
  }

  update_contract() {
    this. permits_contract_employee();
    if (this.permits_edit == 0) {
      swal("", "No Cuenta con Permiso ", "error");
      return;
    }
    this.UserService.update_contract(this.contracts).subscribe(
      result => {
        if (result.response == true) {
          swal("", "Se Atualizo Correctamente", "success");
        }
      },
      error => {}
    );
  }
}
