import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DispatchDestinationComponent } from "./dispatch-destination.component";
import { DispatchDestinationRoutingModule } from "./dispatch-destination-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    DispatchDestinationRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class DispatchDestinationModule {}