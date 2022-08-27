import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Track } from 'src/app/track';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css'],
})
export class SongSearchComponent implements OnInit {
  searchStr: string = '';
  searchRes: Track[] = [];

  @Output() trackSelectEvent = new EventEmitter<Track>();

  constructor(private spotify: SpotifyService, private auth: Auth) {}

  ngOnInit(): void {}

  searchMusic() {
    if (this.searchStr) {
      this.spotify.searchMusic(this.searchStr).subscribe((res) => {
        this.searchRes = res.tracks.items;
      });
    } else {
      this.searchRes = [];
    }
  }

  selectTrack(track: Track) {
    this.trackSelectEvent.emit(track);
  }
}
