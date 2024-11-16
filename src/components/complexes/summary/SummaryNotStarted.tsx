'use client';

import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Image from "next/image";

export default function SummaryNotStarted() {
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <Card className="mx-4 w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Image
            src="/assets/images/not-started.svg"
            alt="Journey not started"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />
          <h1 className="mb-4 text-3xl font-bold text-primary">Belum Memulai Perjalanan</h1>
          <p className="mb-6 text-xl text-secondary-foreground">
            Mulailah langkah pertamamu di fitur <strong>User Journey</strong> untuk mencapai tujuanmu!
          </p>
          <Link href="/dashboard/user-journey">
            <Button
              className="rounded-full px-6 bg-primary py-2 font-bold text-white transition-all duration-200 ease-in-out hover:scale-105"
            >
              Mulai Sekarang
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
