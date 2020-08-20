import { Component, OnInit, ComponentFactoryResolver, Type,
  ViewChild,
  ViewContainerRef } from '@angular/core';
import { Data, Router } from '@angular/router';
import { HttpService } from '../_services/http.service';
import { AuthService, UserDetails } from '../_services/auth.service';
import { FormBuilder, FormGroup, FormsModule, FormArray } from '@angular/forms';
import { throwIfEmpty } from 'rxjs/operators';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  // Keep track of list of generated components for removal purposes
  components = [];
  form: FormGroup
  songs: Data;
  details: UserDetails;
  fields = [{ display: 'name', field: 'name'},
           { display:'artist', field: 'artist'}, 
           { display: 'user', field: 'created_by_username'}
          ]
  selectedFields = [];
  constructor(private http: HttpService, public auth: AuthService, private fb: FormBuilder, private router: Router){
  }

  ngOnInit(){
    this.get_songs().subscribe((songs: SongDetails[])  => {
      this.songs = songs;
    });

    this.form = this.fb.group({
      search: '',
      fields: this.get_fields(),
      rating_range: '0',
    })


  }

  get fieldsArray() {
    return <FormArray>this.form.get('fields');
  }

  get_fields(){
    const arr = this.fields.map(field => {
      console.log(field);
      return this.fb.control(false)
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

  get_songs(){
    return this.http.get_songs();
  }

  get_song_image(image){
    return `/api/${image}`
  }


  search_song(){
    this.getSelectedFields();
    console.log(this.form.value);
    const search = {
      search: this.form.value.search,
      rating_range: this.form.value.rating_range,
      search_fields: this.selectedFields
    } 
    console.log(search);
    this.http.searchSongs(search).subscribe(async (songs: SongDetails[]) => {
      this.songs = songs;
    }).unsubscribe();
  }

  go_to_song(id: string){
    this.router.navigateByUrl(`/song?id=${id}`)
  }

}
