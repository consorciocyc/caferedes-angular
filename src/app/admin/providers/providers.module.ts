import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProvidersRoutingModule } from "./providers-routing.module";
import { ProvidersComponent } from "./providers.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { Http } from "@angular/http/src/http";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    HttpModule,
    FormsModule,
    NguiAutoCompleteModule,
    CustomFormsModule
  ],
  declarations: [ProvidersComponent]
})
export class ProvidersModule {}
