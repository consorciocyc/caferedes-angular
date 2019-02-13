import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MeasurementUnitComponent } from "./measurement-unit.component";
import { MeasurementUnitRoutingModule } from "./measurement-unit-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    MeasurementUnitRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class MeasurementUnitModule {}
