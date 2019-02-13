import { Component, OnInit } from '@angular/core';
import { GangService} from "../../../services/gang/gang.service";
import { gangmodel} from "../../../models/gang.model";
import { datatables } from "../../../utilitis/datatables";
import swal from 'sweetalert2';


@Component({
  selector: 'app-gang',
  templateUrl: './gang.component.html',
  styleUrls: ['./gang.component.scss'],
  providers: [GangService,   ]
})
export class GangComponent implements OnInit {
  public gangmodel;
  public ngang;
  public rows;
  public company;
  private datatables;

  constructor(
    private GangService: GangService,

  ) { 
    this.gangmodel = new gangmodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
    this.company = localStorage.getItem("company");
  }


  delete(index: number, row: any){

    let params={row}

    this.GangService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
  }

  update(index: number, row: any){

    let params={row}

    this.GangService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.gangmodel)
    let params= {data:this.gangmodel,company:this.company}

    this.GangService.search(params).subscribe(result=>{
      this.rows=result.search;

      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.gangmodel)
    let params = {data:this.gangmodel,company:this.company}

    this.GangService.create(params).subscribe(result=>{

      this.rows=result.search;
      swal("Se ha creado exitosamente");
    },error=>{})   
  }




}


