import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VehiclesComponent } from "./vehicles.component";
import { VehiclesRoutingModule } from "./vehicles-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
@NgModule({
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class VehiclesModule {}
