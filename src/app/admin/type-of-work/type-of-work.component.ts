import { Component, OnInit } from '@angular/core';
import { typeofworkmodel} from "../../models/type-of-work.model";
import { TypeofworkService } from "../../services/type_of_work/type-of-work.service";
@Component({
  selector: 'app-type-of-work',
  templateUrl: './type-of-work.component.html',
  styleUrls: ['./type-of-work.component.scss'],
  providers: [TypeofworkService]
})
export class TypeOfWorkComponent implements OnInit {
public type;
public list;
public subtype;
public stype;
public slist;
public priority;
public ans;
public substatus;
public typeofworkmodel;

  constructor(
    private TypeofworkService : TypeofworkService
  ) { 

    this.typeofworkmodel= new typeofworkmodel();
  }

  ngOnInit() {
  }


  save(){
    console.log(this.typeofworkmodel)
    let params={data:this.typeofworkmodel}

    this.TypeofworkService.save(params).subscribe(result=>{},error=>{})
  }

  update(){
    console.log(this.typeofworkmodel)
    let params={data:this.typeofworkmodel}
    this.TypeofworkService.update(params).subscribe(result=>{},error=>{})
  }
  ssave(){
    console.log(this.typeofworkmodel)
    let params={data:this.typeofworkmodel}

    this.TypeofworkService.ssave(params).subscribe(result=>{},error=>{})
  }

  supdate(){
    console.log(this.typeofworkmodel)
    let params={data:this.typeofworkmodel}
    this.TypeofworkService.supdate(params).subscribe(result=>{},error=>{})
  }


}
