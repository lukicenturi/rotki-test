import { Event } from '@/models/event';

export interface EventResponse {
  [address: string]: Event[];
}
