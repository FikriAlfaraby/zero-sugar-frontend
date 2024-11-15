'use client';

import { MessageCircle, Star } from 'lucide-react';
import Link from 'next/link';

import { useGetCatalog } from '@/components/complexes/katalog-ahli/hooks/fetchCatalog.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

export default function Home() {
  const { data } = useGetCatalog();

  if (!data) {
    return <Spinner />;
  }

  return (
    <main className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Katalog Ahli</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map(expert => (
          <Card key={expert.ID_CATALOG}>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold">
                {expert.TITLE}
                {' '}
                {expert.NAME}
              </h2>
              <p className="text-muted-foreground">{expert.SPECIALIZATION}</p>
              <p className="mt-2">
                Pengalaman:
                {expert.EXP_YEARS}
                {' '}
                tahun
              </p>
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`size-4 ${i < expert.RATING ? 'fill-current text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild>
                <Link href={`/expert/${expert.ID_CATALOG}`}>Detail</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`https://wa.me/${expert.WHATSAPP}?text=${encodeURIComponent(`Halo ${expert.TITLE} ${expert.NAME}, saya melihat profil Anda di Katalog Ahli dan ingin berdiskusi lebih lanjut mengenai ${expert.SPECIALIZATION}. Apakah Anda tersedia?`)}`}>
                  <MessageCircle className="mr-2 size-4" />
                  WhatsApp
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
