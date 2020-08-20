import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';
import { TokenPayload, AuthService } from '../_services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: '',
      password: ''
    })
  }

  register(){
    console.log(this.form.value)
    this.auth.register(this.form.value).subscribe(
      () => {
        this.auth.login(this.form.value).subscribe(
          (data) => {
            console.log(data);
            this.router.navigateByUrl('/profile');
          },
          err => {
            console.error(err);
          }
        )
      },
      err => {
        console.error(err);
      }
    )

    
  }

  valid_signup(){ 
    
  }
}
