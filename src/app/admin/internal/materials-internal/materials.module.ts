import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialsRoutingModule } from "./materials-routing.module";
import { MaterialsComponent } from "./materials.component";
import { FormsModule } from "@angular/forms";
import { Http } from "@angular/http/src/http";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

import { NguiAutoCompleteModule } from "@ngui/auto-complete";

@NgModule({
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    HttpModule,
    CustomFormsModule,
    FormsModule,
    NguiAutoCompleteModule
  ],
  declarations: []
})
export class MaterialsModule {}
