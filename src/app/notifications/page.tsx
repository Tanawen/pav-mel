"use client";

import { useState } from "react";
import Link from "next/link";

const COLLECTION_TYPES = [
  { id: "tri", label: "Tri sélectif", color: "bg-yellow-100 text-yellow-800", description: "Emballages, papiers, cartons" },
  { id: "ordures", label: "Ordures ménagères", color: "bg-gray-200 text-gray-700", description: "Déchets non recyclables" },
  { id: "verre", label: "Verre", color: "bg-green-100 text-green-800", description: "Bouteilles, bocaux, pots" },
  { id: "biodechets", label: "Biodéchets", color: "bg-amber-100 text-amber-800", description: "Déchets alimentaires, végétaux" },
];

export default function NotificationsPage() {
  const [notifMethod, setNotifMethod] = useState<"email" | "sms">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["tri", "ordures", "verre", "biodechets"]);
  const [reminderTime, setReminderTime] = useState("veille");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!address.trim()) {
      setError("Veuillez entrer votre adresse.");
      return;
    }

    if (notifMethod === "email" && !email.trim()) {
      setError("Veuillez entrer votre adresse email.");
      return;
    }

    if (notifMethod === "sms" && !phone.trim()) {
      setError("Veuillez entrer votre numéro de téléphone.");
      return;
    }

    if (selectedTypes.length === 0) {
      setError("Veuillez sélectionner au moins un type de collecte.");
      return;
    }

    // Simulate API call
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)] mb-2">Inscription confirmée</h1>
          <p className="text-[var(--gray-600)] mb-6">
            Vous recevrez une notification {reminderTime === "veille" ? "la veille" : "le jour même"} de chaque collecte par {notifMethod === "email" ? "email" : "SMS"}.
          </p>
          <div className="bg-[var(--gray-50)] rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-medium text-[var(--gray-700)] mb-2">Types de collecte sélectionnés :</p>
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((id) => {
                const type = COLLECTION_TYPES.find((t) => t.id === id);
                return type ? (
                  <span key={id} className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${type.color}`}>
                    {type.label}
                  </span>
                ) : null;
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setSubmitted(false)}
              className="btn btn-secondary w-full justify-center"
            >
              Modifier mes préférences
            </button>
            <Link href="/" className="btn btn-primary w-full justify-center">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--mel-red)] to-[var(--mel-red-dark)] text-white py-12 md:py-16">
        <div className="container-mel max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="text-sm font-medium">Alertes collecte</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Ne ratez plus aucune collecte
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Recevez une notification avant chaque passage des camions de ramassage près de chez vous.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-[var(--gray-50)]">
        <div className="container-mel max-w-2xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Address */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[var(--gray-900)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--mel-red)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Votre adresse
              </h2>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Rue de la République, 59000 Lille"
                className="w-full px-4 py-3 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--mel-red)] focus:border-transparent"
              />
              <p className="text-xs text-[var(--gray-500)] mt-2">
                Nous utiliserons cette adresse pour déterminer vos jours de collecte.
              </p>
            </div>

            {/* Collection Types */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[var(--gray-900)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--mel-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Types de collecte
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COLLECTION_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleType(type.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTypes.includes(type.id)
                        ? "border-[var(--mel-red)] bg-[var(--mel-red-light)]"
                        : "border-[var(--gray-200)] hover:border-[var(--gray-300)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${type.color}`}>
                        {type.label}
                      </span>
                      {selectedTypes.includes(type.id) && (
                        <svg className="w-5 h-5 text-[var(--mel-red)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-[var(--gray-600)]">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Method */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[var(--gray-900)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--mel-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Mode de notification
              </h2>
              <div className="flex gap-3 p-1.5 bg-[var(--gray-100)] rounded-lg mb-4">
                <button
                  type="button"
                  onClick={() => setNotifMethod("email")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                    notifMethod === "email"
                      ? "bg-white text-[var(--mel-red)] shadow-sm"
                      : "text-[var(--gray-600)] hover:text-[var(--gray-900)]"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setNotifMethod("sms")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all ${
                    notifMethod === "sms"
                      ? "bg-white text-[var(--mel-red)] shadow-sm"
                      : "text-[var(--gray-600)] hover:text-[var(--gray-900)]"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  SMS
                </button>
              </div>

              {notifMethod === "email" ? (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--gray-700)] mb-1">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    className="w-full px-4 py-3 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--mel-red)] focus:border-transparent"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--gray-700)] mb-1">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full px-4 py-3 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--mel-red)] focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Reminder Time */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[var(--gray-900)] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--mel-red)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quand recevoir le rappel ?
              </h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setReminderTime("veille")}
                  className={`flex-1 p-4 rounded-lg border-2 text-center transition-all ${
                    reminderTime === "veille"
                      ? "border-[var(--mel-red)] bg-[var(--mel-red-light)]"
                      : "border-[var(--gray-200)] hover:border-[var(--gray-300)]"
                  }`}
                >
                  <p className="font-semibold text-[var(--gray-900)]">La veille</p>
                  <p className="text-xs text-[var(--gray-600)]">18h00</p>
                </button>
                <button
                  type="button"
                  onClick={() => setReminderTime("jour")}
                  className={`flex-1 p-4 rounded-lg border-2 text-center transition-all ${
                    reminderTime === "jour"
                      ? "border-[var(--mel-red)] bg-[var(--mel-red-light)]"
                      : "border-[var(--gray-200)] hover:border-[var(--gray-300)]"
                  }`}
                >
                  <p className="font-semibold text-[var(--gray-900)]">Le jour même</p>
                  <p className="text-xs text-[var(--gray-600)]">7h00</p>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full justify-center py-3 text-base">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Activer les notifications
            </button>

            <p className="text-xs text-[var(--gray-400)] text-center mt-4">
              Vous pouvez vous désinscrire à tout moment. Vos données ne seront pas partagées.
            </p>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="container-mel max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--gray-900)] text-center mb-8">
            Comment ça fonctionne ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Inscrivez-vous",
                desc: "Entrez votre adresse et choisissez vos préférences de notification.",
              },
              {
                step: 2,
                title: "Recevez vos rappels",
                desc: "Un message vous est envoyé avant chaque collecte programmée.",
              },
              {
                step: 3,
                title: "Sortez vos poubelles",
                desc: "Préparez vos bacs à temps et ne ratez plus jamais une collecte.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-[var(--mel-red)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-[var(--gray-900)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--gray-600)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
