import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Data } from '@angular/router';
import { HttpService } from '../_services/http.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {
  form: FormGroup;
  songs: Data;
  image: File;
  audio: File;
  submit: boolean = false;
  song_added: string;
  errors: string[]
  constructor(private http: HttpService, private fb: FormBuilder, public auth: AuthService){

  }

  ngOnInit(){
    this.form = this.fb.group({
      name: '',
      artist: '',
      description: '',
      date: Date,
      date_published: Date,
      image: '',
      audio_file: ''
    })
  }

  selectImage(event){
    console.log(event);
    if(event.target.files.length > 0){
      this.image = <File>event.target.files[0];
    }

    console.log(this.image)
  }

  selectAudio(event){
    console.log(event);
    if(event.target.files.length > 0){
      this.audio = <File>event.target.files[0];
    }

    console.log(this.audio)
  }

  add_song(info){
    console.log(info);


    this.auth.profile().subscribe(data => {
      const formData = new FormData();
      try{
        formData.append('song_image', this.image, this.image.name);
        formData.append('audio_file', this.audio, this.audio.name);
        formData.append('name', info.name);
        formData.append('artist', info.artist);
        formData.append('created_by', data._id);

        if(typeof info.date_published != 'function'){
          formData.append('date_published', info.date_published)
          console.log('data: ' + typeof info.date_published);
        }
          
        //why is this necessary
        info.image = formData;
        this.http.post_song(formData).subscribe((data : {err}) => {
          console.log(data);
          this.song_added = `Song has not been added. \n`;
          if(data.err){
            this.submit = true;
            for(let err in data.err.errors){
              console.log(err);
              this.song_added = this.song_added.concat(` Please include a song ${err}. \n`)
            }
            
          }else {
            this.submit = true;
            this.song_added = 'Song has been added';
          }
          
        });
      }catch(err){
        console.log(err);
        this.submit = true;
        this.song_added = 'Song has not been added. Please include an image';
      }
      
      
    })


  }

  getImage(){
    
  }
}
