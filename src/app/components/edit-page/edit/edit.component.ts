import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Song } from '../../../song'
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  channelOne: Song[] = [];
  channelTwo: Song[] = [];
  channelThree: Song[] = [];
  channelFour: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
  }

  getSongs(): void {
    this.channelOne = this.songService.getSongs();
  }

  drop(event: CdkDragDrop<Song[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
