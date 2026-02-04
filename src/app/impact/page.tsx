import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact & KPI",
  description:
    "Découvrez les indicateurs clés et l'impact attendu de notre solution sur le tri et l'espace public.",
};

const kpis = [
  {
    label: "Taux d'erreur de tri",
    direction: "↓",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: "Réduction des erreurs grâce à la signalétique claire",
  },
  {
    label: "Taux de refus en centre",
    direction: "↓",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    description: "Moins de collectes contaminées à retraiter",
  },
  {
    label: "Dépôts sauvages",
    direction: "↓",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: "Réduction des abandons autour des PAV",
  },
  {
    label: "Satisfaction usagers",
    direction: "↑",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    description: "Habitants moins perdus, plus satisfaits",
  },
  {
    label: "Propreté espace public",
    direction: "↑",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    description: "Amélioration visible du cadre de vie",
  },
  {
    label: "Tonnes valorisées",
    direction: "↑",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    description: "Plus de déchets correctement recyclés",
  },
];

// Mock data for charts
const errorRateData = {
  before: [32, 30, 31, 29, 28, 30, 29, 31, 30, 28, 29, 28],
  after: [28, 25, 22, 20, 18, 17, 16, 15, 14, 13, 12, 12],
  months: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
};

const refusalData = [
  { month: "Jan", value: 24 },
  { month: "Fév", value: 22 },
  { month: "Mar", value: 19 },
  { month: "Avr", value: 17 },
  { month: "Mai", value: 15 },
  { month: "Jun", value: 14 },
  { month: "Jul", value: 13 },
  { month: "Aoû", value: 12 },
  { month: "Sep", value: 11 },
  { month: "Oct", value: 10 },
  { month: "Nov", value: 10 },
  { month: "Déc", value: 9 },
];

const cleanlinessData = {
  values: [45, 50, 55, 60, 65, 68, 72, 75, 78, 82, 85, 88],
  months: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
};

export default function ImpactPage() {
  const maxRefusal = Math.max(...refusalData.map((d) => d.value));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Impact & Indicateurs
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Des KPI concrets pour mesurer l&apos;efficacité de notre approche et
              piloter les améliorations.
            </p>
          </div>
        </div>
      </section>

      {/* KPIs Grid */}
      <section className="py-12 bg-white" aria-labelledby="kpi-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="kpi-heading"
            className="text-2xl font-bold text-gray-900 text-center mb-8"
          >
            6 indicateurs clés suivis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((kpi, idx) => (
              <article
                key={idx}
                className={`${kpi.bgColor} ${kpi.borderColor} border rounded-xl p-5`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-bold ${kpi.color}`}>
                    {kpi.direction}
                  </span>
                  <h3 className="font-semibold text-gray-900">{kpi.label}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">{kpi.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-12 bg-gray-50" aria-labelledby="charts-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="charts-heading"
            className="text-2xl font-bold text-gray-900 text-center mb-8"
          >
            Évolution sur 12 mois (projection)
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Error Rate Before/After */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Taux d&apos;erreur avant/après déploiement
              </h3>
              <div className="relative h-48">
                <svg viewBox="0 0 400 160" className="w-full h-full">
                  {/* Grid lines */}
                  {[0, 10, 20, 30].map((y) => (
                    <line
                      key={y}
                      x1="40"
                      y1={140 - y * 4}
                      x2="380"
                      y2={140 - y * 4}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {[0, 10, 20, 30].map((y) => (
                    <text
                      key={y}
                      x="35"
                      y={144 - y * 4}
                      fontSize="10"
                      fill="#6b7280"
                      textAnchor="end"
                    >
                      {y}%
                    </text>
                  ))}

                  {/* Before line (red) */}
                  <polyline
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    points={errorRateData.before
                      .map((v, i) => `${50 + i * 28},${140 - v * 4}`)
                      .join(" ")}
                  />

                  {/* After line (green) */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    points={errorRateData.after
                      .map((v, i) => `${50 + i * 28},${140 - v * 4}`)
                      .join(" ")}
                  />

                  {/* X-axis labels */}
                  {errorRateData.months.map((m, i) => (
                    <text
                      key={m}
                      x={50 + i * 28}
                      y="155"
                      fontSize="9"
                      fill="#6b7280"
                      textAnchor="middle"
                    >
                      {m}
                    </text>
                  ))}
                </svg>
              </div>
              <div className="flex justify-center gap-6 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-500 rounded"></span> Avant
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-emerald-500 rounded"></span> Après
                </span>
              </div>
            </div>

            {/* Chart 2: Refusal Rate Bar Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Refus en centre de tri (% par mois)
              </h3>
              <div className="relative h-48">
                <svg viewBox="0 0 400 160" className="w-full h-full">
                  {/* Bars */}
                  {refusalData.map((d, i) => (
                    <g key={d.month}>
                      <rect
                        x={45 + i * 28}
                        y={140 - (d.value / maxRefusal) * 100}
                        width="20"
                        height={(d.value / maxRefusal) * 100}
                        fill="#f59e0b"
                        rx="2"
                      />
                      <text
                        x={55 + i * 28}
                        y="155"
                        fontSize="8"
                        fill="#6b7280"
                        textAnchor="middle"
                      >
                        {d.month}
                      </text>
                    </g>
                  ))}

                  {/* Y-axis labels */}
                  {[0, 10, 20].map((y) => (
                    <text
                      key={y}
                      x="35"
                      y={144 - (y / maxRefusal) * 100}
                      fontSize="10"
                      fill="#6b7280"
                      textAnchor="end"
                    >
                      {y}%
                    </text>
                  ))}
                </svg>
              </div>
            </div>

            {/* Chart 3: Cleanliness/Satisfaction */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 lg:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-4">
                Indice de propreté / satisfaction (évolution)
              </h3>
              <div className="relative h-48">
                <svg viewBox="0 0 800 160" className="w-full h-full">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line
                      key={y}
                      x1="50"
                      y1={140 - y * 1.2}
                      x2="750"
                      y2={140 - y * 1.2}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <text
                      key={y}
                      x="45"
                      y={144 - y * 1.2}
                      fontSize="10"
                      fill="#6b7280"
                      textAnchor="end"
                    >
                      {y}
                    </text>
                  ))}

                  {/* Area fill */}
                  <polygon
                    fill="url(#tealGradient)"
                    points={`60,140 ${cleanlinessData.values
                      .map((v, i) => `${60 + i * 58},${140 - v * 1.2}`)
                      .join(" ")} 696,140`}
                  />

                  {/* Line */}
                  <polyline
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="3"
                    points={cleanlinessData.values
                      .map((v, i) => `${60 + i * 58},${140 - v * 1.2}`)
                      .join(" ")}
                  />

                  {/* Points */}
                  {cleanlinessData.values.map((v, i) => (
                    <circle
                      key={i}
                      cx={60 + i * 58}
                      cy={140 - v * 1.2}
                      r="4"
                      fill="#14b8a6"
                    />
                  ))}

                  {/* X-axis labels */}
                  {cleanlinessData.months.map((m, i) => (
                    <text
                      key={m}
                      x={60 + i * 58}
                      y="155"
                      fontSize="10"
                      fill="#6b7280"
                      textAnchor="middle"
                    >
                      {m}
                    </text>
                  ))}

                  <defs>
                    <linearGradient
                      id="tealGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-center text-sm text-gray-500 italic">
            Données illustratives (prototype) — Projections basées sur des
            études similaires.
          </p>
        </div>
      </section>

      {/* Benefits for MEL */}
      <section className="py-12 bg-white" aria-labelledby="benefits-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="benefits-heading"
            className="text-2xl font-bold text-gray-900 text-center mb-8"
          >
            Ce que la MEL y gagne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: "💰",
                title: "Moins de refus = moins de coûts",
                desc: "Réduction des coûts de gestion et plus d'efficacité dans le traitement.",
              },
              {
                icon: "🌳",
                title: "Espace public plus propre",
                desc: "Un bénéfice visible et immédiat pour les habitants et l'image du territoire.",
              },
              {
                icon: "😊",
                title: "Usagers moins perdus",
                desc: "Moins de réclamations, meilleure adhésion aux consignes de tri.",
              },
              {
                icon: "📈",
                title: "Pilotage data",
                desc: "Des décisions plus rapides et ciblées grâce aux indicateurs en temps réel.",
              },
            ].map((item, idx) => (
              <article
                key={idx}
                className="flex gap-4 bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <span className="text-3xl" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
