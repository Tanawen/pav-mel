'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';

// ===== MOCK DATA =====

const game1Data = [
  { id: 1, situation: "Acheter de l'eau en bouteille plastique", icon: "🧴", correctSwipe: 'left' as const, explanation: "Une gourde réutilisable évite ~150 bouteilles/an par personne." },
  { id: 2, situation: "Utiliser un sac réutilisable pour les courses", icon: "🛍️", correctSwipe: 'right' as const, explanation: "Un sac réutilisable remplace 300+ sacs plastiques jetables." },
  { id: 3, situation: "Acheter des fruits emballés individuellement", icon: "🍎", correctSwipe: 'left' as const, explanation: "Les fruits en vrac génèrent zéro emballage plastique." },
  { id: 4, situation: "Prendre un café dans une tasse réutilisable", icon: "☕", correctSwipe: 'right' as const, explanation: "Un gobelet jetable met 50 ans à se dégrader." },
  { id: 5, situation: "Commander un repas avec couverts jetables", icon: "🍴", correctSwipe: 'left' as const, explanation: "Des couverts réutilisables au bureau = 200 couverts économisés/an." },
  { id: 6, situation: "Refuser les prospectus avec un Stop Pub", icon: "📬", correctSwipe: 'right' as const, explanation: "Un Stop Pub évite 30kg de papier/boîte/an." },
  { id: 7, situation: "Imprimer un email de 2 lignes", icon: "🖨️", correctSwipe: 'left' as const, explanation: "Le numérique suffit souvent. 1 feuille = 10L d'eau." },
  { id: 8, situation: "Acheter en vrac avec ses propres contenants", icon: "🫙", correctSwipe: 'right' as const, explanation: "Le vrac réduit les emballages de 70% en moyenne." },
  { id: 9, situation: "Utiliser des piles rechargeables", icon: "🔋", correctSwipe: 'right' as const, explanation: "Une pile rechargeable = 500 piles jetables évitées." },
  { id: 10, situation: "Acheter des dosettes de café individuelles", icon: "☕", correctSwipe: 'left' as const, explanation: "Une cafetière filtre ou italienne = zéro déchet aluminium." },
];

const game2Data = [
  { id: 1, waste: "Bouteille en verre", icon: "🍾", proposedBin: "Bac vert", proposedBinIcon: "🟢", isCorrect: true, rule: "Le verre va toujours dans le bac vert (ou colonne à verre)." },
  { id: 2, waste: "Pot de yaourt", icon: "🥛", proposedBin: "Bac jaune", proposedBinIcon: "🟡", isCorrect: true, rule: "Les pots de yaourt vont désormais dans le bac jaune." },
  { id: 3, waste: "Mouchoir usagé", icon: "🤧", proposedBin: "Bac jaune", proposedBinIcon: "🟡", isCorrect: false, rule: "Les mouchoirs vont dans le bac marron (biodéchets) ou gris." },
  { id: 4, waste: "Canette aluminium", icon: "🥫", proposedBin: "Bac jaune", proposedBinIcon: "🟡", isCorrect: true, rule: "L'aluminium se recycle à l'infini dans le bac jaune." },
  { id: 5, waste: "Carton pizza gras", icon: "🍕", proposedBin: "Bac jaune", proposedBinIcon: "🟡", isCorrect: false, rule: "Trop gras = biodéchets. Propre = bac jaune." },
  { id: 6, waste: "Pile usagée", icon: "🔋", proposedBin: "Bac gris", proposedBinIcon: "⚫", isCorrect: false, rule: "Les piles sont des déchets dangereux → point de collecte dédié." },
  { id: 7, waste: "Bouteille plastique", icon: "🧴", proposedBin: "Bac jaune", proposedBinIcon: "🟡", isCorrect: true, rule: "Toutes les bouteilles plastiques vont au bac jaune." },
  { id: 8, waste: "Épluchures de légumes", icon: "🥕", proposedBin: "Bac marron", proposedBinIcon: "🟤", isCorrect: true, rule: "Les biodéchets vont dans le bac marron (compost)." },
  { id: 9, waste: "Barquette polystyrène", icon: "🥡", proposedBin: "Bac jaune", proposedBinIcon: "🟡", isCorrect: true, rule: "Tous les emballages plastiques vont au bac jaune dans la MEL." },
  { id: 10, waste: "Ampoule classique", icon: "💡", proposedBin: "Bac gris", proposedBinIcon: "⚫", isCorrect: false, rule: "Les ampoules se déposent en magasin ou déchèterie, pas dans les bacs." },
];

const game3Data = [
  { id: 1, object: "Jean troué au genou", icon: "👖", correctSwipe: 'right' as const, explanation: "Un jean troué peut devenir short, être rapiécé ou customisé." },
  { id: 2, object: "Téléphone écran fissuré", icon: "📱", correctSwipe: 'right' as const, explanation: "Réparation écran ~60€, bien moins cher qu'un neuf. Garantie légale possible." },
  { id: 3, object: "Chaussures usées (semelle ok)", icon: "👟", correctSwipe: 'right' as const, explanation: "Un cordonnier peut redonner vie à vos chaussures pour 10-20€." },
  { id: 4, object: "Livre déjà lu", icon: "📚", correctSwipe: 'right' as const, explanation: "Donnez-le à une boîte à livres, bibliothèque ou ami !" },
  { id: 5, object: "Jouet en bon état", icon: "🧸", correctSwipe: 'right' as const, explanation: "Emmaüs, Ressourceries ou dons entre voisins donnent une 2e vie." },
  { id: 6, object: "Appareil électronique cassé", icon: "💻", correctSwipe: 'right' as const, explanation: "Repair Café gratuit ou recyclerie : souvent réparable !" },
  { id: 7, object: "Meuble abîmé mais solide", icon: "🪑", correctSwipe: 'right' as const, explanation: "Ponçage + peinture = meuble relooké. Ou don sur leboncoin." },
  { id: 8, object: "Vêtement trop petit", icon: "👕", correctSwipe: 'right' as const, explanation: "Bornes textile, associations, vide-dressing : tout se donne !" },
  { id: 9, object: "Vélo avec pneu crevé", icon: "🚲", correctSwipe: 'right' as const, explanation: "Réparer un pneu coûte 10€. Des ateliers gratuits existent !" },
  { id: 10, object: "Casserole avec manche cassé", icon: "🍳", correctSwipe: 'right' as const, explanation: "Un nouveau manche coûte quelques euros. Réparable facilement !" },
];

const game4Data = [
  { id: 1, behavior: "Écraser ses cartons avant de les jeter", icon: "📦", correctSwipe: 'right' as const, explanation: "Cartons pliés = 3x plus de place dans les bacs = moins de collectes." },
  { id: 2, behavior: "Déposer ses encombrants à côté du PAV", icon: "🛋️", correctSwipe: 'left' as const, explanation: "Dépôt sauvage = amende 135€. Appelez le service encombrants gratuit." },
  { id: 3, behavior: "Rincer les emballages avant tri", icon: "🧽", correctSwipe: 'right' as const, explanation: "Un emballage propre = meilleur recyclage. Pas besoin de frotter, juste vider." },
  { id: 4, behavior: "Jeter un sac poubelle à côté du bac plein", icon: "🗑️", correctSwipe: 'left' as const, explanation: "Ça attire les nuisibles et coûte 50€/intervention de nettoyage." },
  { id: 5, behavior: "Signaler un PAV plein via l'appli MEL", icon: "📲", correctSwipe: 'right' as const, explanation: "Le signalement accélère la collecte et évite les débordements." },
  { id: 6, behavior: "Mettre du verre dans le bac jaune", icon: "🍾", correctSwipe: 'left' as const, explanation: "Le verre casse les machines de tri et contamine le plastique." },
  { id: 7, behavior: "Composter ses biodéchets", icon: "🌱", correctSwipe: 'right' as const, explanation: "30% de nos poubelles sont des biodéchets valorisables !" },
  { id: 8, behavior: "Brûler ses déchets verts dans le jardin", icon: "🔥", correctSwipe: 'left' as const, explanation: "Interdit et polluant. Déchèterie ou broyage gratuit en mairie." },
  { id: 9, behavior: "Trier même quand on est pressé", icon: "⏰", correctSwipe: 'right' as const, explanation: "Le tri prend 3 secondes. L'habitude devient un réflexe !" },
  { id: 10, behavior: "Laisser le couvercle du bac ouvert", icon: "🚪", correctSwipe: 'left' as const, explanation: "Couvercle ouvert = odeurs, mouches, animaux. Toujours refermer !" },
];

const games = [
  {
    id: 'production',
    title: "Je produis ou j'évite ?",
    subtitle: "Prévention des déchets",
    icon: "🌿",
    color: "from-emerald-500 to-teal-600",
    leftLabel: "Je produis",
    rightLabel: "J'évite",
    leftIcon: "👎",
    rightIcon: "👍",
    data: game1Data,
  },
  {
    id: 'tri',
    title: "Je trie ou je me trompe ?",
    subtitle: "Règles de tri",
    icon: "🎯",
    color: "from-amber-500 to-orange-600",
    leftLabel: "Erreur",
    rightLabel: "Bon tri",
    leftIcon: "❌",
    rightIcon: "✅",
    data: game2Data,
  },
  {
    id: 'reparation',
    title: "Réparer, donner ou jeter ?",
    subtitle: "Économie circulaire",
    icon: "🔧",
    color: "from-blue-500 to-indigo-600",
    leftLabel: "Jeter",
    rightLabel: "Sauver",
    leftIcon: "🗑️",
    rightIcon: "💚",
    data: game3Data,
  },
  {
    id: 'collectivite',
    title: "Ce geste aide la collectivité ?",
    subtitle: "Vivre ensemble",
    icon: "🏘️",
    color: "from-purple-500 to-pink-600",
    leftLabel: "Problème",
    rightLabel: "Utile",
    leftIcon: "😟",
    rightIcon: "🤝",
    data: game4Data,
  },
];

// ===== TYPES =====

type GameConfig = typeof games[0];

interface Game1Card {
  id: number;
  situation: string;
  icon: string;
  correctSwipe: 'left' | 'right';
  explanation: string;
}

interface Game2Card {
  id: number;
  waste: string;
  icon: string;
  proposedBin: string;
  proposedBinIcon: string;
  isCorrect: boolean;
  rule: string;
}

interface Game3Card {
  id: number;
  object: string;
  icon: string;
  correctSwipe: 'left' | 'right';
  explanation: string;
}

interface Game4Card {
  id: number;
  behavior: string;
  icon: string;
  correctSwipe: 'left' | 'right';
  explanation: string;
}

type CardData = Game1Card | Game2Card | Game3Card | Game4Card;

// ===== SWIPE CARD COMPONENT =====

interface SwipeCardProps {
  card: CardData;
  game: GameConfig;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

function SwipeCard({ card, game, onSwipe, isTop }: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const threshold = 80;

  const handleStart = useCallback((clientX: number, clientY: number) => {
    if (!isTop) return;
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  }, [isTop]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || !isTop) return;
    const deltaX = clientX - startPos.x;
    const deltaY = (clientY - startPos.y) * 0.3;
    setPosition({ x: deltaX, y: deltaY });

    if (deltaX > 40) setSwipeDirection('right');
    else if (deltaX < -40) setSwipeDirection('left');
    else setSwipeDirection(null);
  }, [isDragging, isTop, startPos]);

  const handleEnd = useCallback(() => {
    if (!isDragging || !isTop) return;
    setIsDragging(false);

    if (Math.abs(position.x) > threshold) {
      const direction = position.x > 0 ? 'right' : 'left';
      setPosition({ x: direction === 'right' ? 400 : -400, y: position.y });
      setTimeout(() => {
        onSwipe(direction);
        setPosition({ x: 0, y: 0 });
        setSwipeDirection(null);
      }, 250);
    } else {
      setPosition({ x: 0, y: 0 });
      setSwipeDirection(null);
    }
  }, [isDragging, isTop, position, onSwipe]);

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (!isTop) return;
    setSwipeDirection(direction);
    setPosition({ x: direction === 'right' ? 400 : -400, y: 0 });
    setTimeout(() => {
      onSwipe(direction);
      setPosition({ x: 0, y: 0 });
      setSwipeDirection(null);
    }, 250);
  };

  // Get card content based on game type
  const getCardContent = () => {
    if (game.id === 'production' && 'situation' in card) {
      return (
        <>
          <span className="text-6xl mb-4 block">{card.icon}</span>
          <p className="text-xl font-semibold text-gray-800 text-center leading-relaxed">
            {card.situation}
          </p>
        </>
      );
    }
    if (game.id === 'tri' && 'waste' in card) {
      return (
        <>
          <span className="text-6xl mb-2 block">{card.icon}</span>
          <p className="text-xl font-bold text-gray-800 mb-4">{card.waste}</p>
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <span className="text-2xl">{card.proposedBinIcon}</span>
            <span className="font-medium text-gray-700">{card.proposedBin}</span>
          </div>
          <p className="mt-4 text-sm text-gray-500">Ce tri est-il correct ?</p>
        </>
      );
    }
    if (game.id === 'reparation' && 'object' in card) {
      return (
        <>
          <span className="text-6xl mb-4 block">{card.icon}</span>
          <p className="text-xl font-semibold text-gray-800 text-center">
            {card.object}
          </p>
          <p className="mt-3 text-sm text-gray-500">Peut-on lui donner une seconde vie ?</p>
        </>
      );
    }
    if (game.id === 'collectivite' && 'behavior' in card) {
      return (
        <>
          <span className="text-6xl mb-4 block">{card.icon}</span>
          <p className="text-xl font-semibold text-gray-800 text-center leading-relaxed">
            {card.behavior}
          </p>
        </>
      );
    }
    return null;
  };

  const rotation = position.x * 0.04;
  const opacity = isTop ? 1 : 0.6;
  const scale = isTop ? 1 : 0.92;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
      {/* Swipe indicators */}
      {isTop && (
        <>
          <div
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl font-bold text-sm sm:text-lg transition-all duration-200 ${
              swipeDirection === 'left' ? 'opacity-100 scale-110 bg-red-500 text-white' : 'opacity-40 bg-red-100 text-red-500'
            }`}
          >
            {game.leftIcon}
          </div>
          <div
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl font-bold text-sm sm:text-lg transition-all duration-200 ${
              swipeDirection === 'right' ? 'opacity-100 scale-110 bg-green-500 text-white' : 'opacity-40 bg-green-100 text-green-500'
            }`}
          >
            {game.rightIcon}
          </div>
        </>
      )}

      {/* Card */}
      <div
        ref={cardRef}
        className={`relative w-full max-w-[320px] bg-white rounded-3xl shadow-2xl p-6 sm:p-8 cursor-grab active:cursor-grabbing select-none touch-none ${
          isDragging ? '' : 'transition-all duration-300'
        }`}
        style={{
          transform: `translateX(${position.x}px) translateY(${position.y}px) rotate(${rotation}deg) scale(${scale})`,
          opacity,
          zIndex: isTop ? 10 : 1,
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          handleStart(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => handleMove(e.clientX, e.clientY)}
        onPointerUp={(e) => {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          handleEnd();
        }}
        onPointerCancel={handleEnd}
      >
        {/* Card content */}
        <div className="flex flex-col items-center min-h-[180px] sm:min-h-[200px] justify-center">
          {getCardContent()}
        </div>
      </div>

      {/* Action buttons */}
      {isTop && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
          <button
            onClick={() => handleButtonSwipe('left')}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white text-2xl shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
            aria-label={game.leftLabel}
          >
            {game.leftIcon}
          </button>
          <button
            onClick={() => handleButtonSwipe('right')}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white text-2xl shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
            aria-label={game.rightLabel}
          >
            {game.rightIcon}
          </button>
        </div>
      )}
    </div>
  );
}

// ===== GAME COMPONENT =====

interface GameProps {
  game: GameConfig;
  onBack: () => void;
}

function Game({ game, onBack }: GameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const cards = game.data as CardData[];
  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isProcessing) return;
    setIsProcessing(true);

    const card = currentCard;
    let isCorrect = false;

    if (game.id === 'tri' && 'isCorrect' in card) {
      isCorrect = (direction === 'right') === card.isCorrect;
    } else if ('correctSwipe' in card) {
      isCorrect = direction === card.correctSwipe;
    }

    if (isCorrect) {
      setScore((s) => s + 1);
      if (game.id === 'reparation' && direction === 'right') {
        setSavedCount((c) => c + 1);
      }
    }

    const explanation = 'rule' in card ? card.rule : 'explanation' in card ? card.explanation : '';
    setFeedback({ correct: isCorrect, explanation });

    // Display time: 2 seconds
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsComplete(true);
      }
      setIsProcessing(false);
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsComplete(false);
    setSavedCount(0);
    setIsProcessing(false);
  };

  const progress = ((currentIndex + (isComplete ? 1 : 0)) / cards.length) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${game.color} relative`}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Retour"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <h1 className="text-white font-bold text-sm">{game.title}</h1>
            <p className="text-white/70 text-xs">{currentIndex + 1}/{cards.length}</p>
          </div>
          <div className="text-white font-bold text-lg">
            {score} pts
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Feedback overlay */}
      {feedback && (
        <div className={`fixed inset-0 z-40 flex items-center justify-center p-6 ${
          feedback.correct ? 'bg-green-500/95' : 'bg-red-500/95'
        }`}>
          <div className="text-center text-white max-w-sm animate-scale-in">
            <span className="text-7xl block mb-4">{feedback.correct ? '✅' : '❌'}</span>
            <p className="text-2xl font-bold mb-4">
              {feedback.correct ? 'Bien joué !' : 'Pas tout à fait...'}
            </p>
            <p className="text-lg opacity-95 leading-relaxed">
              {feedback.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Game area */}
      {!isComplete ? (
        <div className="relative h-[calc(100vh-80px)] max-w-lg mx-auto">
          {nextCard && !feedback && (
            <SwipeCard
              card={nextCard}
              game={game}
              onSwipe={() => {}}
              isTop={false}
            />
          )}
          {currentCard && !feedback && (
            <SwipeCard
              card={currentCard}
              game={game}
              onSwipe={handleSwipe}
              isTop={true}
            />
          )}
        </div>
      ) : (
        /* Completion screen */
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in">
            <span className="text-6xl block mb-4">
              {score >= cards.length * 0.8 ? '🏆' : score >= cards.length * 0.5 ? '👏' : '💪'}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {score >= cards.length * 0.8 ? 'Excellent !' : score >= cards.length * 0.5 ? 'Bien joué !' : 'Continuez !'}
            </h2>
            <p className="text-4xl font-bold text-emerald-600 mb-2">
              {score}/{cards.length}
            </p>
            <p className="text-gray-600 mb-6">
              {game.id === 'reparation'
                ? `${savedCount} objet${savedCount > 1 ? 's' : ''} sauvé${savedCount > 1 ? 's' : ''} !`
                : score >= cards.length * 0.8
                  ? 'Vous maîtrisez le sujet !'
                  : 'Chaque geste compte !'}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleRestart}
                className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${game.color} hover:opacity-90 transition-opacity`}
              >
                🔄 Rejouer
              </button>
              <button
                onClick={onBack}
                className="w-full py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Autres jeux
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== MAIN PAGE =====

export default function SwipeJeuxPage() {
  const [activeGame, setActiveGame] = useState<GameConfig | null>(null);

  if (activeGame) {
    return <Game game={activeGame} onBack={() => setActiveGame(null)} />;
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="absolute top-10 right-10 text-8xl opacity-20 animate-float">👆</div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>👇</div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
            <span className="animate-bounce-slow">👆</span>
            <span className="text-sm font-medium">Mini-jeux éducatifs</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Swipe & Réflexes Déchets
          </h1>
          <p className="text-xl text-white/90 max-w-xl mx-auto">
            Un bon geste se décide en une seconde.<br />
            <span className="text-white/70 text-base">Swipez pour apprendre !</span>
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Démo Tri - Featured Game */}
          <Link
            href="/demo"
            className="group block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border-2 border-emerald-200 overflow-hidden relative mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
              Jeu principal
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <span className="text-3xl">🎮</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  Démo Tri Interactif
                </h3>
                <p className="text-sm text-gray-500 mb-3">Glissez-déposez les déchets dans les bonnes poubelles</p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {[
                    { color: 'bg-yellow-400', label: 'Jaune' },
                    { color: 'bg-green-500', label: 'Vert' },
                    { color: 'bg-amber-700', label: 'Marron' },
                    { color: 'bg-gray-500', label: 'Déchèterie' },
                  ].map((bin) => (
                    <span key={bin.label} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                      <span className={`w-2 h-2 ${bin.color} rounded-full`}></span>
                      {bin.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-400">24 déchets à trier</span>
              <span className="text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">
                Jouer →
              </span>
            </div>
          </Link>

          {/* Swipe Games */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game)}
                className="group text-left bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] border border-gray-100 overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl">{game.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{game.subtitle}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                        {game.leftIcon} {game.leftLabel}
                      </span>
                      <span className="text-gray-400">ou</span>
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                        {game.rightLabel} {game.rightIcon}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-400">{game.data.length} cartes</span>
                  <span className="text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">
                    Jouer →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Info box */}
          <div className="mt-10 p-5 bg-white rounded-2xl border border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              <span className="text-lg mr-2">💡</span>
              <strong>Prototype pédagogique</strong> – données illustratives basées sur les règles de tri de la MEL.
            </p>
          </div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <span className="mr-2">←</span>
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </section>

      {/* How to play */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Comment jouer ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "👆", title: "Swipez", desc: "Glissez la carte vers la gauche ou la droite selon votre choix" },
              { icon: "🎯", title: "Apprenez", desc: "Chaque réponse s'accompagne d'une explication concrète" },
              { icon: "⚡", title: "30 secondes", desc: "Des sessions courtes pour apprendre sans se lasser" },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <span className="text-4xl block mb-3">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
