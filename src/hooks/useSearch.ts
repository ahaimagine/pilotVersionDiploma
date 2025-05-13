import { useState, useMemo } from 'react';
import { Building, Department, Institute } from '../types';
import { buildings } from '../data/buildings';
import { departments } from '../data/departments';
import { institutes } from '../data/institutes';
import { useTranslation } from 'react-i18next';

interface SearchItem {
  id: string;
  type: 'building' | 'department' | 'institute';
  name: string;
  buildingId: string;
}

function useSearch() {
  const [query, setQuery] = useState('');
  const { i18n } = useTranslation();
  const lang = i18n.language as 'uk' | 'en';

  // Create search items array
  const searchItems = useMemo(() => {
    const items: SearchItem[] = [
      ...buildings.map((building) => ({
        id: building.id,
        type: 'building' as const,
        name: building.name[lang],
        buildingId: building.id,
      })),
      ...departments.map((department) => ({
        id: department.id,
        type: 'department' as const,
        name: department.name[lang],
        buildingId: department.buildingId,
      })),
      ...institutes.map((institute) => ({
        id: institute.id,
        type: 'institute' as const,
        name: institute.name[lang],
        buildingId: institute.buildingId,
      })),
    ];
    return items;
  }, [lang]);

  // Filter items based on search query
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const normalizedQuery = query.toLowerCase();
    return searchItems.filter((item) =>
      item.name.toLowerCase().includes(normalizedQuery)
    );
  }, [query, searchItems]);

  return {
    query,
    setQuery,
    results,
  };
}

export default useSearch;