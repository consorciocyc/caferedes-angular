import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, Router, RouterModule } from '@angular/router';


import { AdministratorComponent } from './administrator.component';
import { LineComponent } from './line/line.component';
import { SublineComponent } from './subline/subline.component';
import { DispatchDestinationComponent } from './dispatch-destination/dispatch-destination.component';
import { DispatchMovementsComponent } from './dispatch-movements/dispatch-movements.component';
import { InputTypeComponent } from './input-type/input-type.component';
import { MeasurementUnitComponent } from './measurement-unit/measurement-unit.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { WorkTypeComponent } from './work-type/work-type.component';
import { GangComponent } from './gang/gang.component';
import { SubworktypeComponent } from './subworktype/subworktype.component';
import { UpdateWorkComponent } from './update-work/update-work.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

export const routes: Routes = [
    {
      path: "",
      component: AdministratorComponent,
      children: [
        {
          path: "line",
          component: LineComponent,
        },
        {
          path:"subline",
          component: SublineComponent
        },
        {
          path:"dispatch-destination",
          component: DispatchDestinationComponent
        },
        {
          path:"dispatch-movements",
          component: DispatchMovementsComponent
        },
        {
          path:"input-type",
          component: InputTypeComponent
        },
        {
          path:"measurement-unit",
          component: MeasurementUnitComponent
        },
        {
          path:"order-status",
          component: OrderStatusComponent
        },
        {
          path:"work-type",
          component: WorkTypeComponent
        },
        {
          path:"gang",
          component: GangComponent
        },
        {
          path:"subworktype",
          component: SubworktypeComponent
        },
        {
          path:"updatework",
          component: UpdateWorkComponent
        },
        {
          path:"vehicles",
          component: VehiclesComponent
        },
      ]
    }
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AdministratorRoutingModule { }
