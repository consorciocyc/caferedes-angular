import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UpdateWorkComponent } from "./update-work.component";
import { UpdateWorkRoutingModule } from "./update-work-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    UpdateWorkRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ]
})
export class UpdateWorkModule {}
