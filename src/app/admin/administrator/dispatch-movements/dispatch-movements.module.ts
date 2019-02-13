import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DispatchMovementsComponent } from "./dispatch-Movements.component";
import { DispatchMovementsRoutingModule } from "./dispatch-movements-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    DispatchMovementsRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class DispatchMovementsModule {}