import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TravelRoutingModule } from "./travel-routing.module";
import { TravelComponent } from "./travel.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
@NgModule({
  imports: [
    CommonModule,
    TravelRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    NguiAutoCompleteModule
  ],
  declarations: [TravelComponent]
})
export class TravelModule {}
