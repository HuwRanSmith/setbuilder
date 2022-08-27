import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Song } from '../../song';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  one: Song[] = [];
  two: Song[] = [];
  three: Song[] = [];
  four: Song[] = [];

  addSong: Song[] = [];
  addBlank: Song[] = [];

  constructor(private spotify: SpotifyService, private auth: Auth) {}

  ngOnInit(): void {
    //console.log(this.auth.currentUser);
    //this.spotify.setTokenHeader();
  }

  getSongs(): void {}

  drop(event: CdkDragDrop<Song[]>) {
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
