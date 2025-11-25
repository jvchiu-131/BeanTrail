"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";

interface Cafe {
  lat: number;
  lng: number;
  cafeName: string;
  address?: string;
  description?: string;
  img?: string;
}

type CafeModalProps = {
  cafe: Cafe;
  onClose: () => void;
};

export default function CafeModal({ cafe, onClose }: CafeModalProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

   

    const map = L.map(mapRef.current).setView([cafe.lat, cafe.lng], 16);
    leafletMap.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.marker([cafe.lat, cafe.lng])
      .addTo(map)
      .bindPopup(cafe.cafeName)
      .openPopup();

    return () => {
      // ensure the cleanup returns void by not returning the value of map.remove()
      map.remove();
    };
  }, [cafe]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center 
                   bg-black/40 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white w-[90%] md:w-[45%] rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* IMAGE HEADER */}
          {cafe.img && (
            <div className="w-full h-56 overflow-hidden">
              <img
                src={cafe.img}
                alt={cafe.cafeName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="relative p-6">
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-3xl font-bold text-amber-800 mb-1">
              {cafe.cafeName}
            </h2>

            <p className="text-gray-600 text-sm mb-4">{cafe.address}</p>

            {/* DESCRIPTION */}
            {cafe.description && (
              <p className="text-gray-700 leading-relaxed mb-5">
                {cafe.description}
              </p>
            )}

            {/* MAP */}
            <h3 className="text-lg font-semibold text-amber-700 mb-2">Location</h3>
            <div
              ref={mapRef}
              className="h-64 w-full rounded-xl border shadow-sm"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
           