import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  channelOne: string[] = ['Tour', 'Mission', 'All Night'];
  channelTwo: string[] = ['Renaissance', 'Bearclaw', 'Techno'];
  channelThree: string[] = ['Machina', 'Solar System', 'Sundown'];
  channelFour: string[] = ['Horizon', 'Siren', 'Galaxies'];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
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
