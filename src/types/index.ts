export interface Building {
  id: number;
  name: {
    uk: string;
    en: string;
  };
  coordinates: [number, number]; // [latitude, longitude]
  address: {
    uk: string;
    en: string;
  };
  working_hours: {
    uk: string;
    en: string;
  };
  phone_number: string;
  departments: number[]; // department IDs
  institutes: number[]; // institute IDs
  original_lpnu_id: number
}

export interface Department {
  id: number;
  name: {
    uk: string;
    en: string;
  };
  // buildingId: string;
  institute_id: number,
  original_lpnu_id: number,
  location: {
    uk: string,
    en: string
  }
  description?: {
    uk: string;
    en: string;
  };
  // contacts?: {
  //   phone?: string;
  //   email?: string;
  //   website?: string;
  // };
}

export interface Institute {
  id: number;
  name: {
    uk: string;
    en: string;
  };
  // buildingId: string;
  description?: {
    uk: string;
    en: string;
  };
    location: {
    uk: string,
    en: string
  };
  departments: number[]; // department IDs
  original_lpnu_id: number;
  // contacts?: {
  //   phone?: string;
  //   email?: string;
  //   website?: string;
  // };
}

export interface FeedbackFormData {
  name: string;
  email: string;
  message: string;
}

export type ThemeMode = 'light' | 'dark';
export type Language = 'uk' | 'en';