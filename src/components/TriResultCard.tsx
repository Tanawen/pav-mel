'use client';

import Link from 'next/link';
import { TriItem, CATEGORY_META } from '@/lib/search';

interface Props {
  item: TriItem;
  isTopResult?: boolean;
  onOpenDetail: () => void;
}

export default function TriResultCard({ item, isTopResult, onOpenDetail }: Props) {
  const meta = CATEGORY_META[item.category];

  const proximityFilter =
    item.category === 'verre'
      ? 'verre'
      : item.category === 'decheterie' || item.category === 'specifique'
        ? 'decheterie'
        : null;

  return (
    <article
      className={`bg-white rounded-2xl border shadow-sm overflow-hidden card-hover ${
        isTopResult ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-gray-200'
      }`}
    >
      {isTopResult && (
        <div className="bg-emerald-50 px-4 py-1.5">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Meilleure correspondance
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900 text-lg capitalize">{item.labels[0]}</h3>

              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${meta.bgColor} ${meta.textColor}`}
              >
                <span aria-hidden="true">{meta.icon}</span>
                {meta.label}
              </span>
            </div>

            <p className="text-sm font-medium text-gray-600 mt-1">{item.binLabel}</p>
            <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{item.instructions}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <button
            type="button"
            onClick={onOpenDetail}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            En savoir plus →
          </button>

          {proximityFilter && (
            <Link
              href={`/proximite?filter=${proximityFilter}`}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              📍 Point le plus proche
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
