import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InternalRoutingModule } from "./internal-routing.module";
import { InternalComponent } from "./internal.component";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
import { DetailsComponent } from "./details/details.component";
import { NgxGalleryModule } from "ngx-gallery";
import { WorkComponent } from "./work/work.component";
import { ItemsComponent } from "./items/items.component";
import { MaterialsComponent } from "./materials-internal/materials.component";
import { ActivitiesComponent } from "./activities/activities.component";
import { FocusOnInitDirective } from "../../utilitis/focus-on-init.directive";

@NgModule({
  imports: [
    CommonModule,
    InternalRoutingModule,
    NguiAutoCompleteModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    NgxGalleryModule
  ],
  declarations: [
    InternalComponent,
    DetailsComponent,
    WorkComponent,
    ItemsComponent,
    MaterialsComponent,
    ActivitiesComponent,
    FocusOnInitDirective
  ]
})
export class InternalModule {}
