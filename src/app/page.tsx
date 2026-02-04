import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Hero Section - Enhanced */}
      <section
        id="main-content"
        className="relative overflow-hidden hero-mesh py-20 md:py-32"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid opacity-50" />

        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl animate-pulse-slow shape-blob" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse-slow shape-blob-2" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-300/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

        {/* MEL accent stripe */}
        <div className="absolute top-0 left-0 w-full h-1 bg-mel-gradient" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full border border-emerald-200 shadow-sm mb-8">
              <span className="text-sm font-medium text-emerald-700">Prévention Pédagogique MEL • Innovation tri des déchets</span>
            </div>

            <h1 className="animate-fade-in-up stagger-1 text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Rendre le tri{" "}
              <span className="gradient-text">évident</span>,
              <br className="hidden md:block" />
              réduire les erreurs,
              <br className="hidden md:block" />
              <span className="text-emerald-600">améliorer l&apos;espace public</span>
            </h1>

            <p className="animate-fade-in-up stagger-2 mt-8 text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Agissez concrètement pour mieux trier et réduire les déchets près de chez vous.
            </p>

            <div className="animate-fade-in-up stagger-3 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/swipe-jeux"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
              >
                <span>Commencer</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/solution"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-emerald-700 bg-white hover:bg-emerald-50 border-2 border-emerald-200 rounded-xl transition-all hover:scale-105"
              >
                Découvrir la solution
              </Link>
            </div>

            {/* Floating icons */}
            <div className="hidden md:block absolute top-1/4 left-[10%] text-5xl animate-float" style={{ animationDelay: '0s' }}>🍾</div>
            <div className="hidden md:block absolute top-1/3 right-[10%] text-5xl animate-float" style={{ animationDelay: '0.5s' }}>📦</div>
            <div className="hidden md:block absolute bottom-1/4 left-[15%] text-4xl animate-float" style={{ animationDelay: '1s' }}>🥫</div>
            <div className="hidden md:block absolute bottom-1/3 right-[15%] text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🍂</div>
          </div>
        </div>
      </section>

      {/* Progression + Défi du jour */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Barre de progression fictive */}
          <div className="bg-emerald-50 rounded-2xl p-5 mb-6 border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-emerald-800">
                <span aria-hidden="true">📈 </span>Votre progression aujourd&apos;hui
              </span>
              <span className="text-sm font-bold text-emerald-700">1 / 5 actions</span>
            </div>
            <div className="h-3 bg-emerald-200 rounded-full overflow-hidden">
              <div className="h-full w-1/5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
            </div>
            <p className="text-xs text-emerald-600 mt-2">
              Vous avez complété 1/5 actions aujourd&apos;hui
            </p>
          </div>

          {/* Défi du jour */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <div className="flex-1">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full mb-2">
                Défi du jour
              </span>
              <h3 className="text-lg font-bold text-gray-900">Trie 5 déchets correctement</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Joue au jeu de tri et montre que tu connais les bonnes poubelles !
              </p>
            </div>
            <Link
              href="/demo"
              className="inline-flex items-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all hover:scale-105 whitespace-nowrap"
            >
              Relever le défi →
            </Link>
          </div>
        </div>
      </section>

      {/* Context MEL + PLPDMA */}
      <section className="py-12 bg-mel-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl leading-relaxed">
            La <strong>Métropole Européenne de Lille (MEL)</strong> s&apos;engage
            dans son <strong>PLPDMA</strong> à améliorer le tri à la source
            et réduire les refus en centre de tri.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white" aria-labelledby="problem-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
              Le constat
            </span>
            <h2
              id="problem-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Un système qui ne fonctionne pas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🗑️",
                title: "Mauvais tri",
                desc: "Erreurs fréquentes sur ce qui va où, même avec bonne volonté.",
                color: "from-red-500 to-orange-500",
              },
              {
                icon: "🚫",
                title: "Refus en centre",
                desc: "Un quart des collectes contaminées, coûts de traitement élevés.",
                color: "from-orange-500 to-amber-500",
              },
              {
                icon: "📦",
                title: "Dépôts sauvages",
                desc: "Encombrants et déchets abandonnés autour des PAV.",
                color: "from-amber-500 to-yellow-500",
              },
              {
                icon: "👥",
                title: "Publics éloignés",
                desc: "Certains habitants ne se sentent pas concernés ou sont perdus.",
                color: "from-yellow-500 to-lime-500",
              },
            ].map((item, index) => (
              <article
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-soft card-hover border border-gray-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <span className="text-4xl block mb-4" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl block mb-6">🎮</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à apprendre le tri ?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Testez nos mini-jeux éducatifs et devenez un pro du tri !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/swipe-jeux"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-xl transition-all hover:scale-105"
            >
              <span>Jouer maintenant</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">🎮</span>
            </Link>
            <Link
              href="/solution"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-xl transition-all"
            >
              Notre approche
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
