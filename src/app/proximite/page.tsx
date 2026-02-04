import type { Metadata } from "next";
import ProximiteClient from "@/components/proximite/ProximiteClient";

export const metadata: Metadata = {
  title: "Trouver un point de dépôt",
  description:
    "Trouvez les points de dépôt PAV verre et déchèteries les plus proches de vous sur le territoire de la Métropole Européenne de Lille.",
};

export default function ProximitePage() {
  return <ProximiteClient />;
}
