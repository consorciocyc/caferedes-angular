import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivitiesRoutingModule } from "./activities-routing.module";
import { ActivitiesComponent } from "./activities.component";

import { Http } from "@angular/http/src/http";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
import { FormsModule } from "@angular/forms";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    HttpModule,
    CustomFormsModule,
    FormsModule,
    NguiAutoCompleteModule
  ],
  declarations: []
})
export class ActivitiesModule {}
