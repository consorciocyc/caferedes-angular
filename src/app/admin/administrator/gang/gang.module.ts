import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GangComponent } from "./gang.component";
import { GangRoutingModule } from "./gang-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    GangRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class GangModule {}
