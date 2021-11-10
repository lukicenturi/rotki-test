import EventType from '@/enums/EventType';
import { Balance } from '@/models/balance';

export interface Event {
  eventType: EventType;
  asset: string;
  value: Balance;
  timestamp: number;
}

export interface MappedEvent {
  asset: string;
  eventType: EventType;
  value: Balance;
  timestamp: number;
  address: string;
}
