'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { Spinner } from '@/components/ui/spinner';

import { InitialUserJourney } from './initial-journey';
import { ProfileCheck } from './profile-check';
import UserJourney from './user-journey';

export default function OnboardingFlow({ userId }: { userId: number }) {
  const [step, setStep] = useState<'profile' | 'journey' | 'dashboard'>('profile');

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    },
  });

  const { data: userJourney, isLoading: isJourneyLoading } = useQuery({
    queryKey: ['userJourney', userId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/journey/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user journey');
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (profile && !isProfileLoading) {
      setStep('journey');
    }
    if (userJourney && userJourney.length > 0 && !isJourneyLoading) {
      setStep('dashboard');
    }
  }, [profile, userJourney, isProfileLoading, isJourneyLoading]);

  const handleProfileComplete = () => {
    setStep('journey');
  };

  const handleJourneyComplete = () => {
    setStep('dashboard');
  };

  if (!userId) {
    return null;
  }

  if (isProfileLoading || isJourneyLoading) {
    return <div className="flex h-[calc(100vh-60px)] items-center justify-center bg-background"><Spinner /></div>;
  }

  return (
    <>
      {step !== 'dashboard' && (
        <div className="flex h-[calc(100vh-60px)] items-center justify-center bg-background">
          {step === 'profile' && (
            <ProfileCheck userId={userId} onProfileComplete={handleProfileComplete} />
          )}
          {step === 'journey' && (
            <InitialUserJourney userId={userId} onJourneyComplete={handleJourneyComplete} />
          )}
        </div>
      )}

      {step === 'dashboard' && <UserJourney />}
    </>
  );
}
