import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  login_failed: boolean
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: '',
      password: ''
    })
  }

  login(){
    this.auth.login(this.form.value).subscribe(
      (data) => {
        console.log(data);
        if(data.token){
          this.router.navigateByUrl('/profile');
        }else{
          this.login_failed = true;
        }
        
      },
      err => {
        console.error(err);
      }
    )
  }

}
