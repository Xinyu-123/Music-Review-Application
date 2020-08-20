import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    if(!this.auth.isLoggedIn()){
      console.log('not logged in')
      this.router.navigateByUrl('/')
      
      return false;
    }
    return true;
  }


}
