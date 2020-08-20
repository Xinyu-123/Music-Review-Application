import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ratingElement } from './ratingElement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'library';
  constructor() { }

  ngOnInit() {
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue}, New Value: ${$event.newValue}, Checked Color: ${$event.starRating.checkedcolor}, Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }
}


