import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { SpotifyService } from 'src/app/services/spotify.service';
import { MyTrack } from 'src/app/models/myTrack';
import { SpotifyTrack } from 'src/app/models/spotifyTrack';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css'],
})
export class SongSearchComponent implements OnInit {
  searchStr: string = '';
  searchRes: MyTrack[] = [];

  @Output() trackSelectEvent = new EventEmitter<MyTrack>();

  constructor(private spotify: SpotifyService, private auth: Auth) {}

  ngOnInit(): void {}

  searchMusic() {
    this.searchRes = [];
    let spotifySearchRes: SpotifyTrack[];
    if (this.searchStr) {
      this.spotify.searchMusic(this.searchStr).subscribe((res) => {
        spotifySearchRes = res.tracks.items;
        for (
          let searchIndex = 0;
          searchIndex < spotifySearchRes.length;
          searchIndex++
        ) {
          const spotifyTrack = spotifySearchRes[searchIndex];
          let artists: Artist[] = [];
          for (
            let artistIndex = 0;
            artistIndex < spotifyTrack.artists.length;
            artistIndex++
          ) {
            const artist = spotifyTrack.artists[artistIndex];
            artists.push({ id: artist.id, name: artist.name });
          }
          let album: Album = {
            id: spotifyTrack.album.id,
            uri: spotifyTrack.album.uri,
            name: spotifyTrack.album.name,
            images: spotifyTrack.album.images,
          };
          this.spotify.getSingleAudioFeatures(spotifyTrack).subscribe((res) => {
            let camelotKey = this.spotify.getCamelotKey(res.key, res.mode);
            const track: MyTrack = {
              id: spotifyTrack.id,
              uri: spotifyTrack.uri,
              name: spotifyTrack.name,
              artists: artists,
              album: album,
              key: camelotKey,
              tempo: res.tempo,
              mode: res.mode,
            };
            this.searchRes.push(track);
          });
        }
      });
    } else {
      this.searchRes = [];
    }
  }

  selectTrack(track: MyTrack) {
    this.trackSelectEvent.emit(track);
  }
}
