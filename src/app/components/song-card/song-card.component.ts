import { Component, OnInit, Input } from '@angular/core';
import { Song } from 'src/app/song';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css'],
})
export class SongCardComponent implements OnInit {
  @Input() song: Song | undefined;
  @Input() color: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}
