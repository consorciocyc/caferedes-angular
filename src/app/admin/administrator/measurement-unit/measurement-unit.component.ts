import { Component, OnInit } from '@angular/core';
import { MeasurementUnitService} from "../../../services/measurement-unit/measurement-unit.service";
import { unitmodel} from "../../../models/measurement-unit.model";
import { CustomValidators } from "ng2-validation";
import { datatables } from "../../../utilitis/datatables";
import swal from 'sweetalert2';

@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.scss'],
  providers: [MeasurementUnitService]
})
export class MeasurementUnitComponent implements OnInit {
  public unitmodel;
  public nunity;
  public rows;
  private datatables;


  constructor(
    private MeasurementUnitService: MeasurementUnitService
  ) { 
    this.unitmodel = new unitmodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
  }


  delete(index: number, row: any){

    let params={row}

    this.MeasurementUnitService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
  }

  update(index: number, row: any){

    let params={row}

    this.MeasurementUnitService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.unitmodel)
    let params=this.unitmodel

    this.MeasurementUnitService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.unitmodel)
    let params=this.unitmodel

    this.MeasurementUnitService.create(params).subscribe(result=>{

      this.rows=result.search;
      swal("Se ha creado con exito");
    },error=>{})   
  }




}


