import { Polyline } from 'leaflet';

// Types for university locations
export type LocationCategory = 'building' | 'dormitory' | 'library' | 'cafeteria' | 'service';

interface DaySchedule {
  open: boolean;
  from?: string;
  to?: string;
}

export interface Location {
  id: string;
  name: string;
  category: LocationCategory;
  latitude: number;
  longitude: number;
  address?: string;
  description?: string;
  openHours?: DaySchedule[];
  website?: string;
  phone?: string;
}

// Type for Leaflet polyline (for routes)
export type PolylineType = Polyline;

// User's current location
export interface UserLocationType {
  latitude: number;
  longitude: number;
  accuracy?: number;
  follow: boolean;
}