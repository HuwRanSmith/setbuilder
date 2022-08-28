import { Artist } from './artist';
import { Album } from './album';

export interface Track {
  id: number;
  uri?: string;
  name?: string;
  duration_ms?: number;
  artists: Artist[];
  album: Album;
  preview_url?: string;
}
