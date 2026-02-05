import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prévention Pédagogique MEL | Tri simplifié pour tous",
    template: "%s | Prévention Pédagogique MEL",
  },
  description:
    "Points d'Apport Volontaire pédagogiques et intelligents pour la Métropole Européenne de Lille. Rendre le tri évident, réduire les erreurs, améliorer l'espace public.",
  keywords: ["tri", "déchets", "recyclage", "MEL", "Lille", "PAV", "pédagogique"],
  authors: [{ name: "Projet Prévention Pédagogique MEL" }],
  openGraph: {
    title: "Prévention Pédagogique MEL",
    description: "Rendre le tri évident, réduire les erreurs, améliorer l'espace public.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased bg-white text-[var(--gray-900)]`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Breadcrumb />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
