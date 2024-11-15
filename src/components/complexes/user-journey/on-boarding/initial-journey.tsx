import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { UserJourneyForm } from './user-journey-form';

type InitialUserJourneyProps = {
  userId: number;
  onJourneyComplete: () => void;
};

export function InitialUserJourney({ userId, onJourneyComplete }: InitialUserJourneyProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const journeyMutation = useMutation({
    mutationFn: async (journeyData: any) => {
      const convertedData = {
        sugar: Number.parseFloat(journeyData.sugarIntake),
        drink_consumption: Number.parseFloat(journeyData.drinkConsumption),
        activities: Number.parseFloat(journeyData.activities),
        hours_sleep: Number.parseInt(journeyData.hoursOfSleep, 10),
        sleep_quality: journeyData.sleepQuality?.toLowerCase(),
        is_smoking: journeyData.isSmoking,
        stress_level: journeyData.stressLevel?.toLowerCase(),
        risk_profile: journeyData.riskProfile?.toLowerCase(),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/journey/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convertedData),
      });
      if (!response.ok) {
        throw new Error('Failed to save user journey');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userJourney', userId] });
      setIsDialogOpen(false);
      onJourneyComplete();
    },
  });

  return (
    <div className="text-center">
      <Image
        src="/assets/images/empty-journey.svg"
        alt="Start your journey"
        width={200}
        height={200}
        className="mx-auto mb-4"
      />
      <h1 className="mb-4 text-3xl font-bold">Start your journey now!</h1>
      <p className="mb-6 text-xl">Let's track your first day!</p>
      <Button onClick={() => setIsDialogOpen(true)}>Begin My Journey</Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
          <DialogHeader className="bg-background pb-4">
            <DialogTitle>Log Your First Day</DialogTitle>
          </DialogHeader>
          <UserJourneyForm onSubmit={journeyMutation.mutate} isLoading={journeyMutation.isPending} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
