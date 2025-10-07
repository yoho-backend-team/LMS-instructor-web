import { useState, useMemo } from 'react';
import type { FAQItem } from './types';

export const useFAQ = (items: FAQItem[]) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredItems = useMemo(() => 
    items.filter((item: any) =>
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    ), [items, searchQuery]
  );

  const expandAll = () => {
    setExpandedItems(new Set(filteredItems.map(item => item.id)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return {
    expandedItems,
    searchQuery,
    filteredItems,
    toggleExpand,
    setSearchQuery,
    expandAll,
    collapseAll
  };
};