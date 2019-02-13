import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputTypeComponent } from "./input-type.component";
import { InputTypeRoutingModule } from "./input-type-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    InputTypeRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class InputTypeModule {}