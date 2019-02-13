import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ImportoymComponent } from "./importoym.component";
import { FileUtil } from "../control-series/file.util";

import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    NguiAutoCompleteModule,
    CustomFormsModule
  ],
  declarations: [],
  providers: [FileUtil]
})
export class ImportoymModule {}
