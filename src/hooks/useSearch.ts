import { useState, useMemo } from 'react';
import { Building, Department, Institute } from '../types';
import { useTranslation } from 'react-i18next';
import { useBuildingsContext } from '@context/BuildingsContext';

interface SearchItem {
  id: number;
  type: 'building' | 'department' | 'institute';
  name: string;
  original_lpnu_id: number;
}

function useSearch() {
  const [query, setQuery] = useState('');
  const { i18n } = useTranslation();
  const lang = i18n.language as 'uk' | 'en';
  const { institutes, departments, buildings } = useBuildingsContext();
  // Create search items array
  const searchItems = useMemo(() => {
    if (!buildings || !departments || !institutes) return [];

    const items: SearchItem[] = [
      ...buildings.map((building) => ({
        id: building.original_lpnu_id,
        type: 'building' as const,
        name: building.name[lang],
        original_lpnu_id: building.original_lpnu_id,
      })),
      ...departments.map((department) => ({
        id: department.id,
        type: 'department' as const,
        name: department.name[lang],
        original_lpnu_id: department.original_lpnu_id,
      })),
      ...institutes.map((institute) => ({
        id: institute.id,
        type: 'institute' as const,
        name: institute.name[lang],
        original_lpnu_id: institute.original_lpnu_id,
      })),
    ];
    return items;
  }, [lang, buildings, departments, institutes]);

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