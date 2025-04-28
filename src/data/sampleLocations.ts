import { Location } from '../types';

// Sample data for Lviv Polytechnic
export const sampleLocations: Location[] = [
  {
    id: 'main-building',
    name: 'Main Building',
    category: 'building',
    latitude: 49.8353,
    longitude: 24.0146,
    address: 'Stepana Bandery St, 12, Lviv',
    description: 'The historic main building of Lviv Polytechnic National University, built in 1877.',
    openHours: [
      { open: false }, // Sunday
      { open: true, from: '08:00', to: '20:00' }, // Monday
      { open: true, from: '08:00', to: '20:00' }, // Tuesday
      { open: true, from: '08:00', to: '20:00' }, // Wednesday
      { open: true, from: '08:00', to: '20:00' }, // Thursday
      { open: true, from: '08:00', to: '20:00' }, // Friday
      { open: true, from: '09:00', to: '16:00' }  // Saturday
    ],
    website: 'https://lpnu.ua/en',
    phone: '+380322582111'
  },
  {
    id: 'building-5',
    name: 'Building 5 (Computer Science)',
    category: 'building',
    latitude: 49.8365,
    longitude: 24.0140,
    address: 'Profesorska St, 1, Lviv',
    description: 'Home to the Institute of Computer Science and Information Technologies.',
    openHours: [
      { open: false }, // Sunday
      { open: true, from: '08:00', to: '20:00' }, // Monday
      { open: true, from: '08:00', to: '20:00' }, // Tuesday
      { open: true, from: '08:00', to: '20:00' }, // Wednesday
      { open: true, from: '08:00', to: '20:00' }, // Thursday
      { open: true, from: '08:00', to: '20:00' }, // Friday
      { open: true, from: '09:00', to: '15:00' }  // Saturday
    ]
  },
  {
    id: 'library',
    name: 'Scientific Library',
    category: 'library',
    latitude: 49.8362,
    longitude: 24.0157,
    address: 'Profesorska St, 1, Lviv',
    description: 'The main university library with over 1.8 million books and manuscripts.',
    openHours: [
      { open: false }, // Sunday
      { open: true, from: '09:00', to: '19:00' }, // Monday
      { open: true, from: '09:00', to: '19:00' }, // Tuesday
      { open: true, from: '09:00', to: '19:00' }, // Wednesday
      { open: true, from: '09:00', to: '19:00' }, // Thursday
      { open: true, from: '09:00', to: '19:00' }, // Friday
      { open: true, from: '09:00', to: '15:00' }  // Saturday
    ],
    website: 'http://library.lp.edu.ua/en'
  },
  {
    id: 'dorm-1',
    name: 'Student Dormitory №1',
    category: 'dormitory',
    latitude: 49.8369,
    longitude: 24.0177,
    address: 'Henerala Chuprynky St, 49, Lviv',
    description: 'Student dormitory with accommodation for 400 students.',
    openHours: [
      { open: true, from: '06:00', to: '23:00' }, // Sunday
      { open: true, from: '06:00', to: '23:00' }, // Monday
      { open: true, from: '06:00', to: '23:00' }, // Tuesday
      { open: true, from: '06:00', to: '23:00' }, // Wednesday
      { open: true, from: '06:00', to: '23:00' }, // Thursday
      { open: true, from: '06:00', to: '23:00' }, // Friday
      { open: true, from: '06:00', to: '23:00' }  // Saturday
    ]
  },
  {
    id: 'cafeteria-main',
    name: 'Main Cafeteria',
    category: 'cafeteria',
    latitude: 49.8355,
    longitude: 24.0160,
    address: 'Karpinskoho St, 2/4, Lviv',
    description: 'The main university cafeteria offering affordable meals for students and staff.',
    openHours: [
      { open: false }, // Sunday
      { open: true, from: '08:00', to: '16:00' }, // Monday
      { open: true, from: '08:00', to: '16:00' }, // Tuesday
      { open: true, from: '08:00', to: '16:00' }, // Wednesday
      { open: true, from: '08:00', to: '16:00' }, // Thursday
      { open: true, from: '08:00', to: '16:00' }, // Friday
      { open: false }  // Saturday
    ]
  },
  {
    id: 'sport-complex',
    name: 'Sports Complex',
    category: 'service',
    latitude: 49.8384,
    longitude: 24.0164,
    address: 'Bandera St, 12, Lviv',
    description: 'University sports complex with gyms, pool, and athletics facilities.',
    openHours: [
      { open: true, from: '10:00', to: '18:00' }, // Sunday
      { open: true, from: '08:00', to: '21:00' }, // Monday
      { open: true, from: '08:00', to: '21:00' }, // Tuesday
      { open: true, from: '08:00', to: '21:00' }, // Wednesday
      { open: true, from: '08:00', to: '21:00' }, // Thursday
      { open: true, from: '08:00', to: '21:00' }, // Friday
      { open: true, from: '10:00', to: '18:00' }  // Saturday
    ],
    website: 'https://lpnu.ua/en/sports-complex'
  },
  {
    id: 'innovation-center',
    name: 'Innovation Center',
    category: 'service',
    latitude: 49.8348,
    longitude: 24.0128,
    address: 'Kotlyarevskoho St, 3, Lviv',
    description: 'Center for innovation and technology transfer.',
    openHours: [
      { open: false }, // Sunday
      { open: true, from: '09:00', to: '18:00' }, // Monday
      { open: true, from: '09:00', to: '18:00' }, // Tuesday
      { open: true, from: '09:00', to: '18:00' }, // Wednesday
      { open: true, from: '09:00', to: '18:00' }, // Thursday
      { open: true, from: '09:00', to: '18:00' }, // Friday
      { open: false }  // Saturday
    ]
  },
  {
    id: 'building-4',
    name: 'Building 4 (Electronics)',
    category: 'building',
    latitude: 49.8343,
    longitude: 24.0152,
    address: 'Mytropolyta Andreia St, 5, Lviv',
    description: 'Home to the Institute of Telecommunications, Radioelectronics and Electronic Engineering.',
    openHours: [
      { open: false }, // Sunday
      { open: true, from: '08:00', to: '20:00' }, // Monday
      { open: true, from: '08:00', to: '20:00' }, // Tuesday
      { open: true, from: '08:00', to: '20:00' }, // Wednesday
      { open: true, from: '08:00', to: '20:00' }, // Thursday
      { open: true, from: '08:00', to: '20:00' }, // Friday
      { open: true, from: '09:00', to: '15:00' }  // Saturday
    ]
  }
];