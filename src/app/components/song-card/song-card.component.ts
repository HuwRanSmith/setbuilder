import { Component, OnInit, Input } from '@angular/core';
import { Artist } from 'src/app/artist';
import { Track } from 'src/app/track';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css'],
})
export class SongCardComponent implements OnInit {
  @Input() track!: Track;
  @Input() color?: string;

  artists!: Artist[];

  constructor() {}

  ngOnInit(): void {
    this.artists = this.track.artists;
  }
}
