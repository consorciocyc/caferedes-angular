import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdministratorRoutingModule } from "./administrator-routing.module";
import { AdministratorComponent } from "./administrator.component";
import { NguiAutoCompleteModule } from "@ngui/auto-complete";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CustomFormsModule } from "ng2-validation";
import { LineComponent } from './line/line.component';
import { SublineComponent } from './subline/subline.component';
import { DispatchMovementsComponent } from './dispatch-movements/dispatch-movements.component';
import { DispatchDestinationComponent } from './dispatch-destination/dispatch-destination.component';
import { InputTypeComponent } from './input-type/input-type.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { WorkTypeComponent } from './work-type/work-type.component';
import { GangComponent } from './gang/gang.component';
import { SubworktypeComponent } from './subworktype/subworktype.component';
import { UpdateWorkComponent } from './update-work/update-work.component';
import { VehiclesComponent } from './vehicles/vehicles.component';


@NgModule({
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    NguiAutoCompleteModule,
    FormsModule,
    HttpModule,
    CustomFormsModule
  ],
  declarations: [
    AdministratorComponent,
    LineComponent,
    SublineComponent,
    DispatchMovementsComponent,
    DispatchDestinationComponent,
    InputTypeComponent,
    MeasurementUnitComponent,
    OrderStatusComponent,
    WorkTypeComponent,
    GangComponent,
    SubworktypeComponent,
    UpdateWorkComponent,
    VehiclesComponent
  ]
})
export class AdministratorModule {}
