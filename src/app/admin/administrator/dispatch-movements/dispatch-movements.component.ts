import { Component, OnInit } from '@angular/core';
import { DispatchMoveService} from "../../../services/dispatch-movements/dispatch-movements.service";
import { dispatchmovemodel} from "../../../models/dispatch-movements.model";
import { CustomValidators } from "ng2-validation";
import { datatables } from "../../../utilitis/datatables";
import swal from 'sweetalert2';


@Component({
  selector: 'app-dispach-movements',
  templateUrl: './dispatch-movements.component.html',
  styleUrls: ['./dispatch-movements.component.scss'],
  providers: [DispatchMoveService]
})
export class DispatchMovementsComponent implements OnInit {
  public dispatchmovemodel;
  public nmove;
  public rows;
  private datatables;


  constructor(
    private DispatchMoveService: DispatchMoveService
  ) { 
    this.dispatchmovemodel = new dispatchmovemodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
  }


  delete(index: number, row: any){

    let params={row}

    this.DispatchMoveService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
  }

  update(index: number, row: any){

    let params={row}

    this.DispatchMoveService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.dispatchmovemodel)
    let params=this.dispatchmovemodel

    this.DispatchMoveService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.dispatchmovemodel)
    let params=this.dispatchmovemodel

    this.DispatchMoveService.create(params).subscribe(result=>{

      this.rows=result.search;
      swal("Se ha creado con exito");
    },error=>{})   
  }




}


