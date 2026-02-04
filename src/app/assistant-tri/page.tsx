import type { Metadata } from 'next';
import AssistantTriClient from '@/components/AssistantTriClient';

export const metadata: Metadata = {
  title: 'Assistant de tri',
  description:
    'Recherchez un objet et découvrez dans quelle poubelle il va. Recherche tolérante aux fautes de frappe, base de données de 80+ objets courants et atypiques.',
  keywords: ['tri', 'déchets', 'recyclage', 'poubelle', 'où jeter', 'MEL'],
};

export default function AssistantTriPage() {
  return <AssistantTriClient />;
}
