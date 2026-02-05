'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/solution', label: 'Solution' },
  { href: '/assistant-tri', label: 'Assistant tri' },
  { href: '/proximite', label: 'Proximité' },
  { href: '/swipe-jeux', label: 'Mini-Jeux' },
];

const topbarLinks = [
  { href: '/demo', label: 'Démo' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-sticky">
      {/* ── Topbar ─────────────────────────────────────────── */}
      <div className="bg-[var(--mel-blue-dark)] text-white">
        <div className="container-mel">
          <div className="flex items-center justify-between h-9 text-xs">
            {/* Left: utility links */}
            <nav aria-label="Liens utilitaires" className="hidden sm:flex items-center gap-4">
              {topbarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:underline underline-offset-2 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right: MEL official link */}
            <div className="flex items-center gap-4 ml-auto">
              <a
                href="https://www.lillemetropole.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline underline-offset-2 flex items-center gap-1.5"
              >
                <span className="hidden sm:inline">lillemetropole.fr</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Header ────────────────────────────────────── */}
      <div className="bg-white border-b border-[var(--gray-200)] shadow-sm">
        <div className="container-mel">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              aria-label="Accueil Prévention Pédagogique MEL"
            >
              {/* MEL Logo */}
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo-mel.png`}
                alt="Métropole Européenne de Lille"
                className="h-10 lg:h-12 w-auto"
              />
              <div className="h-8 w-px bg-[var(--gray-300)] hidden sm:block" />
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-bold text-[var(--gray-900)] leading-tight">
                  Prévention Pédagogique
                </span>
                <span className="text-xs text-[var(--gray-500)] leading-tight">
                  Tri des déchets
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block" aria-label="Navigation principale">
              <ul className="flex items-center gap-1" role="menubar">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href} role="none">
                      <Link
                        href={item.href}
                        className={`
                          relative px-4 py-2 text-sm font-medium rounded-md transition-all
                          ${isActive
                            ? 'text-[var(--mel-blue)] bg-[var(--mel-blue-light)]'
                            : 'text-[var(--gray-700)] hover:text-[var(--mel-blue)] hover:bg-[var(--gray-100)]'
                          }
                        `}
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[var(--mel-blue)] rounded-full" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA Button (desktop) */}
            <Link
              href="/swipe-jeux"
              className="hidden lg:inline-flex btn btn-primary"
            >
              Jouer
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 -mr-2 rounded-md text-[var(--gray-700)] hover:bg-[var(--gray-100)] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ────────────────────────────────────── */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div
            id="mobile-menu"
            className="fixed top-[calc(2.25rem+4rem)] left-0 right-0 bottom-0 bg-white z-50 lg:hidden overflow-y-auto animate-slide-down"
          >
            <nav className="container-mel py-4" aria-label="Navigation mobile">
              <ul className="space-y-1" role="menu">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href} role="none">
                      <Link
                        href={item.href}
                        className={`
                          flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors
                          ${isActive
                            ? 'text-[var(--mel-blue)] bg-[var(--mel-blue-light)]'
                            : 'text-[var(--gray-700)] hover:bg-[var(--gray-100)]'
                          }
                        `}
                        role="menuitem"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                        {isActive && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-[var(--mel-blue)]" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile CTA */}
              <div className="mt-6 px-4">
                <Link
                  href="/swipe-jeux"
                  className="btn btn-primary w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Jouer aux mini-jeux
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Link>
              </div>

              {/* Mobile utility links */}
              <div className="mt-6 pt-6 border-t border-[var(--gray-200)] px-4">
                <div className="flex flex-col gap-3 text-sm text-[var(--gray-600)]">
                  {topbarLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="hover:text-[var(--mel-blue)]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <a
                    href="https://www.lillemetropole.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-[var(--mel-blue)]"
                  >
                    lillemetropole.fr
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
