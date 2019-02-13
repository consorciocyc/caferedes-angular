import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CotizacionRoutingModule } from "./cotizacion-routing.module";
import { CotizacionComponent } from "./cotizacion.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Http } from "@angular/http/src/http";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    CotizacionRoutingModule,
    HttpModule,
    FormsModule,
    NguiAutoCompleteModule,
    CustomFormsModule
  ],
  declarations: []
})
export class CotizacionModule {}
