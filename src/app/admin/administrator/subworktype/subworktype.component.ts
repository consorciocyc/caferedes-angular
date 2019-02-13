import { Component, OnInit } from '@angular/core';
import { SubworktypeService} from "../../../services/subworktype/subworktype.service";
import { subworktypemodel} from "../../../models/subworktype.model";
import { datatables } from "../../../utilitis/datatables";
import { worktypemodel} from "../../../models/work-type.model";
import swal from 'sweetalert2';


@Component({
  selector: 'app-subworktype',
  templateUrl: './subworktype.component.html',
  styleUrls: ['./subworktype.component.scss'],
  providers: [SubworktypeService]
})
export class SubworktypeComponent implements OnInit {
  public worktypemodel;
  public subworktypemodel;

  public stoin;
  public priority;
  public sub_state;
  public ans;
  public rowstype;
  public rowsState;
  public rows; 

  private datatables;


  constructor(
    private SubworktypeService: SubworktypeService,
   
  ) {
    this.worktypemodel    = new worktypemodel();
    this.subworktypemodel = new subworktypemodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
    this.cargarType();
    this.cargarState();
  }



  delete(index: number, row: any){

    let params={row}

    this.SubworktypeService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
  }

  update(index: number, row: any){

    let params={row}

    this.SubworktypeService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.subworktypemodel)
    let params=this.subworktypemodel

    this.SubworktypeService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.subworktypemodel)
    let params=this.subworktypemodel

    this.SubworktypeService.create(params).subscribe(result=>{
      swal("Se ha creado exitosamente");
    },error=>{})   
  }

  cargarType(){
    console.log(this.worktypemodel)
    let params=this.worktypemodel

    this.SubworktypeService.cargarType().subscribe(result=>{
      this.rowstype=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }

  cargarState(){
    console.log(this.worktypemodel)
    let params=this.worktypemodel

    this.SubworktypeService.cargarState().subscribe(result=>{
      this.rowsState=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }  

}

