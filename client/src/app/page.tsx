"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const CafeModal = dynamic(() => import("../components/CafeModal"), {
  ssr: false,
});

type Cafe = {
  _id: string;
  lat: number;
  lng: number;
  cafeName: string;
  address?: string;
  description?: string;
  cafeType?: string;
  img?: string;
};

export default function Home() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
const filteredCafes = cafes.filter(
(cafe) =>
cafe.cafeName?.toLowerCase().includes(query.toLowerCase()) ||
cafe.address?.toLowerCase().includes(query.toLowerCase())
);

  useEffect(() => {
    async function getCafes() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cafe`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch cafes");
        }

        const data = await res.json();
        setCafes(data);
      } catch (error) {
        console.error(error);
        console.log(process.env.NEXT_PUBLIC_API_URL)
      } finally {
        setLoading(false);
      }
    }

    getCafes();
  }, []);

 if (loading) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-12 h-12 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-semibold text-amber-700">Brewing your cafes…</h2>
      <p className="text-sm text-gray-500 mt-2">Please wait a moment.</p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-amber-900 mb-6"
        >
        ☕ BCD Café Finder
        </motion.h1>


        {/* Search Bar */}
        <div className="flex items-center gap-2 max-w-md mx-auto mb-8">
        <Input
        placeholder="Search cafes by name or location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white shadow-md border-0 focus:ring-2 focus:ring-amber-400"
        />
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">
          <Search className="w-4 h-4" />
        </Button>
      </div>


          {/* Cafe Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredCafes.length > 0 ? (
  filteredCafes.map((cafe) => (
    <motion.div
      key={cafe._id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
     
    >
      <Card
        className="overflow-hidden rounded-2xl p-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
        onClick={() => setSelectedCafe(cafe)}   
      >
        <img
          src={cafe.img}
          alt={cafe.cafeName}
          className="h-56 w-full object-cover"
        />

        <CardContent className="p-4 h-32">
          <h2 className="text-lg font-semibold text-amber-800">
            {cafe.cafeName}
          </h2>
          <p className="text-sm text-gray-600">{cafe.address}</p>
          <p className="mt-2 text-yellow-600 font-medium text-xs">⭐ {cafe.cafeType}</p>
        </CardContent>
      </Card>
    </motion.div>
  ))
) : (
  <p className="text-center text-gray-500 col-span-full">
    No cafes found.
  </p>
)}
          {/* Cafe Modal */}
          {selectedCafe && (
  <CafeModal
    cafe={selectedCafe}
    onClose={() => setSelectedCafe(null)}
  />
)}
          </div>
          </div>
          </div>
            );
}
