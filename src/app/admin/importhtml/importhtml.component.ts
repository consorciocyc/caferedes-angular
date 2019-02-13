import { Component, OnInit } from "@angular/core";
import { SendhtmlService } from "../../services/senhtml/sendhtml.service";
import { datatables } from "../../utilitis/datatables";

@Component({
  selector: "app-importhtml",
  templateUrl: "./importhtml.component.html",
  styleUrls: ["./importhtml.component.scss"],
  providers: [SendhtmlService]
})
export class ImporthtmlComponent implements OnInit {
  public hidden = true;
  public result = [];
  public datatables;
  public loader=true;
  public file;
  constructor(private SendhtmlService: SendhtmlService) {
    this.datatables = new datatables();
  }

  ngOnInit() {}

  onFileChange(event) {
    this.loader=false;
    console.log(event.target.files[0]);
    let archivo: any = event.target.files[0];
    let form = new FormData();
    form.append("file", archivo);
    this.SendhtmlService.insert(form).subscribe(
      result => {
        this.result = result;
        this.datatables.reInitDatatable4("#example");

        this.loader=true;
      },
      error => {}
    );
  }
}
