import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { UserDetails } from '../_services/auth.service';
import { HttpService } from '../_services/http.service';
import { StarRatingComponent } from 'ng-starrating';


interface SongDetails {
  name: string,
  artist: string,
  created_by: string,
  date_uploaded: Date,
  rating: number,
  song_image: string,
  _id: string
}

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss']
})
export class SearchSongComponent implements OnInit {
  form: FormGroup
  songs: Data;
  details: UserDetails;
  rating: number;

  fields = [
    { display: 'name', field: 'name'},
    { display:'artist', field: 'artist'}, 
    { display: 'user', field: 'created_by_username'}
  ]

  selectedFields = [];

  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: '',
      fields: this.get_fields(),
      rating_range: '0',
    })
    console.log(this.form.get('fields'))
  }

  change_slider($event){
    console.log($event)
    this.form.setValue({
      search: this.form.value.search,
      fields: this.form.value.fields,
      rating_range: $event.value
    })
  }

  get fieldsArray() {
    return <FormArray>this.form.get('fields');
  }

  get_fields(){
    const arr = this.fields.map(field => {
      console.log(field);
      
      return this.fb.control(true)
    })
    return this.fb.array(arr);
  }

  getSelectedFields() {
    this.selectedFields = [];
    this.fieldsArray.controls.forEach((control, i) => {
      if(control.value){
        this.selectedFields.push(this.fields[i].field)
      }
    })
  }

  search_song(){
    this.getSelectedFields();
    // console.log(this.form.value);
    const search = {
      search: this.form.value.search,
      rating_range: this.form.value.rating_range,
      search_fields: this.selectedFields
    } 
    console.log(search);
    this.http.searchSongs(search).subscribe(async (songs: SongDetails[]) => {
      console.log(songs);
      this.songs = songs;
    });
  }

  go_to_song(id: string){
    this.router.navigateByUrl(`/song?id=${id}`)
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.rating = $event.newValue;
  }

}
