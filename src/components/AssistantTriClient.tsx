'use client';

import { useState, useMemo } from 'react';
import TriSearch from '@/components/TriSearch';
import TriResultCard from '@/components/TriResultCard';
import TriResultDrawer from '@/components/TriResultDrawer';
import {
  searchItems,
  getSuggestions,
  getAllItems,
  CATEGORY_META,
  type CategoryId,
  type TriItem,
} from '@/lib/search';

export default function AssistantTriClient() {
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<TriItem | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  const results = useMemo(() => searchItems(query), [query]);
  const suggestions = useMemo(() => getSuggestions(), []);

  const handleSearchRelated = (term: string) => {
    setSelectedItem(null);
    setQuery(term);
  };

  // ── Vue « Toutes les catégories » ───────────────────────────────────────
  if (showCategories) {
    const allItems = getAllItems();
    const categories = Object.keys(CATEGORY_META) as CategoryId[];

    return (
      <>
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-3xl md:text-4xl" aria-hidden="true">📋</span>
              Toutes les catégories
            </h1>
          </div>
        </section>

        <section className="py-8 bg-gray-50 min-h-[60vh]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setShowCategories(false)}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-6 transition-colors"
            >
              ← Retour à la recherche
            </button>

            <div className="flex flex-col gap-4">
              {categories.map((cat) => {
                const meta = CATEGORY_META[cat];
                const catItems = allItems.filter((i) => i.category === cat);

                return (
                  <div key={cat} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* En-tête coloré */}
                    <div className={`bg-gradient-to-r ${meta.gradient} p-4 text-white`}>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" aria-hidden="true">{meta.icon}</span>
                        <h2 className="font-bold text-lg">{meta.label}</h2>
                        <span className="ml-auto text-sm bg-white/20 px-2.5 py-0.5 rounded-full">
                          {catItems.length} objets
                        </span>
                      </div>
                    </div>

                    {/* Liste d'objets cliquables */}
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {catItems.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setShowCategories(false);
                              setQuery(item.labels[0]);
                            }}
                            className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg transition-colors capitalize"
                          >
                            {item.labels[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── Vue principale ───────────────────────────────────────────────────────
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-3xl md:text-4xl" aria-hidden="true">🔍</span>
            Où jeter / recycler cet objet ?
          </h1>
          <p className="mt-2 text-gray-600">
            Recherchez un objet pour savoir dans quelle poubelle il va.
          </p>
        </div>
      </section>

      {/* Corps */}
      <section className="py-8 bg-gray-50 min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Champ de recherche */}
          <div className="mb-8 animate-fade-in-up">
            <TriSearch value={query} onChange={setQuery} />
          </div>

          {/* ── Résultats trouvés ──────────────────────────────────────── */}
          {query && results.length > 0 && (
            <div className="flex flex-col gap-3 animate-fade-in-up">
              {/* Meilleure correspondance */}
              <TriResultCard
                item={results[0].item}
                isTopResult
                onOpenDetail={() => setSelectedItem(results[0].item)}
              />

              {/* Autres résultats */}
              {results.length > 1 && (
                <>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-4 mb-1">
                    Autres résultats possibles
                  </h3>
                  {results.slice(1).map((r) => (
                    <TriResultCard
                      key={r.item.id}
                      item={r.item}
                      onOpenDetail={() => setSelectedItem(r.item)}
                    />
                  ))}
                </>
              )}
            </div>
          )}

          {/* ── Rien trouvé ────────────────────────────────────────────── */}
          {query && results.length === 0 && (
            <div className="text-center py-10 animate-fade-in-up">
              <span className="text-5xl block mb-4" aria-hidden="true">🤔</span>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Aucun résultat pour « {query} »
              </p>
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                Essayez un mot plus simple ou plus courant. Vous pouvez aussi consulter la liste de toutes les catégories.
              </p>

              {/* Suggestions rapides */}
              <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Suggestions
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuery(item.labels[0])}
                      className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700 rounded-xl transition-colors capitalize"
                    >
                      {item.labels[0]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCategories(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all hover:scale-105"
              >
                📋 Voir les catégories
              </button>
            </div>
          )}

          {/* ── État initial (pas de requête) ──────────────────────────── */}
          {!query && (
            <div className="animate-fade-in-up">
              {/* Objets souvent recherchés */}
              <div className="mb-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Objets souvent recherchés
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuery(item.labels[0])}
                      className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700 rounded-xl transition-colors capitalize"
                    >
                      {item.labels[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Lien vers les catégories */}
              <button
                type="button"
                onClick={() => setShowCategories(true)}
                className="w-full sm:w-auto px-5 py-3 text-sm font-semibold bg-white border-2 border-gray-200 hover:border-emerald-300 text-gray-700 rounded-xl transition-colors"
              >
                📋 Voir toutes les catégories
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer prototype */}
      <section className="py-6 bg-white border-t">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              <span aria-hidden="true">⚙️ </span>
              Prototype — Règles simplifiées. Référez-vous aux consignes locales de votre commune si besoin.
            </p>
          </div>
        </div>
      </section>

      {/* Drawer détail */}
      <TriResultDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSearchRelated={handleSearchRelated}
      />
    </>
  );
}
