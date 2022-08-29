import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Setlist } from 'src/app/models/setlist';
import { NewListDialogComponent } from '../new-list-dialog/newlist-dialog.component';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css'],
})
export class MyListsComponent implements OnInit {
  newListName: string = '';
  lists: Setlist[] = [];
  user: User;

  constructor(
    private dialog: MatDialog,
    private firestore: Firestore,
    private auth: Auth,
    private router: Router
  ) {
    this.user = this.auth.currentUser!;
  }

  ngOnInit(): void {
    this.getLists();
  }

  async getLists() {
    const q = query(
      collection(this.firestore, 'setlists'),
      where('creator', '==', this.user.uid)
    );
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      let setlist: Setlist;
      setlist = {
        id: doc.id,
        name: doc.data()['name'],
        creator: doc.data()['creator'],
        one: [],
        two: [],
        three: [],
        four: [],
      };
      this.lists.push(setlist);
    });
  }

  newList() {
    const dialogRef = this.dialog.open(NewListDialogComponent, {
      width: '300px',
      data: { name: this.newListName },
    });

    dialogRef.afterClosed().subscribe(async (res) => {
      if (res) {
        this.newListName = res;
        const docRef = await addDoc(collection(this.firestore, 'setlists'), {
          name: this.newListName,
          creator: this.auth.currentUser?.uid,
          one: [],
          two: [],
          three: [],
          four: [],
        });
        this.router.navigate(['edit', docRef.id]);
      }
    });
  }

  onClick(id: string) {
    this.router.navigate(['edit', id]);
  }
}
