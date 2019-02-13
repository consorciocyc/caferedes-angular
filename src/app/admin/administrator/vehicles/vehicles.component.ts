import { Component, OnInit } from '@angular/core';
import { VehiclesService} from "../../../services/vehicles/vehicles.service";
import { vehiclesmodel} from "../../../models/vehicles.model";
import { datatables } from "../../../utilitis/datatables";
import swal from 'sweetalert2';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  providers: [VehiclesService]
})
export class VehiclesComponent implements OnInit {
  public vehiclesmodel;
  public namev;
  public nplaca;
  public rows;
  private datatables;


  constructor(
    private VehiclesService: VehiclesService
  ) { 
    this.vehiclesmodel = new vehiclesmodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
  }


  delete(index: number, row: any){

    let params={row}

    this.VehiclesService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
  }

  update(index: number, row: any){

    let params={row}

    this.VehiclesService.update(params).subscribe(result=>{},error=>{})
    
  }



  search(){
    console.log(this.vehiclesmodel)
    let params=this.vehiclesmodel

    this.VehiclesService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  create(){
    console.log(this.vehiclesmodel)
    let params=this.vehiclesmodel

    this.VehiclesService.create(params).subscribe(result=>{

      this.rows=result.search;
      swal("Se ha creado con exito");
    },error=>{})   
  }




}


