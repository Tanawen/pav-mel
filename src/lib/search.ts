import Fuse from 'fuse.js';
import rawItems from '@/data/tri-items.json';

// ── Types ────────────────────────────────────────────────────────────────────
export type CategoryId =
  | 'jaune'
  | 'verre'
  | 'biodechets'
  | 'ordures'
  | 'decheterie'
  | 'specifique';

export interface TriItem {
  id: string;
  labels: string[];
  category: CategoryId;
  binLabel: string;
  instructions: string;
  tips: string;
  dangerLevel: 'high' | 'medium' | null;
  related: string[];
}

// ── Métadonnées visuelles par catégorie ──────────────────────────────────────
export const CATEGORY_META: Record<
  CategoryId,
  {
    label: string;
    textColor: string;
    bgColor: string;
    icon: string;
    gradient: string;
  }
> = {
  jaune: {
    label: 'Jaune',
    textColor: 'text-amber-800',
    bgColor: 'bg-amber-100',
    icon: '📦',
    gradient: 'from-amber-400 to-yellow-500',
  },
  verre: {
    label: 'Verre',
    textColor: 'text-green-800',
    bgColor: 'bg-green-100',
    icon: '🍾',
    gradient: 'from-green-500 to-emerald-600',
  },
  biodechets: {
    label: 'Biodéchets',
    textColor: 'text-amber-900',
    bgColor: 'bg-amber-200',
    icon: '🍂',
    gradient: 'from-amber-600 to-amber-800',
  },
  ordures: {
    label: 'Ordures',
    textColor: 'text-gray-700',
    bgColor: 'bg-gray-200',
    icon: '🗑️',
    gradient: 'from-gray-500 to-gray-700',
  },
  decheterie: {
    label: 'Déchèterie',
    textColor: 'text-red-800',
    bgColor: 'bg-red-100',
    icon: '🏭',
    gradient: 'from-red-500 to-red-700',
  },
  specifique: {
    label: 'Spécifique',
    textColor: 'text-purple-800',
    bgColor: 'bg-purple-100',
    icon: '📍',
    gradient: 'from-purple-500 to-purple-700',
  },
};

// ── Normalisation : minuscules + suppression des accents ─────────────────────
function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ── Index Fuse sur les labels normalisés ─────────────────────────────────────
const items = rawItems as TriItem[];

const indexable = items.map((item, idx) => ({
  _idx: idx,
  _labels: item.labels.map(normalize),
}));

const fuse = new Fuse(indexable, {
  keys: ['_labels'],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
});

// ── API publique ─────────────────────────────────────────────────────────────
export interface SearchResult {
  item: TriItem;
  score: number;
}

export function searchItems(query: string): SearchResult[] {
  const q = normalize(query.trim());
  if (!q) return [];

  return fuse
    .search(q)
    .slice(0, 8)
    .map((r) => ({ item: items[r.item._idx], score: r.score ?? 1 }));
}

export function getAllItems(): TriItem[] {
  return items;
}

const SUGGESTION_IDS = [
  'pile',
  'carton-pizza-sale',
  'aerosol',
  'verre-brise',
  'sopalin-usage',
  'polystyrene-emballage',
];

export function getSuggestions(): TriItem[] {
  return SUGGESTION_IDS.map((id) => items.find((item) => item.id === id)).filter(
    (item): item is TriItem => !!item
  );
}
