import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Track } from 'src/app/track';

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
      name: '_blank_',
      artists: [{}],
    };
    this.addedTrack.push(blank);
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
