import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { ProfileForm, type ProfileFormValues } from './profile-form';

type ProfileCheckProps = {
  userId: number;
  onProfileComplete: () => void;
};

export function ProfileCheck({ userId, onProfileComplete }: ProfileCheckProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const profileMutation = useMutation({
    mutationFn: async (profileData: ProfileFormValues) => {
      const weight = Number.parseFloat(profileData.weight);
      const height = Number.parseFloat(profileData.height) / 100; // Ubah cm ke meter

      // Hitung BMI
      const bmi = (weight / (height * height)).toFixed(2); // Hasil BMI dalam format string dengan 2 angka desimal

      // Siapkan data yang akan dikirim
      const convertedData = {
        name: profileData.name,
        age: Number.parseInt(profileData.age),
        gender: profileData.gender,
        phone_number: profileData.phoneNumber,
        weight,
        height: height * 100,
        is_diabetes: profileData.isDiabetes,
        is_obesity: Number(bmi) >= 30,
        bmi: Number(bmi),
        is_onboarding: true,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convertedData),
      });
      if (!response.ok) {
        throw new Error('Failed to save profile');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
      setIsDialogOpen(false);
      onProfileComplete();
    },
  });

  return (
    <div className="text-center">
      <Image
        src="/assets/images/empty-profile.svg"
        alt="Oops! Profile needed"
        width={250}
        height={250}
        className="mx-auto mb-4"
      />
      <h1 className="mb-4 text-3xl font-bold">Oops!</h1>
      <p className="mb-6 text-base md:text-xl">
        Looks like you haven't set up your profile yet. Let's get started to unlock your journey!
      </p>
      <Button onClick={() => setIsDialogOpen(true)}>Create Profile</Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
          <DialogHeader className="bg-background pb-4">
            <DialogTitle>Create Your Profile</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <ProfileForm onSubmit={profileMutation.mutate} isLoading={profileMutation.isPending} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
