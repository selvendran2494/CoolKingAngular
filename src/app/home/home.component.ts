import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  restaurants = new Array();
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAllRestaurants("/restaurants").subscribe((res: any) => {
      this.restaurants = res;
      console.log(this.restaurants);
    });
  }
}
