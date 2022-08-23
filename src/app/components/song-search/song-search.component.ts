import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css'],
})
export class SongSearchComponent implements OnInit {
  searchStr: string = '';

  constructor() {}

  ngOnInit(): void {}

  searchMusic() {
    console.log(this.searchStr);
  }
}
