import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css'],
})
export class SongCardComponent implements OnInit {
  @Input() track!: Track;
  @Input() color?: string;

  @Output() deleteEvent = new EventEmitter();

  artists!: Artist[];

  constructor() {}

  ngOnInit(): void {
    this.artists = this.track.artists;
  }

  onDelete() {
    this.deleteEvent.emit();
  }
}
