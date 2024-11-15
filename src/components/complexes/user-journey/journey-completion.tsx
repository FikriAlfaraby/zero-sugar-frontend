'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';

type JourneyCompletionProps = {
  isEnd: boolean;
};

export default function JourneyCompletion({ isEnd }: JourneyCompletionProps) {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', updateWindowSize);
    updateWindowSize();

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  if (!isEnd) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <Confetti width={windowSize.width - 50} height={windowSize.height - 60} />
      <Card className="mx-4 w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Image
            src="/assets/images/journey-complete.svg"
            alt="Journey completed"
            width={200}
            height={200}
            className="mx-auto mb-6"
          />
          <h1 className="mb-4 text-3xl font-bold text-primary">Congratulations!</h1>
          <p className="mb-6 text-xl text-secondary-foreground">You've completed your journey!</p>
          <Button
            onClick={() => router.push('/dashboard/summary')}
            className="rounded-full px-6 py-2 font-bold text-white transition-all duration-200 ease-in-out hover:scale-105"
          >
            Check Your Summary
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
