import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkTypeComponent } from "./work-type.component";
import { WorkTypeRoutingModule } from "./work-type-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    WorkTypeRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class WorkTypeModule {}
