import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';
import { AuthService, TokenPayload, TokenResponse } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  

  constructor(private http: HttpClient) { }

  get_songs(){
    return this.http.get('/api/songs');
  }

  post_song(info: FormData){
    return this.http.post('/api/songs', info)
  }

  get_image(image){
    this.http.get(`/api/uploads/${image}`);
  }

  register_user(info: TokenPayload): Observable<any>{
    return this.http.post<TokenResponse>('/api/users/register', info, {observe: 'response'})
  }

  get_profile(token): Observable<any>{
    return this.http.get('/api/users/profile', {
      headers: {Authorization: `${token}`}
    })
  }

  login_user(info: TokenPayload): Observable<any>{
    return this.http.post<TokenResponse>('/api/users/login', info)
  }

  delete_songs(): Observable<any>{
    return this.http.delete('/api/songs');
  }

  delete_users(): Observable<any> {
    return this.http.delete('/api/users');
  }

  getUsername(id: string): Observable<any> {
    return this.http.post('/api/users/username', {id: id});
  }

  makeAdmin(user: string): Observable<any>{
    return this.http.post('/api/users/make-admin', {username: user})
  }
  
  removeAdmin(user: string): Observable<any>{ 
    return this.http.post('/api/users/remove-admin', {username: user})
  }

  searchSongs(search){
    console.log({fields:search.search_fields, rating: search.rating_range});

    return this.http.post(`/api/songs/search?search=${search.search}`, {fields:search.search_fields, rating: search.rating_range})
  }

  get_song(id){
    return this.http.get(`/api/songs/song?id=${id}`)
  }

  get_reviews(songID){
    return this.http.get(`/api/reviews/${songID}`);
  }

  post_reviews(review){
    console.log(review);
    return this.http.post('/api/reviews/', review);
  }

}

interface Song {
    name: string,
    artist: string,
    date: Date,
    posted_by?: string
}
