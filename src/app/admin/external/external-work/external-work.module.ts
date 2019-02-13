import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExternalWorkRoutingModule } from "./external-work-routing.module";
import { ExternalWorkComponent } from "./external-work.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    ExternalWorkRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  declarations: [ExternalWorkComponent]
})
export class ExternalWorkModule {}
