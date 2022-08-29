import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { MyTrack } from 'src/app/models/myTrack';
import { SpotifyPlaybackSdkService } from 'src/app/services/spotify-playback-sdk.service';
import { Setlist } from 'src/app/models/setlist';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  list: Setlist = {
    id: '',
    name: '',
    creator: '',
    one: [],
    two: [],
    three: [],
    four: [],
  };

  addedTrack: MyTrack[] = [];

  constructor(
    private spotify: SpotifyService,
    private spotifySDK: SpotifyPlaybackSdkService,
    private auth: Auth,
    private route: ActivatedRoute,
    private router: Router,
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

  addTrack(track: MyTrack) {
    console.log(track);
    this.addedTrack.push(track);
  }

  addBlank() {
    let blank: MyTrack = {
      id: '-1',
      uri: '',
      artists: [{}],
      album: { images: [] },
    };
    this.addedTrack.push(blank);
  }

  deleteTrack(id: string, listName: string) {
    switch (listName) {
      case 'one':
        var index = this.list.one.findIndex((track) => track.id === id);
        if (index !== -1) {
          this.list.one.splice(index, 1);
        }
        break;

      case 'two':
        var index = this.list.two.findIndex((track) => track.id === id);
        if (index !== -1) {
          this.list.two.splice(index, 1);
        }
        break;

      case 'three':
        var index = this.list.three.findIndex((track) => track.id === id);
        if (index !== -1) {
          this.list.three.splice(index, 1);
        }
        break;

      case 'four':
        var index = this.list.four.findIndex((track) => track.id === id);
        if (index !== -1) {
          this.list.four.splice(index, 1);
        }
        break;

      case 'addedTrack':
        this.addedTrack = [];
        break;
    }
  }

  async saveList() {
    await setDoc(doc(this.firestore, 'setlists', this.list.id), {
      name: this.list.name,
      creator: this.list.creator,
      one: this.list.one,
      two: this.list.two,
      three: this.list.three,
      four: this.list.four,
    });
    console.log('saved!');
  }

  drop(event: CdkDragDrop<MyTrack[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
