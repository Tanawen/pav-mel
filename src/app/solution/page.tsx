import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre Solution",
  description:
    "Découvrez notre approche : signalétique universelle, QR codes, gamification et médiation pour simplifier le tri.",
};

export default function SolutionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 to-red-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-red-600 text-white rounded-full text-sm font-semibold mb-4">
              Notre approche
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Une solution pensée pour la MEL
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Une approche globale qui combine design, technologie, gamification
              et présence humaine pour rendre le tri accessible à tous les habitants
              de la Métropole Européenne de Lille.
            </p>
          </div>
        </div>
      </section>

      {/* MEL Context Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logo-mel.png`}
                  alt="Métropole Européenne de Lille"
                  className="h-14 w-auto"
                />
                <span className="text-lg font-semibold text-gray-700">Métropole Européenne de Lille</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                La démarche de la MEL
              </h2>
              <p className="text-gray-600 mb-4">
                La <strong>Métropole Européenne de Lille</strong> s&apos;est engagée dans son
                <strong> Programme Local de Prévention des Déchets Ménagers et Assimilés (PLPDMA)</strong> à
                améliorer significativement le tri à la source.
              </p>
              <div className="space-y-3">
                {[
                  { stat: "30%", label: "d'erreurs de tri constatées" },
                  { stat: "25%", label: "de refus en centre de tri" },
                  { stat: "95", label: "communes concernées" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-red-600">{item.stat}</span>
                    <span className="text-gray-600">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🎯</span> Objectifs du PLPDMA
              </h3>
              <ul className="space-y-3">
                {[
                  "Réduire les erreurs de tri à la source",
                  "Diminuer les refus en centre de tri",
                  "Améliorer l'expérience usager aux PAV",
                  "Sensibiliser les publics éloignés du tri",
                  "Réduire les dépôts sauvages",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-600 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-16 bg-white" aria-labelledby="pillars-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium mb-4">
              <span>🏗️</span> Les 4 piliers
            </span>
            <h2 id="pillars-heading" className="text-2xl md:text-3xl font-bold text-gray-900">
              Notre solution en détail
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Chaque pilier agit en synergie pour couvrir la chaîne entière : de la signalétique au terrain, de l&apos;information à l&apos;engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                number: "01",
                icon: "🏷️",
                title: "Signalétique universelle",
                color: "from-red-500 to-red-600",
                bgLight: "bg-red-50",
                borderLight: "border-red-200",
                points: [
                  "Pictogrammes clairs et internationaux sur chaque PAV",
                  "Couleurs standardisées (jaune, vert, marron, gris)",
                  "Format adapté à tous les regards, même à distance",
                  "Résistant aux intempéries, lisible de jour et de nuit",
                ],
              },
              {
                number: "02",
                icon: "📱",
                title: "QR codes & contenus micro",
                color: "from-red-500 to-red-600",
                bgLight: "bg-red-50",
                borderLight: "border-red-200",
                points: [
                  "Un QR code sur chaque PAV vers une page dédiée",
                  "Vidéos courtes (< 30s) par type de déchet",
                  "Exemples visuels concrets et situationnels",
                  "Contenu mis à jour en temps réel selon la commune",
                ],
              },
              {
                number: "03",
                icon: "🎮",
                title: "Gamification & apprentissage",
                color: "from-red-500 to-red-600",
                bgLight: "bg-red-50",
                borderLight: "border-red-200",
                points: [
                  "Mini-jeux swipe pour ancrer les réflexes de tri",
                  "Démo interactive drag-and-drop avec 24 déchets",
                  "Feedback immédiat et explications pédagogiques",
                  "Sessions courtes pensées pour la répétition espacée",
                ],
              },
              {
                number: "04",
                icon: "🤝",
                title: "Médiation terrain",
                color: "from-red-500 to-red-600",
                bgLight: "bg-red-50",
                borderLight: "border-red-200",
                points: [
                  "Présence humaine aux moments clés (installation, events)",
                  "Ton non culpabilisant, bénéfices mis en avant",
                  "Ateliers pédagogiques dans les écoles partenaires",
                  "Signalement et retour terrain via l&apos;appli MEL",
                ],
              },
            ].map((pillar) => (
              <article
                key={pillar.number}
                className={`relative bg-white rounded-2xl border ${pillar.borderLight} shadow-sm overflow-hidden`}
              >
                {/* Colored top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${pillar.color}`} />

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${pillar.bgLight} flex items-center justify-center text-2xl shrink-0`}>
                      {pillar.icon}
                    </div>
                    <div>
                      <span className={`text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent`}>
                        Pilier {pillar.number}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">{pillar.title}</h3>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {pillar.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-red-500 mt-0.5 shrink-0">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* User Journey */}
      <section className="py-16 bg-gray-50" aria-labelledby="journey-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium mb-4">
              <span>🗺️</span> Parcours usager
            </span>
            <h2 id="journey-heading" className="text-2xl md:text-3xl font-bold text-gray-900">
              Comment ça se passe en pratique ?
            </h2>
          </div>

          {/* Timeline steps */}
          <div className="relative">
            {/* Vertical line (mobile) */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-red-200" />

            {/* Horizontal line (desktop) */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-red-200" style={{ marginLeft: '10%', marginRight: '10%' }} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  icon: "👀",
                  title: "Je vois le PAV",
                  desc: "La signalétique me guide au premier regard. Les couleurs sont claires, les pictogrammes universels.",
                },
                {
                  step: 2,
                  icon: "📱",
                  title: "Je scanne si besoin",
                  desc: "En cas de doute, je scanne le QR code. Une vidéo courte me montre exactement quoi faire.",
                },
                {
                  step: 3,
                  icon: "✅",
                  title: "Je trie correctement",
                  desc: "Je dépose mes déchets dans la bonne poubelle. Geste simple, résultat concret.",
                },
                {
                  step: 4,
                  icon: "🎮",
                  title: "J'apprends en jouant",
                  desc: "En rentrant chez moi, je teste mes connaissances avec un mini-jeux rapide.",
                },
              ].map((item) => (
                <div key={item.step} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0">
                  {/* Circle (mobile: left side, desktop: top center) */}
                  <div className="shrink-0 relative z-10 md:mb-6">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md">
                      {item.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm md:text-center">
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Gamified Approach */}
      <section className="py-12 bg-gradient-to-br from-red-50 to-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium mb-4">
              <span>🎮</span> Notre innovation
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Une approche gamifiée pour ancrer les réflexes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous croyons que le tri s&apos;apprend mieux en jouant. Notre approche
              transforme l&apos;apprentissage des règles de tri en une expérience
              ludique et engageante.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Apprendre sans s'en rendre compte",
                desc: "Les mini-jeux permettent de mémoriser les règles de tri de façon naturelle, sans effort conscient.",
              },
              {
                icon: "⚡",
                title: "Feedback immédiat",
                desc: "Chaque action donne un retour instantané, renforçant les bons comportements et corrigeant les erreurs.",
              },
              {
                icon: "🔄",
                title: "Répétition espacée",
                desc: "Des sessions courtes et régulières ancrent durablement les connaissances dans la mémoire.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-red-200">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/swipe-jeux"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
            >
              <span>Essayer les mini-jeux</span>
              <span className="ml-2">🎮</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tableau de Bord Hyper-Local */}
      <section className="py-16 bg-white" aria-labelledby="dashboard-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium mb-4">
              <span>🏘️</span> Émulation collective
            </span>
            <h2 id="dashboard-heading" className="text-2xl md:text-3xl font-bold text-gray-900">
              Le Tableau de Bord Hyper-Local
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Créer une émulation collective entre quartiers
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-gray-700 leading-relaxed">
              Le principe des <strong>nudges</strong> — incitations douces — permet de recadrer la motivation du tri. L&apos;usager ne trie plus pour la MEL de façon abstraite : il contribue à la progression de <strong>son quartier</strong>. Un classement dynamique entre quartiers et communes, basé sur la réduction des <strong>Ordures Ménagères Résiduelles (OMR)</strong>, transforme un geste individuel en un mouvement collectif. Dans un contexte d&apos;habitat dense où l&apos;apport volontaire est souvent vécu comme une corvée solitaire, cette mécanique réintroduit le lien social et crée une dynamique d&apos;entraînement entre voisins.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📍",
                title: "Un lien au territoire",
                desc: "Chaque quartier suit sa propre progression. « Bravo à Wazemmes qui a réduit ses déchets de 5% ce mois-ci » — un message qui ancre le geste dans un espace vécu.",
              },
              {
                icon: "🤝",
                title: "Une dynamique sociale",
                desc: "Le classement entre quartiers crée une émulation positive : chacun agit pour que son cercle de vie progresse, pas par obligation, mais par appartenance.",
              },
              {
                icon: "📈",
                title: "Un impact mesurable",
                desc: "La réduction des OMR est suivie en temps réel. L'usager voit concrètement comment son quartier évolue mois après mois.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculateur de Seconde Vie */}
      <section className="py-16 bg-gray-50" aria-labelledby="calculator-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-medium mb-4">
              <span>✨</span> Gratification
            </span>
            <h2 id="calculator-heading" className="text-2xl md:text-3xl font-bold text-gray-900">
              Le Calculateur de Seconde Vie
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3">
              Chaque geste de tri a un équivalent concret dans le patrimoine de la MEL
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-gray-700 leading-relaxed">
              Le <strong>Calculateur de Seconde Vie</strong> convertit le poids des déchets triés en équivalents énergétiques ou matériels directement ancrés dans le patrimoine local de la Métropole Européenne de Lille. L&apos;objectif : rendre chaque geste de tri <strong>immédiatement gratifiant</strong> en montrant à l&apos;usager que son effort se traduit en un impact visible sur son cadre de vie.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "🥃",
                category: "Verre",
                landmark: "Grand'Place de Lille",
                equivalence: "5 jours d'éclairage",
                detail: "Le verre trié permet de régénérer de l'énergie qui alimente l'éclairage emblématique de la Grand'Place — un symbole de Lille que chacun connaît.",
                color: "from-red-400 to-red-500",
                bg: "bg-red-50",
                border: "border-red-200",
              },
              {
                icon: "🌱",
                category: "Biodéchets",
                landmark: "Bus V'Lille / Métro",
                equivalence: "150 m³ de biogaz",
                detail: "Les biodéchets collectés génèrent du biogaz utilisable pour alimenter les transports en commun V'Lille et le réseau métro de la métropole.",
                color: "from-red-400 to-red-500",
                bg: "bg-green-50",
                border: "border-green-200",
              },
              {
                icon: "🧱",
                category: "Plastique",
                landmark: "Parc de la Citadelle",
                equivalence: "25 bancs publics",
                detail: "Le plastique recyclé est transformé en mobilier urbain — comme les bancs du Parc de la Citadelle, un espace vert emblématique de Lille.",
                color: "from-red-400 to-red-500",
                bg: "bg-red-50",
                border: "border-red-200",
              },
            ].map((item, idx) => (
              <div key={idx} className={`bg-white rounded-2xl border ${item.border} shadow-sm overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${item.color}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-2xl w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}>{item.icon}</span>
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase text-gray-400">{item.category}</span>
                      <p className="text-lg font-bold text-gray-900">{item.equivalence}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">{item.landmark}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-red-50 rounded-2xl p-8 border border-red-200 text-center">
            <span className="text-3xl block mb-3">✨</span>
            <h3 className="font-bold text-gray-900 mb-3">L&apos;usager voit, l&apos;usager agit</h3>
            <p className="text-gray-700 leading-relaxed">
              La gratification ne repose pas sur des points abstraits : elle se traduit en <strong>équivalents visibles</strong> dans le quotidien de la MEL. Chaque déchet bien trié devient un jour d&apos;éclairage sur la Grand&apos;Place, un trajet en bus, un banc dans un parc. Le geste acquiert un sens immédiat — et c&apos;est ce qui ancre le comportement sur le long terme.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold">
            Envie de tester par vous-même ?
          </h2>
          <p className="mt-2 text-gray-300">
            Nos mini-jeux interactifs vous mettent dans la peau d&apos;un usager.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/swipe-jeux"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-900 bg-white hover:bg-gray-100 rounded-lg transition-colors"
            >
              Jouer aux mini-jeux 🎮
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
