import { Component, OnInit } from '@angular/core';
import { WorkTypeService} from "../../../services/work-type/work-type.service";
import { worktypemodel } from "../../../models/work-type.model";
import { datatables } from "../../../utilitis/datatables";
import swal from 'sweetalert2';


@Component({
  selector: 'app-work-type',
  templateUrl: './work-type.component.html',
  styleUrls: ['./work-type.component.scss'],
  providers: [WorkTypeService]
})
export class WorkTypeComponent implements OnInit {
  public worktypemodel;
  public toin;
  public rows;
  private datatables;


  constructor(
    private WorkTypeService: WorkTypeService
  ) { 
    this.worktypemodel = new worktypemodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
  }


  delete(index: number, row: any){

    let params={row}

    this.WorkTypeService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado  exitosamente");
  }

  update(index: number, row: any){

    let params={row}

    this.WorkTypeService.update(params).subscribe(result=>{},error=>{})
    swal("Se ha actualizado exitosamente");
  }



  search(){
    console.log(this.worktypemodel)
    let params=this.worktypemodel

    this.WorkTypeService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.worktypemodel)
    let params=this.worktypemodel

    this.WorkTypeService.create(params).subscribe(result=>{

      this.rows=result.search;
      swal("Se ha creado exitosamente");
    },error=>{})   
  }




}


