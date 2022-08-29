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

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  one: MyTrack[] = [];
  two: MyTrack[] = [];
  three: MyTrack[] = [];
  four: MyTrack[] = [];

  addedTrack: MyTrack[] = [];

  constructor(
    private spotify: SpotifyService,
    private spotifySDK: SpotifyPlaybackSdkService,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.spotify.getAccessToken();
        this.spotifySDK.addSpotifyPlaybackSdk();
      } else {
        console.log('cannot set api token, not logged in');
      }
    });
  }

  addTrack(track: MyTrack) {
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
        var index = this.one.findIndex((track) => track.id === id);
        if (index !== -1) {
          this.one.splice(index, 1);
        }
        break;

      case 'two':
        var index = this.two.findIndex((track) => track.id === id);
        if (index !== -1) {
          this.two.splice(index, 1);
        }
        break;

      case 'three':
        var index = this.three.findIndex((track) => track.id === id);
        if (index !== -1) {
          this.three.splice(index, 1);
        }
        break;

      case 'four':
        var index = this.four.findIndex((track) => track.id === id);
        if (index !== -1) {
          this.four.splice(index, 1);
        }
        break;

      case 'addedTrack':
        this.addedTrack = [];
        break;
    }
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
