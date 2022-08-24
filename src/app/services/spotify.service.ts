import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private searchUrl: string = '';
  private accessToken: string = '';

  constructor(private http: HttpClient, private firestore: Firestore) {}

  searchMusic(str: string, type = 'track') {
    this.searchUrl = 'https://api.spotify.com/v1/search';
  }
}
