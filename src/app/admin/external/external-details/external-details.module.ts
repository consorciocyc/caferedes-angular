import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExternalDetailsRoutingModule } from "./external-details-routing.module";
import { ExternalDetailsComponent } from "./external-details.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { LightboxModule } from "angular2-lightbox";

@NgModule({
  imports: [
    CommonModule,
    ExternalDetailsRoutingModule,
    NguiAutoCompleteModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    LightboxModule
  ],
  declarations: [ExternalDetailsComponent]
})
export class ExternalDetailsModule {}
