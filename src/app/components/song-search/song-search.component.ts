import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css'],
})
export class SongSearchComponent implements OnInit {
  searchStr: string = '';

  constructor(private spotify: SpotifyService, private auth: Auth) {}

  ngOnInit(): void {}

  searchMusic() {
    this.spotify.searchMusic(this.searchStr).subscribe((res) => {
      console.log(res);
    });
  }
}
