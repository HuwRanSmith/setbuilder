import { Artist } from './artist';
import { Album } from './album';

export interface MyTrack {
  id: string;
  uri: string;
  name?: string;
  artists: Artist[];
  album: Album;
  key?: string;
  tempo?: number;
  mode?: number;
}
