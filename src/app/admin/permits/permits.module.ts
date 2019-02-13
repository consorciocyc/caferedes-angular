import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PermitsRoutingModule } from "./permits-routing.module";
import { PermitsComponent } from "./permits.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
@NgModule({
  imports: [
    CommonModule,
    PermitsRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  declarations: [PermitsComponent]
})
export class PermitsModule {}
