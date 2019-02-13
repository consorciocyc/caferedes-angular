import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialRoutingModule } from "./material-routing.module";
import { MaterialComponent } from "./material.component";
import { FormsModule } from "@angular/forms";
import { Http } from "@angular/http/src/http";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

import { NguiAutoCompleteModule } from "@ngui/auto-complete";

@NgModule({
  imports: [
    CommonModule,
    MaterialRoutingModule,
    HttpModule,
    CustomFormsModule,
    FormsModule,
    NguiAutoCompleteModule
  ],
  declarations: []
})
export class MaterialsModule {}
