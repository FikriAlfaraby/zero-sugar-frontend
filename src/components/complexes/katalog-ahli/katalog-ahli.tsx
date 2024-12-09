'use client'

import { useState } from "react";
import { DetailModal } from "./detail-catalog";
import { useGetCatalog, type UserCatalog } from "@/components/complexes/katalog-ahli/hooks/fetchCatalog.service";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Star, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  const { isLoading, data } = useGetCatalog();
  const [selectedExpert, setSelectedExpert] = useState<UserCatalog | null>(null);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-60px)] items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <main className="container px-4">
        <div className="border-b">
          <div className="flex h-16 items-center">
            <h2 className="text-lg font-semibold">List Katalog Ahli</h2>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data && data.map((expert) => (
            <Card key={expert.ID_CATALOG}>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold">
                  {expert.TITLE} {expert.NAME}
                </h2>
                <p className="text-muted-foreground">{expert.SPECIALIZATION}</p>
                <p className="mt-2">
                  Pengalaman: {expert.EXP_YEARS} tahun
                </p>
                <div className="mt-2 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < expert.RATING ? "fill-current text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button onClick={() => setSelectedExpert(expert)}>Detail</Button>
                <Button variant="outline" asChild>
                  <Link className="flex items-center justify-between space-x-0.5" href={`https://wa.me/${expert.WHATSAPP}?text=${encodeURIComponent(`Halo ${expert.TITLE} ${expert.NAME}, saya melihat profil Anda di Katalog Ahli dan ingin berdiskusi lebih lanjut mengenai ${expert.SPECIALIZATION}. Apakah Anda tersedia?`)}`}>
                  <Image
                    src="/assets/images/icon-wa.png"
                    alt="Journey completed"
                    width={35}
                    height={35}
                    className=""
                  />
                  <p>WhatsApp</p>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Modal */}
      <DetailModal data={selectedExpert} onClose={() => setSelectedExpert(null)} />
    </>
  );
}
