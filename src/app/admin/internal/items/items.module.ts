import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemsComponent } from "./items.component";
import { ItemsRoutingModule } from "./items-routing.module";
import { Http } from "@angular/http/src/http";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
import { FormsModule } from "@angular/forms";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    HttpModule,
    CustomFormsModule,
    FormsModule,
    NguiAutoCompleteModule
  ],
  declarations: []
})
export class ItemsModule {}
