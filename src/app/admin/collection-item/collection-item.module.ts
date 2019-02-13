import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CollectionItemComponent } from "./collection-item.component";
import { CollectionItemRoutingModule } from "./collection-item-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";

@NgModule({
  imports: [
    CommonModule,
    CollectionItemRoutingModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  declarations: [CollectionItemComponent]
})
export class CollectionItemModule {}
