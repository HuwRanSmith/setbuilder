import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private searchUrl: string = '';

  constructor(private http: HttpClient) {}

  searchMusic(str: string, type = 'track') {
    this.searchUrl = 'https://api.spotify.com/v1/search';
  }
}
