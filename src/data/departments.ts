import { Department } from '../types';

export const departments: Department[] = [
  {
    id: 'dept-cs',
    name: {
      uk: 'Кафедра комп\'ютерних наук',
      en: 'Department of Computer Science',
    },
    buildingId: 'main-building',
    description: {
      uk: 'Кафедра спеціалізується на дослідженнях та навчанні в галузі комп\'ютерних наук, алгоритмів та штучного інтелекту.',
      en: 'The department specializes in research and education in computer science, algorithms, and artificial intelligence.',
    },
    contacts: {
      phone: '+380322582123',
      email: 'cs.dept@lpnu.ua',
      website: 'https://cs.lpnu.ua',
    },
  },
  {
    id: 'dept-math',
    name: {
      uk: 'Кафедра прикладної математики',
      en: 'Department of Applied Mathematics',
    },
    buildingId: 'main-building',
    description: {
      uk: 'Кафедра зосереджується на прикладній математиці та її застосуваннях у різних галузях науки і техніки.',
      en: 'The department focuses on applied mathematics and its applications in various fields of science and technology.',
    },
    contacts: {
      phone: '+380322582124',
      email: 'math.dept@lpnu.ua',
    },
  },
  {
    id: 'dept-physics',
    name: {
      uk: 'Кафедра фізики',
      en: 'Department of Physics',
    },
    buildingId: 'main-building',
    description: {
      uk: 'Кафедра займається вивченням фізичних процесів та явищ, а також їх прикладним застосуванням.',
      en: 'The department is engaged in the study of physical processes and phenomena, as well as their practical applications.',
    },
    contacts: {
      phone: '+380322582125',
      email: 'physics.dept@lpnu.ua',
    },
  },
  {
    id: 'dept-civil',
    name: {
      uk: 'Кафедра будівництва та цивільної інженерії',
      en: 'Department of Construction and Civil Engineering',
    },
    buildingId: 'building-5',
    description: {
      uk: 'Кафедра займається підготовкою фахівців у галузі будівництва та цивільної інженерії.',
      en: 'The department is engaged in training specialists in the field of construction and civil engineering.',
    },
    contacts: {
      phone: '+380322582126',
      email: 'civil.dept@lpnu.ua',
    },
  },
  {
    id: 'dept-architecture',
    name: {
      uk: 'Кафедра архітектури та містобудування',
      en: 'Department of Architecture and Urban Planning',
    },
    buildingId: 'building-5',
    description: {
      uk: 'Кафедра спеціалізується на архітектурному проектуванні, містобудуванні та ландшафтній архітектурі.',
      en: 'The department specializes in architectural design, urban planning, and landscape architecture.',
    },
    contacts: {
      phone: '+380322582127',
      email: 'arch.dept@lpnu.ua',
    },
  },
  {
    id: 'dept-ele',
    name: {
      uk: 'Кафедра електроенергетики та систем управління',
      en: 'Department of Electric Power and Control Systems',
    },
    buildingId: 'building-1',
    description: {
      uk: 'Кафедра займається дослідженнями та навчанням у галузі електроенергетики та систем управління.',
      en: 'The department is engaged in research and education in the field of electric power and control systems.',
    },
    contacts: {
      phone: '+380322582128',
      email: 'ele.dept@lpnu.ua',
    },
  },
  {
    id: 'dept-telecom',
    name: {
      uk: 'Кафедра телекомунікацій',
      en: 'Department of Telecommunications',
    },
    buildingId: 'building-1',
    description: {
      uk: 'Кафедра спеціалізується на системах телекомунікацій, мобільному зв\'язку та бездротових технологіях.',
      en: 'The department specializes in telecommunication systems, mobile communications, and wireless technologies.',
    },
    contacts: {
      phone: '+380322582129',
      email: 'telecom.dept@lpnu.ua',
    },
  },
  {
    id: 'dept-chem',
    name: {
      uk: 'Кафедра хімії',
      en: 'Department of Chemistry',
    },
    buildingId: 'building-4',
    description: {
      uk: 'Кафедра займається дослідженнями в галузі хімії та підготовкою фахівців-хіміків.',
      en: 'The department is engaged in research in the field of chemistry and training of chemists.',
    },
    contacts: {
      phone: '+380322582130',
      email: 'chem.dept@lpnu.ua',
    },
  },
  {
    id: 'dept-biochem',
    name: {
      uk: 'Кафедра біохімії',
      en: 'Department of Biochemistry',
    },
    buildingId: 'building-4',
    description: {
      uk: 'Кафедра спеціалізується на біохімії, молекулярній біології та суміжних галузях.',
      en: 'The department specializes in biochemistry, molecular biology, and related fields.',
    },
    contacts: {
      phone: '+380322582131',
      email: 'biochem.dept@lpnu.ua',
    },
  },
];