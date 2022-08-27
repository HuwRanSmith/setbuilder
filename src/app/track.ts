import { Artist } from './artist';

export interface Track {
  id?: number;
  name: string;
  artists: Artist[];
  href?: string;
  preview_url?: string;
  uri?: string;
}
