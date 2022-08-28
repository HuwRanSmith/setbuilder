import { Component, OnInit } from '@angular/core';
import { SpotifyPlaybackSdkService } from 'src/app/services/spotify-playback-sdk.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  constructor(
    private spotifyService: SpotifyService,
    private spotifyPlaybackService: SpotifyPlaybackSdkService
  ) {}

  ngOnInit(): void {
    this.spotifyPlaybackService.addSpotifyPlaybackSdk();
  }
}
