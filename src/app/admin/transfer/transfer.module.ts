import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransferComponent } from "./transfer.component";
import { TransferRoutingModule } from "./transfer-routing.module";
import { Http } from "@angular/http/src/http";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    TransferRoutingModule,
    HttpModule,
    FormsModule,
    NguiAutoCompleteModule,
    CustomFormsModule
  ],
  declarations: [TransferComponent]
})
export class TransferModule {}
