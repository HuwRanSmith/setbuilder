import { Artist } from './artist';
import { Album } from './album';

export interface SpotifyTrack {
  id: string;
  uri: string;
  name?: string;
  duration_ms?: number;
  artists: Artist[];
  album: Album;
  preview_url?: string;
}
