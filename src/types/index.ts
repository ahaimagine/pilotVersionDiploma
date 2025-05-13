export interface Building {
  id: string;
  name: {
    uk: string;
    en: string;
  };
  coordinates: [number, number]; // [latitude, longitude]
  address: {
    uk: string;
    en: string;
  };
  workingHours: {
    uk: string;
    en: string;
  };
  contacts: {
    phone?: string;
    email?: string;
    website?: string;
  };
  departments: string[]; // department IDs
  institutes: string[]; // institute IDs
}

export interface Department {
  id: string;
  name: {
    uk: string;
    en: string;
  };
  buildingId: string;
  description?: {
    uk: string;
    en: string;
  };
  contacts?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface Institute {
  id: string;
  name: {
    uk: string;
    en: string;
  };
  buildingId: string;
  description?: {
    uk: string;
    en: string;
  };
  departments: string[]; // department IDs
  contacts?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface FeedbackFormData {
  name: string;
  email: string;
  message: string;
}

export type ThemeMode = 'light' | 'dark';
export type Language = 'uk' | 'en';