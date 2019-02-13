import { Component, OnInit } from '@angular/core';
import { InputTypeService} from "../../../services/input-type/input-type.service";
import { inputtypemodel} from "../../../models/input-type.model";
import { CustomValidators } from "ng2-validation";
import { datatables } from "../../../utilitis/datatables";
import swal from 'sweetalert2';

@Component({
  selector: 'app-input-type',
  templateUrl: './input-type.component.html',
  styleUrls: ['./input-type.component.scss'],
  providers: [InputTypeService]
})
export class InputTypeComponent implements OnInit {
  public inputtypemodel;
  public ninput;
  public rows;
  private datatables;


  constructor(
    private InputTypeService: InputTypeService
  ) { 
    this.inputtypemodel = new inputtypemodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
  }


  delete(index: number, row: any){

    let params={row}

    this.InputTypeService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
  }

  update(index: number, row: any){

    let params={row}

    this.InputTypeService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.inputtypemodel)
    let params=this.inputtypemodel

    this.InputTypeService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.inputtypemodel)
    let params=this.inputtypemodel

    this.InputTypeService.create(params).subscribe(result=>{

      this.rows=result.search;
      swal("Se ha creado con exito");
    },error=>{})   
  }




}


