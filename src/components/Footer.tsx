import Link from 'next/link';

const footerNav = {
  services: [
    { href: '/proximite', label: 'Points de dépôt' },
    { href: '/assistant-tri', label: 'Assistant tri' },
    { href: '/swipe-jeux', label: 'Mini-jeux' },
    { href: '/demo', label: 'Tester le tri' },
  ],
  about: [
    { href: '/solution', label: 'Notre solution' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--gray-900)] text-[var(--gray-300)]">
      {/* Main footer content */}
      <div className="container-mel py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo-mel.png`}
                alt="Métropole Européenne de Lille"
                className="h-10 w-auto brightness-0 invert opacity-90"
              />
            </div>
            <h2 className="text-white font-semibold text-lg mb-3">
              Prévention Pédagogique MEL
            </h2>
            <p className="text-sm leading-relaxed text-[var(--gray-400)]">
              Une solution pour rendre le tri plus simple, plus accessible et plus efficace
              sur le territoire de la Métropole Européenne de Lille.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--gray-400)] hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--mel-blue)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              À propos
            </h3>
            <ul className="space-y-2.5">
              {footerNav.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--gray-400)] hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--mel-blue)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.lillemetropole.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--gray-400)] hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--mel-blue)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Site officiel MEL
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Social column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Nous suivre
            </h3>
            <div className="flex items-center gap-3 mb-6">
              {/* Twitter/X */}
              <a
                href="https://twitter.com/MEaboratoire"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--gray-800)] flex items-center justify-center text-[var(--gray-400)] hover:bg-[var(--mel-blue)] hover:text-white transition-all"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/mel-lille/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--gray-800)] flex items-center justify-center text-[var(--gray-400)] hover:bg-[var(--mel-blue)] hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="https://github.com/tanawen/pav-mel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[var(--gray-800)] flex items-center justify-center text-[var(--gray-400)] hover:bg-[var(--mel-blue)] hover:text-white transition-all"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* Project status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--gray-800)] text-xs text-[var(--gray-400)]">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Prototype étudiant
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--gray-800)]">
        <div className="container-mel py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--gray-500)]">
            <p>
              © {new Date().getFullYear()} Projet Prévention Pédagogique • Métropole Européenne de Lille
            </p>
            <div className="flex items-center gap-4">
              <span>Données illustratives uniquement</span>
              <span className="hidden sm:inline">•</span>
              <a
                href="https://tanawen.github.io/pav-mel/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--mel-blue)] transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Voir sur GitHub Pages
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
