import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Route } from '@angular/router';
import { Setlist } from 'src/app/models/setlist';
import { SpotifyPlaybackSdkService } from 'src/app/services/spotify-playback-sdk.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  list: Setlist = {
    id: '',
    name: '',
    creator: '',
    one: [],
    two: [],
    three: [],
    four: [],
  };

  constructor(
    private auth: Auth,
    private spotify: SpotifyService,
    private spotifySDK: SpotifyPlaybackSdkService,
    private route: ActivatedRoute,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.spotify.getAccessToken();
        this.spotifySDK.addSpotifyPlaybackSdk();
        let listId = this.route.snapshot.paramMap.get('id');
        if (listId === null) {
          listId = '';
        }
        const docRef = doc(this.firestore, 'setlists', listId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.list = {
            id: listId,
            name: docSnap.data()['name'],
            creator: docSnap.data()['creator'],
            one: docSnap.data()['one'],
            two: docSnap.data()['two'],
            three: docSnap.data()['three'],
            four: docSnap.data()['four'],
          };
        }
      } else {
        console.log('cannot set api token, not logged in');
      }
    });
  }
}
