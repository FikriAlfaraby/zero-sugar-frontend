'use client';

import { useState, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Image from "next/image";
import SummaryNotStarted from "./SummaryNotStarted";

export default function SummaryNotFinished({ firstDate }: { firstDate: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  const firstCreatedAt = new Date(firstDate);
  const endDate = new Date(firstCreatedAt);
  endDate.setDate(endDate.getDate() + 29);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}h ${hours}j ${minutes}m ${seconds}d`);
      } else {
        clearInterval(timer);
        setTimeLeft("Fitur sudah tersedia!");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

   if (!firstDate) {
    return <SummaryNotStarted />;
  }

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <Card className="mx-4 w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Image
            src="/assets/images/not-finished.svg"
            alt="Journey not completed"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />
          <h1 className="mb-4 text-3xl font-bold text-primary">Perjalananmu Belum Selesai!</h1>
          <p className="mb-6 text-xl text-secondary-foreground">
            Lengkapi perjalananmu sekarang dan fitur <strong>Summary</strong> akan terbuka dalam:
          </p>
          <div className="mb-4 text-2xl font-semibold text-warning">{timeLeft}</div>
          <Link href="/dashboard/user-journey">
            <Button
              className="rounded-full px-6 bg-primary py-2 font-bold text-white transition-all duration-200 ease-in-out hover:scale-105"
            >
              Lanjutkan Sekarang
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
