import { Component, OnInit } from '@angular/core';
import { SublineService} from "../../../services/subline/subline.service";
import { sublinemodel} from "../../../models/subline.model";
import { datatables } from "../../../utilitis/datatables";

import { linemodel} from "../../../models/line.model";
import swal from 'sweetalert2';


@Component({
  selector: 'app-subline',
  templateUrl: './subline.component.html',
  styleUrls: ['./subline.component.scss'],
  providers: [SublineService]
})
export class SublineComponent implements OnInit {
  public sublinemodel;
  public linemodel;
  public nsubline;
  public rows;
  private datatables;


  constructor(
    private SublineService: SublineService,
   
  ) { 
    this.linemodel = new linemodel();
    this.sublinemodel = new sublinemodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
    this.cargarLine();
  }



  delete(index: number, row: any){

    let params={row}

    this.SublineService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado exitosamente");
  }

  update(index: number, row: any){

    let params={row}

    this.SublineService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.sublinemodel)
    let params=this.sublinemodel

    this.SublineService.search(params).subscribe(result=>{
      this.rows=result.search;
    },error=>{})
  }
  create(){
    console.log(this.sublinemodel)
    let params=this.sublinemodel

    this.SublineService.create(params).subscribe(result=>{

      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
      swal("Se ha creado exitosamente");
    },error=>{})   
  }

  cargarLine(){
    console.log(this.linemodel)
    let params=this.linemodel

    this.SublineService.cargarLine(params).subscribe(result=>{
      this.rows=result.search;
    },error=>{})
  }


}

