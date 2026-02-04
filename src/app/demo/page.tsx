'use client';

import { useState, useEffect, useRef } from 'react';

// ── Données ─────────────────────────────────────────────────────────────────
const wasteItems = [
  { id: 'bouteille-plastique', name: 'Bouteille plastique', icon: '🧴', bin: 'jaune', reason: 'Les bouteilles plastiques vont dans le bac jaune.' },
  { id: 'pot-yaourt', name: 'Pot de yaourt', icon: '🥛', bin: 'jaune', reason: 'Les pots de yaourt vont dans le bac jaune.' },
  { id: 'carton-pizza-propre', name: 'Carton pizza propre', icon: '📦', bin: 'jaune', reason: 'Un carton propre peut aller au recyclage.' },
  { id: 'carton-pizza-sale', name: 'Carton pizza sale', icon: '🍕', bin: 'marron', reason: 'Gras et restes alimentaires = biodéchets.' },
  { id: 'bouteille-verre', name: 'Bouteille en verre', icon: '🍾', bin: 'vert', reason: 'Le verre va toujours dans le bac vert.' },
  { id: 'canette', name: 'Canette', icon: '🥫', bin: 'jaune', reason: 'Les canettes métalliques vont dans le bac jaune.' },
  { id: 'barquette-plastique', name: 'Barquette plastique', icon: '🥡', bin: 'jaune', reason: 'Les barquettes plastiques vont dans le bac jaune.' },
  { id: 'mouchoir', name: 'Mouchoir usagé', icon: '🤧', bin: 'marron', reason: 'Les mouchoirs sont biodégradables.' },
  { id: 'pile', name: 'Pile', icon: '🔋', bin: 'decheterie', reason: 'Les piles sont des déchets dangereux, à déposer en déchèterie.' },
  { id: 'vetements', name: 'Vêtements', icon: '👕', bin: 'decheterie', reason: 'Les textiles se déposent dans des bornes dédiées ou en déchèterie.' },
  { id: 'reste-alimentaire', name: 'Reste alimentaire', icon: '🍎', bin: 'marron', reason: 'Les restes de repas vont dans le bac marron (biodéchets).' },
  { id: 'enveloppe', name: 'Enveloppe/papier', icon: '✉️', bin: 'jaune', reason: 'Le papier va dans le bac jaune.' },
  { id: 'aerosol', name: 'Aérosol', icon: '🧯', bin: 'decheterie', reason: 'Les aérosols contiennent des gaz, à déposer en déchèterie.' },
  { id: 'bocal-verre', name: 'Bocal en verre', icon: '🫙', bin: 'vert', reason: 'Les bocaux en verre vont dans le bac vert.' },
  { id: 'journal', name: 'Journal/magazine', icon: '📰', bin: 'jaune', reason: 'Les journaux et magazines vont dans le bac jaune.' },
  { id: 'tube-dentifrice', name: 'Tube dentifrice', icon: '🪥', bin: 'jaune', reason: 'Les tubes en plastique vont dans le bac jaune.' },
  { id: 'sachet-the', name: 'Sachet de thé', icon: '🍵', bin: 'marron', reason: 'Les sachets de thé sont compostables (biodéchets).' },
  { id: 'coquilles-oeufs', name: "Coquilles d'œufs", icon: '🥚', bin: 'marron', reason: "Les coquilles d'œufs vont dans les biodéchets." },
  { id: 'medicaments', name: 'Médicaments', icon: '💊', bin: 'decheterie', reason: 'Les médicaments se rapportent en pharmacie.' },
  { id: 'ampoule', name: 'Ampoule LED', icon: '💡', bin: 'decheterie', reason: 'Les ampoules se déposent en magasin ou déchèterie.' },
  { id: 'film-plastique', name: 'Film plastique', icon: '🎞️', bin: 'jaune', reason: 'Les films plastiques vont dans le bac jaune.' },
  { id: 'marc-cafe', name: 'Marc de café', icon: '☕', bin: 'marron', reason: 'Le marc de café est compostable (biodéchets).' },
  { id: 'conserve', name: 'Boîte de conserve', icon: '🥫', bin: 'jaune', reason: 'Les boîtes de conserve en métal vont dans le bac jaune.' },
  { id: 'huile-friture', name: 'Huile de friture', icon: '🛢️', bin: 'decheterie', reason: "L'huile usagée se dépose en déchèterie." },
];

const bins = [
  { id: 'jaune', name: 'Jaune', label: 'Emballages + Papiers', gradient: 'from-yellow-400 to-amber-500', icon: '📦' },
  { id: 'vert', name: 'Vert', label: 'Verre', gradient: 'from-green-500 to-emerald-600', icon: '🍾' },
  { id: 'marron', name: 'Marron', label: 'Biodéchets', gradient: 'from-amber-600 to-amber-800', icon: '🍂' },
  { id: 'decheterie', name: 'Déchèterie', label: 'Spécifique', gradient: 'from-gray-500 to-gray-700', icon: '🏭' },
];

// ── Utilitaires ─────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ── Types ───────────────────────────────────────────────────────────────────
type Feedback = {
  correct: boolean;
  reason: string;
} | null;

// ── Confetti ────────────────────────────────────────────────────────────────
function Confetti() {
  const colors = ['#fbbf24', '#22c55e', '#3b82f6', '#ec4899', '#8b5cf6', '#f97316'];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 6,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-[confetti_3s_ease-out_forwards]"
          style={{
            left: `${p.left}%`,
            top: '50%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function DemoPage() {
  const [queue, setQueue] = useState(() => shuffle(wasteItems));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const currentItem = queue[currentIndex];
  const answered = currentIndex; // items already answered (index advances after feedback)
  const isComplete = currentIndex >= queue.length;
  const isPerfect = isComplete && score === queue.length;
  const progress = (answered / queue.length) * 100;

  // Confetti when finishing with ≥ 70 %
  useEffect(() => {
    if (isComplete && score >= queue.length * 0.7) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
  }, [isComplete, score, queue.length]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleBinClick = (binId: string) => {
    if (feedback || !currentItem) return;

    const isCorrect = binId === currentItem.bin;
    if (isCorrect) setScore((s) => s + 1);

    setFeedback({ correct: isCorrect, reason: currentItem.reason });

    timerRef.current = setTimeout(() => {
      setFeedback(null);
      setCurrentIndex((i) => i + 1);
    }, 2200);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setQueue(shuffle(wasteItems));
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setShowConfetti(false);
    setShowSolution(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {showConfetti && <Confetti />}

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-3xl md:text-4xl" aria-hidden="true">🎮</span>
            Démo tri interactif
          </h1>
          <p className="mt-2 text-gray-600">
            Choisissez la bonne poubelle pour chaque déchet.
          </p>
        </div>
      </section>

      {/* ── Sticky progress bar ─────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Progress */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progression</span>
                <span className="font-medium">{answered}/{queue.length}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Score */}
            <div className="text-center px-4">
              <p className="text-2xl font-bold">
                <span className="text-emerald-600">{score}</span>
                <span className="text-gray-400">/{answered}</span>
              </p>
              <p className="text-xs text-gray-500">Score</p>
            </div>

            {/* Reset */}
            {answered > 0 && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                🔄 Recommencer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Feedback overlay ────────────────────────────────────────────── */}
      {feedback && (
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-8 py-6 rounded-2xl shadow-2xl max-w-sm w-[90%] text-center animate-scale-in ${
            feedback.correct
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400'
              : 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400'
          }`}
          role="alert"
          aria-live="polite"
        >
          <p className="text-5xl mb-2" aria-hidden="true">
            {feedback.correct ? '✅' : '❌'}
          </p>
          <p className={`font-bold text-lg ${feedback.correct ? 'text-green-800' : 'text-red-800'}`}>
            {feedback.correct ? 'Correct !' : 'Pas tout à fait…'}
          </p>
          <p className={`text-sm mt-1 ${feedback.correct ? 'text-green-700' : 'text-red-700'}`}>
            {feedback.reason}
          </p>
        </div>
      )}

      {/* ── Main game area ──────────────────────────────────────────────── */}
      <section className="py-8 bg-gray-50 min-h-[60vh]">
        <div className="px-4 sm:px-6 lg:px-8">

          {showSolution ? (
            /* ── Solution view ────────────────────────────────────────── */
            <div className="max-w-5xl mx-auto py-4 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  📋 Solution complète
                </h2>
                <p className="text-gray-600">Voici où va chaque déchet</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bins.map((bin) => {
                  const binItems = wasteItems.filter((item) => item.bin === bin.id);
                  return (
                    <div
                      key={bin.id}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                    >
                      <div className={`bg-gradient-to-r ${bin.gradient} p-4 text-white`}>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl" aria-hidden="true">{bin.icon}</span>
                          <div>
                            <h3 className="font-bold text-lg">{bin.name}</h3>
                            <p className="text-white/80 text-sm">{bin.label}</p>
                          </div>
                          <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                            {binItems.length} items
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {binItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                            >
                              <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                              <span className="text-xs font-medium text-gray-700 line-clamp-2">
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all hover:scale-105"
                >
                  🔄 Rejouer
                </button>
                <button
                  onClick={() => setShowSolution(false)}
                  className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  ← Retour aux résultats
                </button>
              </div>
            </div>
          ) : isComplete ? (
            /* ── Completion screen ────────────────────────────────────── */
            <div className="max-w-md mx-auto text-center py-12 animate-fade-in-up">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <span className="text-7xl block mb-4" aria-hidden="true">
                  {isPerfect ? '🏆' : '🎉'}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {isPerfect ? 'Parfait !' : 'Bien joué !'}
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Score final :{' '}
                  <span className="font-bold text-emerald-600">
                    {score}/{queue.length}
                  </span>
                </p>

                <p className="text-gray-600 mb-6">
                  {isPerfect
                    ? 'Vous maîtrisez les règles de tri ! 🌟'
                    : score >= queue.length * 0.7
                      ? 'Très bon score ! Quelques détails à revoir.'
                      : 'La signalétique vous aidera à progresser !'}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all hover:scale-105"
                  >
                    🔄 Rejouer
                  </button>
                  <button
                    onClick={() => setShowSolution(true)}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Voir la solution →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── One-by-one quiz ──────────────────────────────────────── */
            <div className="max-w-2xl mx-auto">
              {/* Current item card – key forces re-mount + animation on each item */}
              <div key={currentIndex} className="animate-fade-in-up">
                <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 text-center max-w-sm mx-auto">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Déchet {answered + 1} / {queue.length}
                  </span>

                  <span
                    className="text-7xl md:text-8xl block my-5"
                    aria-hidden="true"
                  >
                    {currentItem.icon}
                  </span>

                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentItem.name}
                  </h2>
                  <p className="text-gray-400 mt-2 text-sm">
                    Dans quelle poubelle ?
                  </p>
                </div>
              </div>

              {/* 4 bin choice buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {bins.map((bin) => (
                  <button
                    key={bin.id}
                    type="button"
                    onClick={() => handleBinClick(bin.id)}
                    disabled={!!feedback}
                    className={`relative bg-gradient-to-br ${bin.gradient} rounded-2xl p-5 md:p-6 text-center transition-all duration-200 overflow-hidden ${
                      feedback
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer shadow-md'
                    }`}
                    aria-label={`Choisir ${bin.name} – ${bin.label}`}
                  >
                    {/* Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />

                    <span
                      className="text-4xl md:text-5xl block relative"
                      aria-hidden="true"
                    >
                      {bin.icon}
                    </span>
                    <p className="mt-2 font-bold text-white text-lg md:text-xl drop-shadow-sm">
                      {bin.name}
                    </p>
                    <p className="text-white/80 text-xs mt-0.5">{bin.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Legend ────────────────────────────────────────────────── */}
          <div className="max-w-2xl mx-auto mt-10 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span aria-hidden="true">📋</span> Légende des couleurs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {bins.map((bin) => (
                <div key={bin.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${bin.gradient} shadow-sm`} />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{bin.name}</p>
                    <p className="text-xs text-gray-500">{bin.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Educational note ──────────────────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-gray-600">
              <span className="text-xl mr-2" aria-hidden="true">💡</span>
              Les règles de tri peuvent varier selon les communes. Cette démo
              illustre les consignes générales de la MEL.{' '}
              <strong className="text-emerald-600">
                En cas de doute, scannez le QR code sur votre PAV !
              </strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
