import { MyTrack } from './myTrack';

export interface Setlist {
  id: string;
  name: string;
  creator: string;
  one?: MyTrack[];
  two?: MyTrack[];
  three?: MyTrack[];
  Four?: MyTrack[];
}
