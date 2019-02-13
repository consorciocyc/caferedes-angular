import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LineComponent } from "./line.component";
import { LineRoutingModule } from "./line-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    LineRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class LineModule {}
