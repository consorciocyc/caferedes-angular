import { Component, OnInit } from '@angular/core';
import { OrderStatusService} from "../../../services/order-status/order-status.service";
import { orderstatusmodel} from "../../../models/order-status.model";
import { datatables } from "../../../utilitis/datatables";
import swal from 'sweetalert2';


@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  providers: [OrderStatusService]
})
export class OrderStatusComponent implements OnInit {
  public orderstatusmodel;
  public nline;
  public rows;
  private datatables;


  constructor(
    private OrderStatusService: OrderStatusService
  ) { 
    this.orderstatusmodel = new orderstatusmodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
  }


  delete(index: number, row: any){

    let params={row}

    this.OrderStatusService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
  }

  update(index: number, row: any){

    let params={row}

    this.OrderStatusService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.orderstatusmodel)
    let params=this.orderstatusmodel

    this.OrderStatusService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.orderstatusmodel)
    let params=this.orderstatusmodel

    this.OrderStatusService.create(params).subscribe(result=>{
      swal("Se ha creado con exito");
      this.rows=result.search;

    },error=>{})   
  }




}


