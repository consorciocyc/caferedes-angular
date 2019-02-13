import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { Routes, Router, RouterModule } from "@angular/router";
import { CanDeactivateGuard } from "../services/Candeactive/can-deactive-guard.service";
import { ImpresionComponent } from "./impresion/impresion.component";
import { ImportActaComponent } from "./import-acta/import-acta.component";
import { ImportoymComponent } from "./importoym/importoym.component";
import { PermitComponent } from "./permit/permit.component";
import { ActasVecindadComponent } from "./actas-vecindad/actas-vecindad.component";
import { SupportComponent } from "./support/support.component";
import { OwComponent } from "./ow/ow.component";
import { CotizacionComponent } from "./cotizacion/cotizacion.component";
import { ImporthtmlComponent } from "./importhtml/importhtml.component";
import { TravelComponent } from "./travel/travel.component";
import { MunicipalityComponent } from "./municipality/municipality.component";
const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "", loadChildren: "./home/home.module#HomeModule" },
      {
        path: "compras",
        loadChildren: "./purchases/purchases.module#PurchasesModule"
      },
      {
        path: "cotizacion",
        component: CotizacionComponent
      },
      {
        path: "materiales",
        loadChildren: "./materials/materials.module#MaterialsModule"
      },
      { path: "ingresos", loadChildren: "./income/income.module#IncomeModule" },
      {
        path: "despachos",
        loadChildren: "./dispatches/dispatches.module#DispatchesModule"
      },
      {
        path: "reintegros",
        loadChildren: "./refunds/refunds.module#RefundsModule"
      },
      {
        path: "reintegros_masivos",
        loadChildren:
          "./massive-withdrawals/massive-withdrawals.module#MassiveWithdrawalsModule"
      },

      {
        path: "traslados",
        loadChildren: "./transfer/transfer.module#TransferModule"
      },

      {
        path: "control_series",
        loadChildren:
          "./control-series/control-series.module#ControlSeriesModule"
      },
      { path: "empleados", loadChildren: "./users/users.module#UsersModule" },
      { path: "usuarios", loadChildren: "./user/user.module#UserModule" },
      {
        path: "permisos",
        loadChildren: "./permits/permits.module#PermitsModule"
      },

      {
        path: "proveedores",
        loadChildren: "./providers/providers.module#ProvidersModule"
      },
      {
        path: "contratos",
        loadChildren: "./contracts/contracts.module#ContractsModule"
      },
      {
        path: "empresas",
        loadChildren: "./company/company.module#CompanyModule"
      },
      {
        path: "bodegas",
        loadChildren: "./wineries/wineries.module#WineriesModule"
      },
      {
        path: "actividades",
        loadChildren: "./gactivities/Gactivities.module#GactivitiesModule"
      },

      {
        path: "item_cobro",
        loadChildren:
          "./collection-item/collection-item.module#CollectionItemModule"
      },
      {
        path: "listas_maestras",
        loadChildren: "./master-lists/master-lists.module#MasterListsModule",
        canActivate: [CanDeactivateGuard]
      },
      {
        path: "municipaality",
        component: MunicipalityComponent
      },
      {
        path: "internas",
        loadChildren: "./internal/internal.module#InternalModule"
      },
      {
        path: "impresion",
        component: ImpresionComponent
      },
      {
        path: "acta_materiales",
        component: ImportActaComponent
      },
      {
        path: "importaroym",
        component: ImportoymComponent
      },
      {
        path: "subir_html",
        component: ImporthtmlComponent
      },
      {
        path: "actas_vecindad",
        component: ActasVecindadComponent
      },
      {
        path: "ow",
        component: OwComponent
      },

      {
        path: "permisosobr",
        component: PermitComponent
      },

      {
        path: "acta_materiales",
        loadChildren:
          "./record-material/record-material.module#RecordMaterialModule"
      },
      {
        path: "pago_actividades",
        loadChildren:
          "./payment-activities/payment-activities.module#PaymentActivitiesModule"
      },
      {
        path: "subir_obra",
        loadChildren: "./upload-work/upload-work.module#UploadWorkModule"
      },
      {
        path: "recorrido",
        component: TravelComponent
      },
      {
        path: "documentos_epm",
        loadChildren: "./epm-documents/epm-documents.module#EpmDocumentsModule"
      },
      {
        path: "obra_externa",
        loadChildren: "./external/external.module#ExternalModule"
      },

      {
        path: "operaciones",
        loadChildren: "./operations/operations.module#OperationsModule"
      },
      {
        path: "support",
        component: SupportComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AdminRoutingModule {}
