import { Component, OnInit } from '@angular/core';
import { UserDetails, AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.profile().subscribe(
      (data) => {
        console.log(data._id);
        this.details = data;
      },
      err => {
        console.error(err);
      }
    )
  }

}
