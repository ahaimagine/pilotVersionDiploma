import { Institute } from '../types';

export const institutes: Institute[] = [
  {
    id: 'inst-ics',
    name: {
      uk: 'Інститут комп\'ютерних наук та інформаційних технологій',
      en: 'Institute of Computer Science and Information Technologies',
    },
    buildingId: 'main-building',
    description: {
      uk: 'Інститут займається підготовкою фахівців у галузі комп\'ютерних наук, інформаційних технологій та програмування.',
      en: 'The institute is engaged in training specialists in the field of computer science, information technology, and programming.',
    },
    departments: ['dept-cs'],
    contacts: {
      phone: '+380322582151',
      email: 'icsit@lpnu.ua',
      website: 'https://icsit.lpnu.ua',
    },
  },
  {
    id: 'inst-ire',
    name: {
      uk: 'Інститут інженерних розрахунків та електроніки',
      en: 'Institute of Engineering Calculations and Electronics',
    },
    buildingId: 'main-building',
    description: {
      uk: 'Інститут спеціалізується на інженерних розрахунках, проектуванні та електроніці.',
      en: 'The institute specializes in engineering calculations, design, and electronics.',
    },
    departments: ['dept-math', 'dept-physics'],
    contacts: {
      phone: '+380322582152',
      email: 'ire@lpnu.ua',
    },
  },
  {
    id: 'inst-arch',
    name: {
      uk: 'Інститут архітектури, будівництва та енергетики',
      en: 'Institute of Architecture, Construction and Energy',
    },
    buildingId: 'building-5',
    description: {
      uk: 'Інститут займається підготовкою архітекторів, будівельників та фахівців з енергетики.',
      en: 'The institute is engaged in training architects, builders, and energy specialists.',
    },
    departments: ['dept-civil', 'dept-architecture'],
    contacts: {
      phone: '+380322582153',
      email: 'arch@lpnu.ua',
    },
  },
  {
    id: 'inst-energy',
    name: {
      uk: 'Інститут енергетики та систем керування',
      en: 'Institute of Power Engineering and Control Systems',
    },
    buildingId: 'building-1',
    description: {
      uk: 'Інститут спеціалізується на енергетиці, системах керування та електротехніці.',
      en: 'The institute specializes in power engineering, control systems, and electrical engineering.',
    },
    departments: ['dept-ele', 'dept-telecom'],
    contacts: {
      phone: '+380322582154',
      email: 'energy@lpnu.ua',
    },
  },
  {
    id: 'inst-chemistry',
    name: {
      uk: 'Інститут хімії та хімічних технологій',
      en: 'Institute of Chemistry and Chemical Technologies',
    },
    buildingId: 'building-4',
    description: {
      uk: 'Інститут займається підготовкою фахівців у галузі хімії та хімічних технологій.',
      en: 'The institute is engaged in training specialists in the field of chemistry and chemical technologies.',
    },
    departments: ['dept-chem', 'dept-biochem'],
    contacts: {
      phone: '+380322582155',
      email: 'chemistry@lpnu.ua',
    },
  },
];