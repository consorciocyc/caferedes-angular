import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  declarations: [UserComponent]
})
export class UserModule {}
