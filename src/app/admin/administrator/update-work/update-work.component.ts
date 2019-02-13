import { Component, OnInit } from '@angular/core';
import { UpdateWorkService} from "../../../services/update-work/update-work.service";
import { updateworkmodel } from "../../../models/update-work.model";
import { datatables } from "../../../utilitis/datatables";
import swal from "sweetalert2";

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.scss'],
  providers: [UpdateWorkService]
})
export class UpdateWorkComponent implements OnInit {
  public updateworkmodel;
  public rowstype;
  public rowsM;
  public bconsecutive;
  public rows;
  public password;
  private datatables;
  public company;
  public idwork_delete;
  public data;
  public rowsSubtipos;
  public rowsSubstados;
  public rowsot;

  constructor(
    private UpdateWorkService: UpdateWorkService
  ) { 
    this.updateworkmodel = new updateworkmodel();
    this.datatables = new datatables();
  }

  ngOnInit() {
    this.cargarType();
    this.cargarM();

    this.company = localStorage.getItem("company");
  }

  
  btn_delete(index: number, row: any){
    this.idwork_delete=row.idworkI
   }

   //Eliminiar
  delete(){
    
    let contraseña1='Sistemas2018123';
    if(this.password==contraseña1){
    
      let params={id_worki:this.idwork_delete}
    this.UpdateWorkService.delete(params).subscribe(result=>{},error=>{})
    swal("Se ha eliminado correctamente");
      console.log("aprobado");
  }else{
    swal("Contraseña incorrecta");
    console.log("no aprobado");
  }
  }

  btn_update(index: number, row: any){

    this.data={municipi:row.Municipio,tipo:row.worki_type_obr,id_worki:row.idworkI}
   }

   //actualizar
  update(){
   console.log(this.password)
    let contraseña1='Sistemas2018123';
    if(this.password==contraseña1){
    this.UpdateWorkService.update(this.data).subscribe(result=>{},error=>{})
    swal("Se ha actualizado correctamente");
  }
    else{
      swal("Contraseña incorrecta");
      console.log("no aprobado");
    }
  
  }


  //Buesqueda
  search(){
    
    let params = {consecutivo:this.updateworkmodel.bconsecutive,company:this.company}

    this.UpdateWorkService.search(params).subscribe(result=>{
      this.rows=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }
  //cargar tipos de obra
  cargarType(){
    console.log("se cargaron los tipos")
    this.UpdateWorkService.cargarType().subscribe(result=>{
      this.rowstype=result.search;
    },error=>{})
  }


  //cargar municipios
  cargarM(){
    console.log("se cargaron los tipos" ,)
    this.UpdateWorkService.cargarM().subscribe(result=>{
      this.rowsM=result.search;
    },error=>{})
  }

  //carga los subtipos de obra
  cargarSubtipos(){
    console.log("se cargaron los subtipos" ,)
    this.UpdateWorkService.cargarSubtipos().subscribe(result=>{
      this.rowsSubtipos=result.search;
    },error=>{})
  }


  //carga los sub estados de una obra
  cargarSubstado(){
    console.log("se cargaron los substados" ,)
    this.UpdateWorkService.cargarSubstado().subscribe(result=>{
      this.rowsSubstados=result.search;
    },error=>{})
  }

  btn_updateot(index: number, row: any){

    this.data={subtipo:row.sub_tipo,substado:row.sub_estado,id_ot:row.idOT}
   }

   //actualizar
  updateot(){
   console.log(this.password)
    let contraseña1='Sistemas2018123';
    if(this.password==contraseña1){
    this.UpdateWorkService.updateot(this.data).subscribe(result=>{},error=>{})
    swal("Se ha actualizado correctamente");
  }
    else{
      swal("Contraseña incorrecta");
      console.log("no aprobado");
    }
  
  }


  //Buesqueda
  searchot(index: number, row: any){
    
    let params = {idworki:row.idworkI}
    this.cargarSubstado();
    this.cargarSubtipos();
    this.UpdateWorkService.searchot(params).subscribe(result=>{
      this.rowsot=result.search;
      this.datatables.reInitDatatable("#table_informe");
    },error=>{})
  }




}
