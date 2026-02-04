'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { TriItem, CATEGORY_META } from '@/lib/search';

interface Props {
  item: TriItem | null;
  onClose: () => void;
  onSearchRelated: (term: string) => void;
}

export default function TriResultDrawer({ item, onClose, onSearchRelated }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onEscape);
    document.body.style.overflow = 'hidden';
    drawerRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const meta = CATEGORY_META[item.category];

  const proximityFilter =
    item.category === 'verre'
      ? 'verre'
      : item.category === 'decheterie' || item.category === 'specifique'
        ? 'decheterie'
        : null;

  return (
    <>
      {/* Overlay semi-transparent */}
      <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} aria-hidden="true" />

      {/* Drawer — bottom-sheet mobile, modal centré desktop */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Détails : ${item.labels[0]}`}
        tabIndex={-1}
        className="fixed bottom-0 left-0 right-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50 bg-white rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up outline-none"
      >
        {/* Poignée tactile (mobile) */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="p-5 md:p-6">
          {/* Bouton fermer */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Badges : catégorie + niveau de danger */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span
              className={`inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full ${meta.bgColor} ${meta.textColor}`}
            >
              <span aria-hidden="true">{meta.icon}</span>
              {meta.label}
            </span>

            {item.dangerLevel === 'high' && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
                ⚠️ Dangereux
              </span>
            )}
            {item.dangerLevel === 'medium' && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
                ⚠️ Attention
              </span>
            )}
          </div>

          {/* Titre + sous-titre */}
          <h2 className="text-2xl font-bold text-gray-900 capitalize">{item.labels[0]}</h2>
          <p className="text-base font-medium text-gray-500 mb-4">{item.binLabel}</p>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Instructions
            </h3>
            <p className="text-gray-800 text-sm leading-relaxed">{item.instructions}</p>
          </div>

          {/* Conseil */}
          {item.tips && (
            <div className="bg-emerald-50 rounded-xl p-4 mb-3 border border-emerald-100">
              <p className="text-emerald-800 text-sm leading-relaxed">
                <span aria-hidden="true">💡 </span>
                {item.tips}
              </p>
            </div>
          )}

          {/* Lien vers la page Proximité */}
          {proximityFilter && (
            <Link
              href={`/proximite?filter=${proximityFilter}`}
              className="flex items-center gap-2.5 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 hover:bg-blue-100 transition-colors mb-3"
            >
              <span className="text-xl" aria-hidden="true">📍</span>
              <div>
                <p className="font-semibold text-sm">
                  {proximityFilter === 'verre'
                    ? 'Voir les PAV verre proches'
                    : 'Trouver le point de collecte le plus proche'}
                </p>
                <p className="text-xs text-blue-600">
                  {proximityFilter === 'verre'
                    ? "Points d'apport volontaire verre"
                    : 'Déchèterie ou point de collecte spécifique'}
                </p>
              </div>
            </Link>
          )}

          {/* Objets liés (recherche rapide) */}
          {item.related.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Objets liés
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.related.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => onSearchRelated(term)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    🔍 {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
