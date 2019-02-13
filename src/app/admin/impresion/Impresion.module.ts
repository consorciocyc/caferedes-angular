import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [CommonModule, FormsModule, HttpModule, CustomFormsModule],
  declarations: []
})
export class ImpresionModule {}
