import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { UserJourneyForm, type UserJourneyFormValues, type UserProfile } from './user-journey-form';

type InitialUserJourneyProps = {
  userId: number;
  onJourneyComplete: () => void;
};

export function InitialUserJourney({ userId, onJourneyComplete }: InitialUserJourneyProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
    const { data: profileData } = useQuery<UserProfile> ({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    },
  });

  const journeyMutation = useMutation({
    mutationFn: async (journeyData: UserJourneyFormValues ) => {
      const sugarResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/predict_sugar_intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({profile : journeyData.picture}),
      });

      if (!sugarResponse.ok) {
        throw new Error('Failed to fetch sugar intake prediction');
      }

      const sugar = await sugarResponse.json();

      const userData = {
        Age: Number(profileData?.AGE),
        Gender: profileData?.GENDER === 'male' ? 1 : 0,
        Height: profileData?.HEIGHT,
        Weight: profileData?.WEIGHT,
        Is_Diabetes: profileData?.IS_DIABETES ? 1 : 0,
        BMI: profileData?.BMI,
        Sugar: sugar.predicted_sugar_intake,
        Drink_Consumption: Number.parseFloat(journeyData.drinkConsumption.toString()),
        Activities: Number.parseFloat(journeyData.activities.toString()),
        Sleep_Hours: Number.parseInt(journeyData.hoursOfSleep.toString(), 10),
        Is_Smoking: journeyData.isSmoking ? 1 : 0,
      };

      const profileRiskResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/predict_profile_risk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!profileRiskResponse.ok) {
        throw new Error('Failed to fetch profile risk prediction');
      }

      const dataProfileRisk = await profileRiskResponse.json();

      const riskMapping = {
        0: 'Low Risk',
        1: 'Neutral',
        2: 'High Risk',
        3: 'Very High Risk',
      };

      const riskProfile = riskMapping[dataProfileRisk.predicted_cluster as keyof typeof riskMapping];

      // Define convertedData with properties in the specified order
      const convertedData = {
        sugar: sugar.predicted_sugar_intake,
        drink_consumption: Number.parseFloat(journeyData.drinkConsumption.toString()),
        activities: Number.parseFloat(journeyData.activities.toString()),
        hours_sleep: Number.parseInt(journeyData.hoursOfSleep.toString(), 10),
        sleep_quality: journeyData.sleepQuality.toLowerCase(),
        is_smoking: journeyData.isSmoking,
        stress_level: journeyData.stressLevel.toLowerCase(),
        risk_profile: riskProfile,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/journey/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convertedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'User telah mengisi journey hari ini') {
          throw new Error('User telah mengisi journey hari ini');
        }
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
