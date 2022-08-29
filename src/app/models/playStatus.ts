import { PlayStatusItem } from './playStatusItem';

export interface PlayStatus {
  progress_ms: number;
  is_playing: boolean;
  item: PlayStatusItem;
}
