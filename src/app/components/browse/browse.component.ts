import { Component, OnInit } from '@angular/core';
import { Firestore, query, collection, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Setlist } from 'src/app/models/setlist';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  lists: Setlist[] = [];

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.getLists();
  }

  async getLists() {
    const q = query(collection(this.firestore, 'setlists'));
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

  onClick(id: string) {
    this.router.navigate(['view', id]);
  }
}
