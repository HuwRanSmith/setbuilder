import { Injectable } from '@angular/core';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyPlaybackSdkService {
  private player!: Spotify.Player;
  private deviceId!: string;
  private state!: Spotify.PlaybackState;

  accessToken!: string;

  constructor(private spotifyService: SpotifyService) {}

  // creates the spotify playback instance
  addSpotifyPlaybackSdk() {
    this.accessToken = (
      localStorage.getItem('spotify-access-token') || ''
    ).toString();
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.type = 'text/javascript';
    script.addEventListener('load', (e) => {
      console.log(e);
    });
    document.head.appendChild(script);
    // When SDK is ready
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('web SDK ready');
      this.player = new Spotify.Player({
        name: 'Web Playback SDK',
        volume: 0.5,
        getOAuthToken: (cb) => {
          cb(this.accessToken);
        },
      });

      // Connect the player
      this.player.connect().then((res) => {
        console.log(res);
      });

      // Listen to when the player is ready
      this.player.addListener('ready', (data) => {
        console.log('Ready with Device ID', data.device_id);
        this.deviceId = data.device_id;
        this.spotifyService.deviceId = this.deviceId;
      });
    };
  }
}
