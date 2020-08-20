import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../_services/http.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() input;
  reviews;

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.get_reviews();
    console.log(this.input);
  }

  get_reviews(){
    let url = this.router.url.split('=')[1];
    console.log(url);
    this.http.get_reviews(url).subscribe(reviews => {
      this.reviews = reviews;
    });
  }


}
