import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewListDialogComponent } from '../new-list-dialog/newlist-dialog.component';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css'],
})
export class MyListsComponent implements OnInit {
  newListName: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  newList() {
    const dialogRef = this.dialog.open(NewListDialogComponent, {
      width: '300px',
      data: { name: this.newListName },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }
}
