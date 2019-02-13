import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from "ng2-validation";


@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    HttpModule,
    FormsModule,
    CustomFormsModule

  ],
  declarations: [CompanyComponent]
})
export class CompanyModule { }
