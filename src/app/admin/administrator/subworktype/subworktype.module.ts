import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubworktypeComponent } from "./subworktype.component";
import { SubworktypeRoutingModule } from "./subworktype-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    SubworktypeRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class SubworktypeModule {}
