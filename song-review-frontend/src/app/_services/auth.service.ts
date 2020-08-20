import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';

export interface UserDetails {
  _id?: number
  username: string,
  password: string,
  date_created?: Date,
  is_admin?: boolean
}

export interface TokenResponse {
  token: string
}

export interface TokenPayload {
  _id?: number,
  username: string,
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string
  private helper = new JwtHelperService();

  constructor(private http: HttpService, private router: Router, private http2: HttpClient) { }

  private saveToken (token: string): void {
    localStorage.setItem('userToken', token)
    this.token = token;
  }

  private getToken (): string {
    if(!this.token){
      this.token = localStorage.getItem('userToken');
    }
    return this.token;
  }

  public getUserDetails (): UserDetails {
    const token = this.getToken();
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }else {
      return null;
    }
  }

  public isLoggedIn (): boolean {
    const user = this.getUserDetails();
    if(user && !this.helper.isTokenExpired(this.token)){
      return true;
    }else{
      return false;
    }
  }

  public isAdmin (): boolean {

    const user = this.getUserDetails();
    if(user.is_admin){
      return true;
    }else{
      return false;
    }
  }


  public register(user: TokenPayload): Observable<any> {

    const base = this.http.register_user(user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token) {
          this.saveToken(data.token);
        }else{
          console.log('no token yet');
        }
        return data;
      })
    )

    return request;
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.login_user(user);
    
    const request = base.pipe(
      map((data: TokenResponse) => {
        console.log(data);
        if(data.token){
          this.saveToken(data.token);
        }
        return data;
      })
    )

    return request;
  }

  public profile(): Observable<any> {
    return this.http.get_profile(this.getToken())
  }

  public logout(): void{
    this.token = '';
    window.localStorage.removeItem('userToken');
    this.router.navigateByUrl('/');
  }
}
