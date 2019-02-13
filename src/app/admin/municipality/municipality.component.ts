import { Component, OnInit } from "@angular/core";
import { municipalitymodel } from "../../models/municipality.model";
import { MunicipalityService } from "../../services/municipality/municipality.service";

@Component({
  selector: "app-municipality",
  templateUrl: "./municipality.component.html",
  styleUrls: ["./municipality.component.scss"],
  providers: [MunicipalityService]
})
export class MunicipalityComponent implements OnInit {
  public department;
  public town;
  public newTown;
  public secondId;
  public municipalitymodel;

  constructor(private MunicipalityService: MunicipalityService) {
    this.municipalitymodel = new municipalitymodel();
  }

  ngOnInit() {}

  save() {
    console.log(this.municipalitymodel);
    let params = { data: this.municipalitymodel };

    this.MunicipalityService.save(params).subscribe(result => {}, error => {});
  }

  update() {
    console.log(this.municipalitymodel);
    let params = { data: this.municipalitymodel };
    this.MunicipalityService.update(params).subscribe(
      result => {},
      error => {}
    );
  }
}
