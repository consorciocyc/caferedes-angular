import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContractsRoutingModule } from "./contracts-routing.module";
import { ContractsComponent } from "./contracts.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
@NgModule({
  imports: [
    CommonModule,
    ContractsRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  declarations: [ContractsComponent]
})
export class ContractsModule {}
