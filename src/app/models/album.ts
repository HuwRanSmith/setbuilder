import { Image } from './image';

export interface Album {
  id?: string;
  uri?: string;
  name?: string;
  images: Image[];
}
