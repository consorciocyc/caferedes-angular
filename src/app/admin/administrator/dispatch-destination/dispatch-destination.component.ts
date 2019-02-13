import { Component, OnInit } from '@angular/core';
import { DispatchDestinationService} from "../../../services/dispatch-destination/dispatch-destination.service";
import { dispatchdestinationmodel } from "../../../models/dispatch-destination.model";
import { datatables } from "../../../utilitis/datatables";
import swal from 'sweetalert2';


@Component({
  selector: 'app-dispatch-destination',
  templateUrl: './dispatch-destination.component.html',
  styleUrls: ['./dispatch-destination.component.scss'],
  providers: [DispatchDestinationService]
})
export class DispatchDestinationComponent implements OnInit {
  public dispatchdestinationmodel;
  public ndesdis;
  public rows;
  private datatables;


  constructor(
    private DispatchDestinationService: DispatchDestinationService,
   
  ) { 
    this.dispatchdestinationmodel = new dispatchdestinationmodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
  }



  delete(index: number, row: any){

    let params={row}

    this.DispatchDestinationService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
  }

  update(index: number, row: any){

    let params={row}

    this.DispatchDestinationService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.dispatchdestinationmodel)
    let params=this.dispatchdestinationmodel

    this.DispatchDestinationService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.dispatchdestinationmodel)
    let params=this.dispatchdestinationmodel

    this.DispatchDestinationService.create(params).subscribe(result=>{

      this.rows=result.search;
      swal("Se ha creado correctamente");
    },error=>{})   
  }




}


