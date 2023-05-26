import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  rating: number | null = null;

  setRating(rating: number): void {
    this.rating = rating;
  }

  constructor() { }
  ngOnInit(): void {
    this.rating = 4;
  }

}
