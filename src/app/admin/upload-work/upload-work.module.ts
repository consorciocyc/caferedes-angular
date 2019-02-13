import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadWorkRoutingModule } from './upload-work-routing.module';
import { UploadWorkComponent } from './upload-work.component';
import { FileUtil } from "../control-series/file.util";
import { Constants } from "../control-series/control-series.constants";
import { HttpModule } from "@angular/http";
import { Http } from "@angular/http/src/http";
import { FormsModule } from "@angular/forms";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    UploadWorkRoutingModule,
    HttpModule,
    FormsModule,
    NguiAutoCompleteModule,
    CustomFormsModule
  ],
  declarations: [UploadWorkComponent],
  providers: [FileUtil, Constants]
})
export class UploadWorkModule { }
