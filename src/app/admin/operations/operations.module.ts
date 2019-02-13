import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OperationsRoutingModule } from "./operations-routing.module";
import { OperationsComponent } from "./operations.component";
import { DetailsOperationsComponent } from "./details-operations/details-operations.component";
import { ItemsComponent } from "./items/items.component";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
import { WorkComponent } from "./work/work.component";
import { MaterialComponent } from "./material/material.component";
import { NgxGalleryModule } from "ngx-gallery";
import { ActividadesComponent } from "./actividades/actividades.component";

@NgModule({
  imports: [
    CommonModule,
    OperationsRoutingModule,
    NguiAutoCompleteModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    NgxGalleryModule
  ],
  declarations: [
    OperationsComponent,
    DetailsOperationsComponent,
    ItemsComponent,
    WorkComponent,
    MaterialComponent,
    ActividadesComponent
  ]
})
export class OperationsModule {}
