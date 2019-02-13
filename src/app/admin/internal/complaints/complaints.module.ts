import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintsComponent } from './complaints.component';
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    ComplaintsRoutingModule,
    NguiAutoCompleteModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
  ],
  declarations: [ComplaintsComponent]
})
export class ComplaintsModule { }
