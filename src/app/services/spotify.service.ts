import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { map } from 'rxjs';
import { PlayStatus } from '../models/playStatus';

export interface SpotifyOptions {
  limit?: number;
  offset?: number;
  market?: string;
  album_type?: string;
  country?: string;
  type?: string;
  q?: string;
  timestamp?: string;
  locale?: string;
  public?: boolean;
  name?: string;
  position_ms?: number;
  volume_percent?: number;
  code?: string;
  redirect_uri?: string;
  grant_type?: string;
  refresh_token?: string;
  device_id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrlBase: string = 'https://api.spotify.com/v1';
  private accessToken: string = '';
  private headers: HttpHeaders | undefined;

  currentTrackUri: string = '';
  deviceId?: string;
  playStatus: PlayStatus = {
    progress_ms: 0,
    is_playing: false,
    item: { duration_ms: 0 },
  };

  constructor(
    private http: HttpClient,
    private firestore: Firestore,
    private auth: Auth
  ) {}

  async getAccessToken() {
    if (this.auth.currentUser) {
      const uid = this.auth.currentUser.uid;
      const docRef = doc(this.firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
      this.accessToken = docSnap.data()!['spotifyAccessToken'];
      localStorage.setItem('spotify-access-token', this.accessToken);
      this.setTokenHeader();
    } else {
      console.log('not authenticated');
    }
  }

  setTokenHeader() {
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.accessToken}`
    );
  }

  searchMusic(str: string, type = 'track') {
    const searchUrl =
      this.apiUrlBase + '/search?query=' + str + '&type=' + type + '&limit=5';
    return this.http.get<any>(searchUrl, { headers: this.headers });
  }

  play(trackUri: string, options?: SpotifyOptions) {
    options = options || {};
    this.currentTrackUri = trackUri;
    this.playStatus.is_playing = true;
    if (this.deviceId) {
      options.device_id = this.deviceId;
    }
    if (trackUri) {
      return this.http
        .put(
          `${this.apiUrlBase}/me/player/play`,
          {
            uris: [trackUri],
          },
          {
            params: this.makeHttpParams(options),
            headers: this.headers,
          }
        )
        .toPromise()
        .then((res) => res)
        .catch((err) => console.log(err));
    } else {
      return this.http
        .put(
          `${this.apiUrlBase}/me/player/play`,
          {},
          {
            params: this.makeHttpParams(options),
            headers: this.headers,
          }
        )
        .toPromise()
        .then((res) => res)
        .catch((err) => console.log(err));
    }
  }

  pause(options?: SpotifyOptions) {
    options = options || {};
    if (this.playStatus.is_playing) {
      this.playStatus.is_playing = false;
      return this.http
        .put(
          `${this.apiUrlBase}/me/player/pause`,
          {},
          {
            params: this.makeHttpParams(options),
            headers: this.headers,
          }
        )
        .toPromise()
        .then((res) => res)
        .catch((err) => console.log(err));
    } else {
      return new Promise<Response | void>((resolve, reject) => {
        resolve();
        // the resolve / reject functions control the fate of the promise
      });
    }
  }
  private makeHttpParams(options: any): HttpParams {
    let params = new HttpParams();
    Object.keys(options).forEach((e) => (params = params.set(e, options[e])));
    return params;
  }
}
