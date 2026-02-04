"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import type { PointMEL } from "@/lib/geo";
import "leaflet/dist/leaflet.css";

/* ── Custom pin markers (inline styles – not processed by Tailwind) ──── */

function pinIcon(emoji: string, bg: string) {
  return divIcon({
    className: "",
    html: `<div style="width:30px;height:38px;position:relative;">
      <div style="
        width:30px;height:30px;
        background:${bg};
        border-radius:50%;
        border:2.5px solid #fff;
        box-shadow:0 2px 8px rgba(0,0,0,.35);
        display:flex;align-items:center;justify-content:center;
        font-size:15px;
        position:relative;z-index:1;
      ">${emoji}</div>
      <div style="
        width:0;height:0;
        border-left:7px solid transparent;
        border-right:7px solid transparent;
        border-top:12px solid ${bg};
        position:absolute;bottom:0;left:8px;
      "></div>
    </div>`,
    iconSize: [30, 38],
    iconAnchor: [15, 38],
  });
}

const ICONS = {
  verre: pinIcon("🥃", "#10b981"),
  decheterie: pinIcon("🗑️", "#f59e0b"),
  user: divIcon({
    className: "",
    html: `<div style="
      width:18px;height:18px;
      background:#3b82f6;
      border-radius:50%;
      border:3px solid #fff;
      box-shadow:0 0 0 4px rgba(59,130,246,.3), 0 2px 6px rgba(0,0,0,.3);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  }),
} as const;

/* ── Re-centre helper ───────────────────────────────────────────────── */

function MapCentreUpdater({ centre }: { centre: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(centre, map.getZoom(), { animate: true });
  }, [centre, map]);
  return null;
}

/* ── Main component ─────────────────────────────────────────────────── */

interface MapViewProps {
  points: PointMEL[];
  userPos: { lat: number; lng: number } | null;
  centre: [number, number];
  onPlaceClick: (place: PointMEL) => void;
}

export default function MapView({
  points,
  userPos,
  centre,
  onPlaceClick,
}: MapViewProps) {
  return (
    <MapContainer
      center={centre}
      zoom={12}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapCentreUpdater centre={centre} />

      {/* POI markers */}
      {points.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={ICONS[p.type]}
          title={p.name}
          eventHandlers={{ click: () => onPlaceClick(p) }}
        />
      ))}

      {/* User position */}
      {userPos && (
        <Marker
          position={[userPos.lat, userPos.lng]}
          icon={ICONS.user}
          title="Votre position"
        />
      )}
    </MapContainer>
  );
}
