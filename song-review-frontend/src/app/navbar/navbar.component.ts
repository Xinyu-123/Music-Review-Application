import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  
  constructor(public auth: AuthService) { }
  // login(){
  //   this.app.loggedIn = true;
  // }

  ngOnInit(): void {
  }

}
