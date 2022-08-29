import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { Track } from 'src/app/models/track';
import { SpotifyPlaybackSdkService } from 'src/app/services/spotify-playback-sdk.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css'],
})
export class SongCardComponent implements OnInit {
  @Input() track!: Track;
  @Input() color?: string;

  @Output() deleteEvent = new EventEmitter();

  artists!: Artist[];

  constructor(
    private spotifyService: SpotifyService,
    private spotifyPlaybackService: SpotifyPlaybackSdkService
  ) {}

  ngOnInit(): void {
    this.artists = this.track.artists;
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
