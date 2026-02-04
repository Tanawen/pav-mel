# PAV Pédagogiques MEL

Site de présentation de la solution "Points d'Apport Volontaire pédagogiques et intelligents" pour la Métropole Européenne de Lille (MEL).

## 🎯 Objectif

Convaincre un jury (collectivité + école) en 3 minutes de navigation que notre solution peut simplifier le tri des déchets et améliorer l'espace public.

## 🚀 Lancer le projet

### Prérequis

- Node.js 18+ installé
- npm

### Installation

```bash
# Se placer dans le dossier du projet
cd pav-mel

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur **http://localhost:3000**

### Build de production

```bash
npm run build
npm start
```

## 📁 Structure du projet

```
pav-mel/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Page d'accueil
│   │   ├── layout.tsx        # Layout global (Header + Footer)
│   │   ├── globals.css       # Styles globaux
│   │   ├── solution/         # Page Solution
│   │   ├── demo/             # Page Démo Tri interactive
│   │   ├── impact/           # Page Impact & KPI
│   │   ├── deploiement/      # Page Plan de déploiement
│   │   └── contact/          # Page Contact
│   └── components/
│       ├── Header.tsx        # Navigation
│       └── Footer.tsx        # Pied de page
├── public/                   # Assets statiques
├── package.json
└── README.md
```

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil avec hero, chiffres clés, problème et solution |
| `/solution` | Détail des 4 piliers + parcours usager |
| `/demo` | Mini-app interactive de tri (drag & drop) |
| `/impact` | KPIs et graphiques de projection |
| `/deploiement` | Plan en 3 phases + risques |
| `/contact` | Formulaire de contact |

## 🎮 Démo Tri

La page `/demo` propose une expérience interactive :

- **12 déchets** à trier par glisser-déposer
- **4 poubelles** : Jaune (emballages), Vert (verre), Marron (biodéchets), Déchèterie
- **Feedback immédiat** après chaque action (✅/❌ + explication)
- **Mode "Quartier"** : simule des règles locales différentes pour montrer la confusion

## 🛠️ Technologies

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **100% statique** (pas de backend)

## ♿ Accessibilité

- Navigation clavier complète
- Attributs ARIA
- Contrastes WCAG AA
- Focus visible
- Skip link

## 📊 Performance

Le site est optimisé pour un bon score Lighthouse :
- Pas de librairies lourdes (charts en SVG pur)
- Images en emoji (pas de fichiers à charger)
- Composants simples et légers

## 📝 Notes

- **Prototype étudiant** — les données sont illustratives
- Les coordonnées de contact sont fictives
- Le formulaire simule un envoi (pas de backend)

---

Projet réalisé dans le cadre d'une présentation MEL.
