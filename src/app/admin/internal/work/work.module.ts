import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkComponent } from "./work.component";
import { WorkRoutingModule } from "./work-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
@NgModule({
  imports: [
    CommonModule,
    WorkRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class WorkModule {}
