import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-test',
  templateUrl: './spotify-test.component.html',
  styleUrls: ['./spotify-test.component.css'],
})
export class SpotifyTestComponent implements OnInit {
  constructor(private spotify: SpotifyService) {}

  ngOnInit(): void {
    this.spotify.getAuth().subscribe((a) => {
      console.log(a);
    });
  }
}
