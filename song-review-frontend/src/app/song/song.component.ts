import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { Router } from '@angular/router';

interface Song {
  id: string,
  date_uploaded: string,
  rating: number,
  number_of_ratings: number,
  name: string,
  artist: string,
  created_by_username: string,
  song_image: string,
  audio_file: string,
  date_published: string,
}

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  song: Song;

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    const id = this.router.url.split('=')[1];
    this.http.get_song(id).subscribe((data: Song) => {
      this.song = data;
    });
  }

}
