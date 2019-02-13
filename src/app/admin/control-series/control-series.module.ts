import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlSeriesRoutingModule } from "./control-series-routing.module";
import { ControlSeriesComponent } from "./control-series.component";
import { FileUtil } from "./file.util";
import { HttpModule } from "@angular/http";
import { Http } from "@angular/http/src/http";
import { FormsModule } from "@angular/forms";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    ControlSeriesRoutingModule,
    HttpModule,
    FormsModule,
    NguiAutoCompleteModule,
    CustomFormsModule
  ],

  declarations: [ControlSeriesComponent],

  providers: [FileUtil]
})
export class ControlSeriesModule {}
