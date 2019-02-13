import { Component, OnInit, HostListener } from "@angular/core";
import { PermitsService } from "../../services/permisos/permits.service";
import { ListService } from "../../services/list/list.service";
import { AutocompleteService } from "../../services/autocomplete/autocomplete.service";
import { ProviderService } from "../../services/provider/provider.service";
import { SerializerService } from "../../services/serializer/serializer.service";
import { DatatablesService } from "../../services/datatables/datatables.service";
import { datatables } from "../../utilitis/datatables";
import { constantes } from "../../utilitis/constantes";
import { Providers } from "../../models/provider_model";
import { ProviderInfo } from "../../models/provider_model";
import { Supply_Edit } from "../../models/provider_model";

import { CustomFormsModule } from "ng2-validation";

import swal from "sweetalert2";
import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";
import { error } from "selenium-webdriver";
import { CustomValidators } from "ng2-validation";

@Component({
  selector: "app-providers",
  templateUrl: "./providers.component.html",
  styleUrls: ["./providers.component.scss"]
})
export class ProvidersComponent implements OnInit {
  public Providers: Providers;
  public ProviderInfo: ProviderInfo;
  public Supply_Edit: Supply_Edit;
  public Supply_Provider = [];
  public search_providers = [];

  public permisos;

  public buttonDisabled;
  public empresa;
  public contrato;
  public contract;
  public company;
  private constantes;
  public datatables;
  public permiso;
  public buttonDisabledUpdate = true;
  public showSelected: boolean;
  public showmate: boolean;
  public btnmaterial;
  public vtotal: any;
  public vdescuento: any;
  public discount: any;
  public valortotal: any;
  public materiales = [];
  public idlist;
  public buttonDisabledsearch = true;
  public Pinsert;
  public Pupdate;
  public Pdelete;

  constructor(
    private _PermitsService: PermitsService,
    private ProviderService: ProviderService,
    private SerializerService: SerializerService
  ) {
    this.constantes = new constantes();
    this.Providers = new Providers();
    this.ProviderInfo = new ProviderInfo();
    this.Supply_Edit = new Supply_Edit();

    this.datatables = new datatables();
  }

  ngOnInit() {
    
    this.getPermits();
    this.company = localStorage.getItem("company");
    this.contract = localStorage.getItem("contract");
    this.idlist = localStorage.getItem("id_list");
    this.SerializerService.serializer();
    this.empresa = localStorage.getItem("company_name");
    this.contrato = localStorage.getItem("contract_name");
    this.datatables.initDatatable("#table_providers");
  }

  spermits() {
    if (!this.permisos) {
      this.permisos = JSON.parse(localStorage.getItem("providers"));

      this.Pinsert = this.permisos.insert;
      this.Pupdate = this.permisos.update;
      this.Pdelete = this.permisos.delete;
    }
  }

  /*Obtener los permisos del menu*/
  getPermits() {
    this.permiso = this.constantes.getPermist().Proveedores;
    this._PermitsService.getPermits(this.permiso, "providers");
  }

  Onsave() {
    this.spermits();
    if (this.Pinsert == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }
    let table = $("#providers").serializeObject();

    let params = { data: table, company: this.company };

    this.ProviderService.insert(params).subscribe(
      result => {
        if ((result.exist == true)) {
          return swal("", "El Proveedor ya Existe", "error");
        }

        if ((result.status == true)) {
          this.Providers.idproviders = result.data;

          this.buttonDisabled = true;
          this.buttonDisabledUpdate = false;
          return swal("", "Se Ha Creado El Proveedor", "success");
        } else {
          swal(
            "",
            "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
            "error"
          );
        }
      },
      error => {
        swal(
          "",
          "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
          "error"
        );
      }
    );
  }

  OnUpdate() {
    this.spermits();
    if (this.Pupdate == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }
    var table = $("#providers").serializeObject();


    let params = { data: table, company: this.company, id_list: this.idlist };

    this.ProviderService.update(params).subscribe(
      result => {
        if (result.status == true) {
          swal("", "Se Ha Atualizado El Proveedor", "success");
        } else {
          swal(
            "",
            "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
            "error"
          );
        }
      },
      error => {
        swal(
          "",
          "Ha Ocurrido un Error Comuniquese al Area de Sistemas",
          "error"
        );
      }
    );
  }

  public addRow(datos): void {
    this.Supply_Provider = [];
    this.Supply_Provider = datos;
    this.datatables.reInitDatatable("#table_providers");
  }



  Edit(event) {
    let data = event.target.value;

    let params = { material: data };
    this.ProviderService.edit(params).subscribe(
      result => {
        this.Supply_Edit = result.result;
      },
      error => {}
    );
  }

  operaciones(event) {
    this.discount = Number(
      this.Supply_Edit.supply_vlru * (this.Supply_Edit.supply_discount / 100)
    );

    this.Supply_Edit.vdescuento = Number(
      Number(this.Supply_Edit.supply_vlru) - Number(this.discount)
    );

    this.valortotal = (
      parseFloat(this.Supply_Edit.vdescuento) *
      parseFloat(this.Supply_Edit.supply_iva) /
      100
    ).toFixed(2);

    this.Supply_Edit.vtotal =
      parseFloat(this.Supply_Edit.vdescuento) + parseFloat(this.valortotal);
  }

  update_material() {
    let params = {
      data: this.Supply_Edit,
      company: this.company,
      idprovider: this.Providers.idproviders
    };

    this.spermits();
    if (this.Pupdate == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }
    this.ProviderService.edit_material(params).subscribe(
      result => {
        if ((result.result = true)) {
          this.addRow(result.suply_provider);
          swal("", "El Material Fue Atualizado", "success");
        }
      },
      error => {}
    );
  }

  public addRowmateriales(datos): void {
    this.materiales = [];

    let data1;
    let json = datos;
    for (data1 of json) {
      this.materiales.push(data1);
    }
    let array = [10, 20, 50, 100, -1];
    let array1 = [10, 20, 50, 100, "Todo"];
    this.datatables.reInitDatatable1("#table_materiales", array, array1);
  }
  addmaterial() {
    this.ProviderService.addmaterial().subscribe(
      result => {
        this.addRowmateriales(result.material);
        if ((result.status = "ok")) {
          // this.showmate = true;
          // console.log(this.showmate);
        }
      },
      error => {}
    );
  }

  public selectRow(event) {
    let material = event.target.value;

    let params = {
      material: material,
      company: this.company,
      provider: this.Providers.idproviders,
      id_list: this.idlist
    };

    this.spermits();
    if (this.Pupdate == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }
    this.ProviderService.validate_material(params).subscribe(
      result => {
        if (result.material == true) {
          swal("", "El Material Fue Agregado Al Proveedor", "success");

          this.addRow(result.suply_provider);
        } else {
          swal("", "El Material Ya esta  Agregado Al Proveedor", "error");
        }
      },
      error => {}
    );
  }

  delete_supply(event) {
    let idsupply_provider = event.target.value;

    let params = {
      idsupply_provider: idsupply_provider,
      id_list: this.idlist,
      provider: this.Providers.idproviders,
      company: this.company
    };

    this.spermits();
    if (this.Pdelete == 0) {
      swal("", "No Cuenta con Permiso Para Guardar", "error");
      return;
    }
    this.ProviderService.delete_supply(params).subscribe(
      result => {
        if (result.delete == true) {
          this.addRow(result.suply_provider);
          swal("", "El Material Fue Eliminado del Proveedor", "success");
        } else {
          swal("", "Error", "error");
        }
      },
      error => {}
    );
  }

  public addRow1(datos): void {
    this.search_providers = [];
    this.search_providers = datos;
    this.datatables.reInitDatatable2("#table_search_provider");
  }

  search_provider() {
    this.ProviderService.search_provider().subscribe(
      result => {
        this.addRow1(result.provider);
      },
      error => {}
    );
  }

  select_provider(event) {
    let id = event.target.value;
    let params = { id: id, idlist: this.idlist };

    this.ProviderService.search(params).subscribe(
      result => {
        this.Providers = result.data;

        this.buttonDisabledUpdate = false;
        this.buttonDisabled = true;
        this.buttonDisabledsearch = false;

        this.addRow(result.suply_provider);

        if (result.providers_info != null) {
          this.ProviderInfo = result.providers_info;
        }
      },
      error => {}
    );
  }
}
