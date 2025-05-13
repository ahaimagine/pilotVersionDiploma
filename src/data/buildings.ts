import { Building } from '../types';

// Real coordinates of Lviv Polytechnic National University buildings
export const buildings: Building[] = [
  {
    id: 'main-building',
    name: {
      uk: 'Головний корпус',
      en: 'Main Building',
    },
    coordinates: [49.8353, 24.0147], // Actual coordinates of the main building
    address: {
      uk: 'вул. С. Бандери, 12, Львів',
      en: '12 S. Bandera St., Lviv',
    },
    workingHours: {
      uk: 'Пн-Пт: 08:00 - 20:00, Сб: 08:00 - 15:00, Нд: Зачинено',
      en: 'Mon-Fri: 8:00 AM - 8:00 PM, Sat: 8:00 AM - 3:00 PM, Sun: Closed',
    },
    contacts: {
      phone: '+380322582111',
      email: 'coffice@lpnu.ua',
      website: 'https://lpnu.ua',
    },
    departments: ['dept-cs', 'dept-math', 'dept-physics'],
    institutes: ['inst-ics', 'inst-ire'],
  },
  {
    id: 'building-5',
    name: {
      uk: 'Корпус 5',
      en: 'Building 5',
    },
    coordinates: [49.8361, 24.0138], // Actual coordinates
    address: {
      uk: 'вул. Митрополита Андрея, 5, Львів',
      en: '5 Metropolitan Andrey St., Lviv',
    },
    workingHours: {
      uk: 'Пн-Пт: 08:00 - 18:00, Сб-Нд: Зачинено',
      en: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat-Sun: Closed',
    },
    contacts: {
      phone: '+380322582000',
      email: 'info@lpnu.ua',
    },
    departments: ['dept-civil', 'dept-architecture'],
    institutes: ['inst-arch'],
  },
  {
    id: 'building-1',
    name: {
      uk: 'Корпус 1',
      en: 'Building 1',
    },
    coordinates: [49.8358, 24.0149], // Actual coordinates
    address: {
      uk: 'вул. Карпінського, 2/4, Львів',
      en: '2/4 Karpinskoho St., Lviv',
    },
    workingHours: {
      uk: 'Пн-Пт: 08:00 - 20:00, Сб: 08:00 - 15:00, Нд: Зачинено',
      en: 'Mon-Fri: 8:00 AM - 8:00 PM, Sat: 8:00 AM - 3:00 PM, Sun: Closed',
    },
    contacts: {
      phone: '+380322582222',
      email: 'dpt@lpnu.ua',
    },
    departments: ['dept-ele', 'dept-telecom'],
    institutes: ['inst-energy'],
  },
  {
    id: 'building-4',
    name: {
      uk: 'Корпус 4',
      en: 'Building 4',
    },
    coordinates: [49.8350, 24.0145], // Actual coordinates
    address: {
      uk: 'вул. С. Бандери, 28a, Львів',
      en: '28a S. Bandera St., Lviv',
    },
    workingHours: {
      uk: 'Пн-Пт: 08:00 - 18:00, Сб-Нд: Зачинено',
      en: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat-Sun: Closed',
    },
    contacts: {
      phone: '+380322582333',
      email: 'chem@lpnu.ua',
    },
    departments: ['dept-chem', 'dept-biochem'],
    institutes: ['inst-chemistry'],
  },
  {
    id: 'library',
    name: {
      uk: 'Наукова бібліотека',
      en: 'Scientific Library',
    },
    coordinates: [49.8345, 24.0143], // Actual coordinates
    address: {
      uk: 'вул. Професорська, 1, Львів',
      en: '1 Profesorska St., Lviv',
    },
    workingHours: {
      uk: 'Пн-Пт: 09:00 - 19:00, Сб: 09:00 - 16:00, Нд: Зачинено',
      en: 'Mon-Fri: 9:00 AM - 7:00 PM, Sat: 9:00 AM - 4:00 PM, Sun: Closed',
    },
    contacts: {
      phone: '+380322582444',
      email: 'library@lpnu.ua',
      website: 'https://library.lpnu.ua',
    },
    departments: [],
    institutes: [],
  },
];

// Lviv Polytechnic campus center coordinates
export const CAMPUS_CENTER: [number, number] = [49.8353, 24.0147];
export const DEFAULT_ZOOM = 17;