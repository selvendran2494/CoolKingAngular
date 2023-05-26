import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  ServiceCenterDetails = new Array();
  grid:any;
  constructor(private api: ApiService,private router:Router) {}

  ngOnInit() {
     this.api.getAllServiceCenter("/serviceCenter").subscribe((res: any) => {
      let {data} = res;
      this.ServiceCenterDetails = data;
    });
  }
  goToDetailsPage(id:any){
    this.router.navigate(['/dashboard',id]);
  }
}
