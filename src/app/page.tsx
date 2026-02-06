import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Hero Section - Style MEL */}
      <section
        id="main-content"
        className="relative overflow-hidden hero-mesh py-16 md:py-24"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid opacity-50" />

        {/* MEL accent stripe */}
        <div className="absolute top-0 left-0 w-full h-1 bg-mel-gradient" />

        <div className="relative container-mel">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 bg-[var(--mel-red)] text-white rounded-md shadow-sm mb-8">
              <span className="text-sm font-medium">Prévention Pédagogique MEL • Innovation tri des déchets</span>
            </div>

            <h1 className="animate-fade-in-up stagger-1 text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--gray-900)] leading-tight tracking-tight">
              Rendre le tri{" "}
              <span className="gradient-text">évident</span>,
              <br className="hidden md:block" />
              réduire les erreurs,
              <br className="hidden md:block" />
              <span className="text-[var(--mel-red)]">améliorer l&apos;espace public</span>
            </h1>

            <p className="animate-fade-in-up stagger-2 mt-6 text-lg md:text-xl text-[var(--gray-600)] leading-relaxed max-w-2xl mx-auto">
              Agissez concrètement pour mieux trier et réduire les déchets près de chez vous.
            </p>

            <div className="animate-fade-in-up stagger-3 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/swipe-jeux"
                className="btn btn-primary text-base px-8 py-3"
              >
                <span>Commencer</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/solution"
                className="btn btn-secondary text-base px-8 py-3"
              >
                Découvrir la solution
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Progression + Défi du jour */}
      <section className="py-8 bg-white border-b border-[var(--gray-200)]">
        <div className="container-mel max-w-3xl">
          {/* Barre de progression fictive */}
          <div className="card-mel p-5 mb-5 bg-[var(--mel-red-light)] border-[var(--mel-red)]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-[var(--mel-red-dark)]">
                Votre progression aujourd&apos;hui
              </span>
              <span className="text-sm font-bold text-[var(--mel-red)]">1 / 5 actions</span>
            </div>
            <div className="h-3 bg-white/60 rounded-full overflow-hidden">
              <div className="h-full w-1/5 progress-bar rounded-full" />
            </div>
            <p className="text-xs text-[var(--mel-red-dark)] mt-2">
              Vous avez complété 1/5 actions aujourd&apos;hui
            </p>
          </div>

          {/* Défi du jour - maintenant en rouge */}
          <div className="card-mel p-6 bg-gradient-to-br from-[var(--mel-red-light)] to-red-100 border-[var(--mel-red)]/30 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[var(--mel-red)] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-white bg-[var(--mel-red)] px-3 py-0.5 rounded-full mb-2">
                Défi du jour
              </span>
              <h3 className="text-lg font-bold text-[var(--gray-900)]">Trie 5 déchets correctement</h3>
              <p className="text-sm text-[var(--gray-600)] mt-0.5">
                Joue au jeu de tri et montre que tu connais les bonnes poubelles !
              </p>
            </div>
            <Link
              href="/demo"
              className="btn btn-primary whitespace-nowrap"
            >
              Relever le défi
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Context MEL + PLPDMA */}
      <section className="py-10 bg-mel-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="relative container-mel max-w-4xl text-center">
          <p className="text-base md:text-lg leading-relaxed">
            La <strong>Métropole Européenne de Lille (MEL)</strong> s&apos;engage
            dans son <strong>PLPDMA</strong> à améliorer le tri à la source
            et réduire les refus en centre de tri.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white" aria-labelledby="problem-heading">
        <div className="container-mel">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[var(--mel-red)] text-white rounded-full text-sm font-semibold mb-4">
              Le constat
            </span>
            <h2
              id="problem-heading"
              className="text-2xl md:text-3xl font-bold text-[var(--gray-900)]"
            >
              Un système qui ne fonctionne pas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Mauvais tri",
                desc: "Erreurs fréquentes sur ce qui va où, même avec bonne volonté.",
              },
              {
                title: "Refus en centre",
                desc: "Un quart des collectes contaminées, coûts de traitement élevés.",
              },
              {
                title: "Dépôts sauvages",
                desc: "Encombrants et déchets abandonnés autour des PAV.",
              },
              {
                title: "Publics éloignés",
                desc: "Certains habitants ne se sentent pas concernés ou sont perdus.",
              },
            ].map((item, index) => (
              <article
                key={index}
                className="card-mel card-mel-interactive p-6 border-t-4 border-t-[var(--mel-red)]"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--mel-red)] text-white flex items-center justify-center font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-[var(--gray-900)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--gray-600)]">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - fond rouge */}
      <section className="py-16 bg-mel-gradient text-white relative overflow-hidden">
        <div className="relative container-mel max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à apprendre le tri ?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Testez nos mini-jeux éducatifs et devenez un pro du tri !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/swipe-jeux"
              className="btn bg-white text-[var(--mel-red)] hover:bg-white/90 text-base px-8 py-3 font-bold"
            >
              <span>Jouer maintenant</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
            <Link
              href="/solution"
              className="btn border-2 border-white text-white hover:bg-white/20 text-base px-8 py-3"
            >
              Notre approche
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
