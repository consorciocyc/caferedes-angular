import { Component, OnInit } from '@angular/core';
import { LineService} from "../../../services/line/line.service";
import { linemodel} from "../../../models/line.model";
import { datatables } from "../../../utilitis/datatables";
import swal from 'sweetalert2';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  providers: [LineService]
})
export class LineComponent implements OnInit {
  public linemodel;
  public nline;
  public rows;
  private datatables;


  constructor(
    private LineService: LineService
  ) { 
    this.linemodel = new linemodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
  }


  delete(index: number, row: any){

    let params={row}

    this.LineService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
  }

  update(index: number, row: any){

    let params={row}

    this.LineService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.linemodel)
    let params=this.linemodel

    this.LineService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.linemodel)
    let params=this.linemodel

    this.LineService.create(params).subscribe(result=>{

      this.rows=result.search;
      swal("Se ha creado con exito");
    },error=>{})   
  }




}


