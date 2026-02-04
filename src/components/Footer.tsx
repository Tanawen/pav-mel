import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">
              Prévention Pédagogique MEL
            </h2>
            <p className="text-sm leading-relaxed">
              Une solution pour rendre le tri plus simple, plus accessible et plus efficace
              sur le territoire de la Métropole Européenne de Lille.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white font-semibold text-lg mb-4">Navigation</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/solution" className="hover:text-emerald-400 transition-colors">
                  Notre solution
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-emerald-400 transition-colors">
                  Tester le tri
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p className="text-gray-400">
            Prototype étudiant — Données illustratives uniquement
          </p>
          <p className="mt-2 text-gray-500">
            © {new Date().getFullYear()} Projet Prévention Pédagogique • Métropole Européenne de Lille
          </p>
        </div>
      </div>
    </footer>
  );
}
