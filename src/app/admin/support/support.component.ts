import { Component, OnInit } from "@angular/core";
import { supportmodel } from "../../models/support.model";
import { SupportService } from "../../services/support/support.service";

@Component({
  selector: "app-support",
  templateUrl: "./support.component.html",
  styleUrls: ["./support.component.scss"],
  providers: [SupportService]
})
export class SupportComponent implements OnInit {
  public toolName;
  public provider;
  public typeOfMaterial;
  public owner;
  public technicianName;
  public description;
  public commercialValue;
  public serie;
  public sistemCode;
  public dateOfPurchase;
  public supportDate;
  public nextSupport;
  public observation;
  public searchDate;
  public searchName;
  public searchConsecutive;
  public supportmodel;
  public supportType;

  constructor(private SupportService: SupportService) {
    this.supportmodel = new supportmodel();
  }
  components: Array<any> = [
    {
      toolnames: this.toolName,
      providers: this.provider,
      typeOfMaterials: this.typeOfMaterial,
      owners: this.owner,
      technicianNames: this.technicianName,
      descriptions: this.description,
      commercialValues: this.commercialValue,
      series: this.serie,
      sistemCodes: this.sistemCode,
      dateOfPurchases: this.dateOfPurchase,
      suppportDates: this.supportDate,
      nextSupports: this.nextSupport,
      observations: this.observation
    }
  ];
  ngOnInit() {}
}
