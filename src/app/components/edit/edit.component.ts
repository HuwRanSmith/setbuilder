import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  one: Track[] = [];
  two: Track[] = [];
  three: Track[] = [];
  four: Track[] = [];

  addedTrack: Track[] = [];

  constructor(private spotify: SpotifyService, private auth: Auth) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.spotify.getAccessToken();
      } else {
        console.log('cannot set api token, not logged in');
      }
    });
  }

  addTrack(track: Track) {
    this.addedTrack.push(track);
  }

  addBlank() {
    let blank: Track = {
      id: -1,
      artists: [{}],
    };
    this.addedTrack.push(blank);
  }

  deleteTrack(id: number, listName: string) {
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

  drop(event: CdkDragDrop<Track[]>) {
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
