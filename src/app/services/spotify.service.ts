import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private apiUrlBase: string = 'https://api.spotify.com/v1';
  private accessToken: string = '';
  private headers: HttpHeaders | undefined;

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
    return this.http.get(searchUrl, { headers: this.headers });
  }
}
