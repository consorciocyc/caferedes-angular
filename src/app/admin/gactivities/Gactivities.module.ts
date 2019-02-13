import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GactivitiesComponent } from "./gactivities.component";
import { GactivitiesRoutingModule } from "./Gactivities-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    GactivitiesRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  declarations: [GactivitiesComponent]
})
export class GactivitiesModule {}

