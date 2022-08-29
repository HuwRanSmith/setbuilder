import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-newlist-dialog',
  templateUrl: './newlist-dialog.component.html',
  styleUrls: ['./newlist-dialog.component.css'],
})
export class NewListDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewlistDialogData
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }
}

export interface NewlistDialogData {
  name: string;
}
