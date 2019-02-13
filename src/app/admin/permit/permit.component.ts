import { Component, OnInit } from '@angular/core';
import { permitmodel} from "../../models/permit.model";
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from "@angular/router";
import { PermitService} from "../../services/permit/permit.service";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/take";

@Component({
  selector: 'app-permit',
  templateUrl: './permit.component.html',
  styleUrls: ['./permit.component.scss'],
  providers: [PermitService]

})
export class PermitComponent implements OnInit {
public icode;
public imunicipio;
public ipermissionStatus;
public ientidad;
public idate;
public iradicado;
public iresolution;
public ifinaldate;
public istartdate;
public iduration;
public istatus;

public tcode;
public tmunicipio;
public tpermissionStatus;
public tentidad;
public tdate;
public tradicado;
public tresolution;
public tfinaldate;
public tstartdate;
public tduration;
public tstatus;

public oiconsecutive;
public oimunicipio;
public oicodInstalation;
public oipedido;
public oistatus;


public oymconsecutive;
public oymmunicipio;
public oymcodinstalation;
public oympedido;
public oymstatus;

public oeconsecutive;
public oemunicipio;
public oeoti;
public permitmodel;





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private PermitService: PermitService
  ) {
    this.permitmodel = new permitmodel();

   }

  ngOnInit() {
  }

  save(){
    console.log(this.permitmodel)
    let params={data:this.permitmodel}

    this.PermitService.save(params).subscribe(result=>{},error=>{})
  }

  update(){
    console.log(this.permitmodel)
    let params={data:this.permitmodel}
    this.PermitService.update(params).subscribe(result=>{},error=>{})
  }

  search(){
    console.log(this.permitmodel)
    let params={data:this.permitmodel}
    this.PermitService.search(params).subscribe(result=>{},error=>{})
  }
  newPermit(){
    console.log(this.permitmodel)   
  }


}
