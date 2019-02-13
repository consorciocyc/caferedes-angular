import { Component, OnInit } from '@angular/core';
import { owmodel} from "../../models/ow.model";

@Component({
  selector: 'app-ow',
  templateUrl: './ow.component.html',
  styleUrls: ['./ow.component.scss']
})
export class OwComponent implements OnInit {
public applicationDate;
public approvationDate;
public confirmDate;
public receiptDate;
public deliveryDate;
public provider;
public status;
public ow;

public owmodel;


  constructor() { 
    this.owmodel= new owmodel();
  }

  ngOnInit() {
  }

}
