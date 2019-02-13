import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";

import { AdminComponent } from "./admin.component";

import { NavbarComponent } from "./navbar/navbar.component";

import { HttpModule } from "@angular/http";

import { FormsModule } from "@angular/forms";

import { ContractService } from "../services/contract.service";

import { CompanyService } from "../services/login/company.service";

import { ListService } from "../services/list/list.service";

import { PermitsService } from "../services/permisos/permits.service";

import { AutocompleteService } from "../services/autocomplete/autocomplete.service";

import { SerializerService } from "../services/serializer/serializer.service";

import { DatatablesService } from "../services/datatables/datatables.service";

import { datatables } from "../utilitis/datatables";

import { ProviderService } from "../services/provider/provider.service";

import { constantes } from "../utilitis/constantes";

import { CustomFormsModule } from "ng2-validation";
import { ListComponent } from "./list/list.component";
import { CanDeactivateGuard } from "../services/Candeactive/can-deactive-guard.service";

import { ImpresionComponent } from "./impresion/impresion.component";
import { ImportActaComponent } from "./import-acta/import-acta.component";
import { ImportoymComponent } from "./importoym/importoym.component";
import { PermitComponent } from "./permit/permit.component";
import { ActasVecindadComponent } from "./actas-vecindad/actas-vecindad.component";
import { LightboxModule } from "angular2-lightbox";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { SupportComponent } from "./support/support.component";
import { OwComponent } from "./ow/ow.component";
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { ImporthtmlComponent } from './importhtml/importhtml.component';
import { MunicipalityComponent } from './municipality/municipality.component';
import { TypeOfWorkComponent } from './type-of-work/type-of-work.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpModule,
    FormsModule,
    CustomFormsModule,
    LightboxModule,
    NguiAutoCompleteModule
  ],
  declarations: [
    AdminComponent,
    NavbarComponent,
    ListComponent,
    ImpresionComponent,
    ImportActaComponent,
    ImportoymComponent,
    PermitComponent,
    ActasVecindadComponent,
    SupportComponent,
    OwComponent,
    CotizacionComponent,
    ImporthtmlComponent,
    MunicipalityComponent,
    TypeOfWorkComponent,
  ],
  providers: [
    CompanyService,
    ListService,
    ContractService,
    PermitsService,
    AutocompleteService,
    SerializerService,
    DatatablesService,
    datatables,
    CanDeactivateGuard,
    constantes,
    ProviderService
  ]
})
export class AdminModule {}
