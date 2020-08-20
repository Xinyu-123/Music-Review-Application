import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../_services/http.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-song-review',
  templateUrl: './song-review.component.html',
  styleUrls: ['./song-review.component.scss']
})
export class SongReviewComponent implements OnInit {

  form: FormGroup;
  @Output() song_created: EventEmitter<string> = new EventEmitter();
  constructor(public auth: AuthService, private fb: FormBuilder, private router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      review: '',
      rating: 0,
    })

  }

  add_song_review(){
    let review = {
      review: this.form.value.review,
      rating: this.form.value.rating,
      username: this.auth.getUserDetails().username,
      userID: this.auth.getUserDetails()._id,
      songID: this.router.url.split('=')[1]
    }
    this.http.post_reviews(review).subscribe(review => {
      console.log(review);
      this.song_created.emit('song created')
      // window.location.reload();
    });
    
  }
}
