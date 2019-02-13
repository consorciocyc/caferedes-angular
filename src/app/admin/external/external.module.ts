import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExternalRoutingModule } from "./external-routing.module";
import { ExternalComponent } from "./external.component";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    ExternalRoutingModule,
    NguiAutoCompleteModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  declarations: [ExternalComponent]
})
export class ExternalModule {}
