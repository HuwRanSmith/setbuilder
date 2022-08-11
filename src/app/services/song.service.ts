import { Injectable } from '@angular/core';

import { Song } from '../song'; 
import { SONGS } from '../mock-songs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor() { }

  getSongs(): Song[] {
    return SONGS;
  }

  newSong(): Song {
    return { id: 1, name: 'new song', isBlank: false }
  }
}
