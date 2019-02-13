import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
@Injectable()
export class ContractService {
  public newCribSuject = new Subject<any>();

  public TObri = new Subject<any>();

  addCrib(data) {
    this.newCribSuject.next(data);
  }

  addObri(data) {
    this.TObri.next(data);
    
  }
}
