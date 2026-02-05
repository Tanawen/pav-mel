'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Route labels mapping (keeps existing route names)
const routeLabels: Record<string, string> = {
  '': 'Accueil',
  'solution': 'Solution',
  'assistant-tri': 'Assistant tri',
  'proximite': 'Proximité',
  'swipe-jeux': 'Mini-Jeux',
  'demo': 'Démo',
  'deploiement': 'Déploiement',
  'impact': 'Impact',
  'contact': 'Contact',
};

export default function Breadcrumb() {
  const pathname = usePathname();

  // Don't show breadcrumb on homepage
  if (pathname === '/') {
    return null;
  }

  // Build breadcrumb items from pathname
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    const isLast = index === segments.length - 1;

    return { href, label, isLast };
  });

  return (
    <nav
      aria-label="Fil d'Ariane"
      className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]"
    >
      <div className="container-mel py-3">
        <ol className="flex items-center gap-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          {/* Home */}
          <li
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              href="/"
              className="text-[var(--gray-500)] hover:text-[var(--mel-blue)] transition-colors flex items-center gap-1"
              itemProp="item"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span itemProp="name" className="sr-only sm:not-sr-only">Accueil</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          {/* Separator + Items */}
          {breadcrumbItems.map((item, index) => (
            <li
              key={item.href}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {/* Separator */}
              <svg
                className="w-4 h-4 text-[var(--gray-400)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>

              {item.isLast ? (
                <span
                  className="text-[var(--gray-700)] font-medium"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[var(--gray-500)] hover:text-[var(--mel-blue)] transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 2)} />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
