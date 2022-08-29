import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { Image } from 'src/app/models/image';
import { MyTrack } from 'src/app/models/myTrack';
import { SpotifyPlaybackSdkService } from 'src/app/services/spotify-playback-sdk.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css'],
})
export class SongCardComponent implements OnInit {
  @Input() track!: MyTrack;
  @Input() color?: string;

  @Output() deleteEvent = new EventEmitter();

  artists!: Artist[];
  images!: Image[];

  constructor(
    private spotifyService: SpotifyService,
    private spotifyPlaybackService: SpotifyPlaybackSdkService
  ) {}

  ngOnInit(): void {
    this.artists = this.track.artists;
    this.images = this.track.album.images;
  }

  onDelete() {
    this.deleteEvent.emit();
  }

  play() {
    this.spotifyService.play(this.track.uri);
  }

  pause() {
    this.spotifyService.pause();
  }
}
