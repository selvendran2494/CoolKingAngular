import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  restaurants = new Array();
  grid:any;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.grid = ["ac1.jpg","ac3.jpg","ac1.jpg"];
    this.api.getAllRestaurants("/restaurants").subscribe((res: any) => {
      this.restaurants = res;
      console.log(this.restaurants);
    });
  }
}
