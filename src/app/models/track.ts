import { Artist } from './artist';

export interface Track {
  id: number;
  uri?: string;
  name?: string;
  artists: Artist[];
  href?: string;
  preview_url?: string;
}
