import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plan de Déploiement",
  description:
    "Découvrez notre plan de déploiement en 3 phases : pilote, extension et généralisation.",
};

const phases = [
  {
    number: 1,
    title: "Pilote",
    duration: "3 mois",
    scope: "2-3 quartiers",
    color: "bg-amber-500",
    objective: "Prouver que ça marche vite.",
    deliverables: [
      "Kit signalétique standardisé",
      "QR codes + micro-contenus (vidéos, exemples)",
      "Dashboard simple de suivi",
      "Protocole de médiation terrain",
    ],
  },
  {
    number: 2,
    title: "Extension",
    duration: "12 mois",
    scope: "Zones prioritaires",
    color: "bg-emerald-500",
    objective: "Standardiser et étendre aux zones prioritaires.",
    deliverables: [
      "Kit PAV pédagogique prêt à déployer",
      "Guide d'implantation complet",
      "Version 2 des contenus (améliorés)",
      "Process d'amélioration continue",
    ],
  },
  {
    number: 3,
    title: "Généralisation",
    duration: "Long terme",
    scope: "Ensemble du territoire",
    color: "bg-blue-500",
    objective: "Déploiement large + maintenance + pilotage data.",
    deliverables: [
      "Dashboard complet et partagé",
      "Routine de suivi mensuel",
      "Interventions ciblées par zone",
      "Mise à jour continue des contenus",
    ],
  },
];

const prerequisites = [
  { label: "Choix des emplacements PAV", icon: "📍" },
  { label: "Validation commune / voirie", icon: "✅" },
  { label: "Supports de communication locale", icon: "📢" },
  { label: "Planning médiation (moments clés)", icon: "📅" },
  { label: "Mesure KPI avant/après", icon: "📊" },
];

const risks = [
  {
    risk: "Vandalisme",
    parade: "Matériaux robustes + maintenance rapide",
    icon: "🔧",
  },
  {
    risk: "Saturation",
    parade: "Suivi remplissage + ajustement collecte",
    icon: "📦",
  },
  {
    risk: "Incompréhension",
    parade: "Simplification + QR + médiation",
    icon: "❓",
  },
  {
    risk: "Rejet « encore une règle »",
    parade: "Ton non culpabilisant + bénéfices concrets",
    icon: "🤝",
  },
];

export default function DeploiementPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Plan de déploiement
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Une approche progressive en 3 phases pour garantir le succès et
              l&apos;adhésion du terrain.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline / Phases */}
      <section className="py-12 bg-white" aria-labelledby="phases-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="phases-heading"
            className="text-2xl font-bold text-gray-900 text-center mb-12"
          >
            Les 3 phases du déploiement
          </h2>

          <div className="relative">
            {/* Timeline line (desktop) */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gray-200" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {phases.map((phase) => (
                <article key={phase.number} className="relative">
                  {/* Phase circle */}
                  <div
                    className={`${phase.color} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto md:mx-0 relative z-10`}
                  >
                    {phase.number}
                  </div>

                  {/* Content */}
                  <div className="mt-4 bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Phase {phase.number} — {phase.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm mb-4">
                      <span className="px-2 py-1 bg-white rounded border border-gray-300 text-gray-600">
                        ⏱️ {phase.duration}
                      </span>
                      <span className="px-2 py-1 bg-white rounded border border-gray-300 text-gray-600">
                        📍 {phase.scope}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium mb-4">
                      <strong>Objectif :</strong> {phase.objective}
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">
                        Livrables :
                      </p>
                      <ul className="space-y-1">
                        {phase.deliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <span className="text-emerald-500 mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisites Checklist */}
      <section
        className="py-12 bg-gray-50"
        aria-labelledby="prerequisites-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="prerequisites-heading"
            className="text-2xl font-bold text-gray-900 text-center mb-8"
          >
            Checklist prérequis
          </h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <ul className="space-y-3">
              {prerequisites.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="text-gray-800">{item.label}</span>
                  <span
                    className="ml-auto w-5 h-5 border-2 border-gray-300 rounded"
                    aria-label="À valider"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Risks & Parades */}
      <section className="py-12 bg-white" aria-labelledby="risks-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="risks-heading"
            className="text-2xl font-bold text-gray-900 text-center mb-8"
          >
            Risques & Parades
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {risks.map((item, idx) => (
              <article
                key={idx}
                className="bg-amber-50 border border-amber-200 rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="font-semibold text-gray-900">
                    Risque : {item.risk}
                  </h3>
                </div>
                <p className="text-sm text-gray-700">
                  <strong className="text-emerald-700">Parade :</strong>{" "}
                  {item.parade}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Timeline Summary */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Vision globale
          </h2>
          <div className="relative">
            {/* Timeline */}
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2" />

              {/* Phase markers */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <p className="mt-2 text-sm text-center">
                  Pilote
                  <br />
                  <span className="text-gray-400">3 mois</span>
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <p className="mt-2 text-sm text-center">
                  Extension
                  <br />
                  <span className="text-gray-400">12 mois</span>
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <p className="mt-2 text-sm text-center">
                  Généralisation
                  <br />
                  <span className="text-gray-400">Long terme</span>
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl">
                  🎯
                </div>
                <p className="mt-2 text-sm text-center">
                  Objectif
                  <br />
                  <span className="text-gray-400">Tri simplifié</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-900 bg-white hover:bg-gray-100 rounded-lg transition-colors"
            >
              Nous contacter pour en savoir plus →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
