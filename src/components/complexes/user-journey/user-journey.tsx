'use client';

import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { DailyLogForm } from './daily-log-form';
import { InsightsAndMotivation } from './insights-and-motivation';
import { JourneyCalendar } from './journey-calendar';
import { OverviewDashboard } from './overview-dashboard';
import { useUserJourney } from './service/fetchUserJourney.service';

export default function UserJourney({ userId }: { userId: number }) {
  const { data: userJourneyResponse, isLoading: isJourneyLoading } = useUserJourney(userId);

  const [completedDays, setCompletedDays] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [hasFilledToday, setHasFilledToday] = useState<boolean>(false);

  useEffect(() => {
    if (!isJourneyLoading && userJourneyResponse && userJourneyResponse.data.length) {
      const daysCompleted = userJourneyResponse.data.length;
      setCompletedDays(daysCompleted);

      let currentStreak = 1;
      const sortedJourneyDates = userJourneyResponse.data
        .map(entry => new Date(entry.CREATED_AT))
        .sort((a, b) => a.getTime() - b.getTime());

      for (let i = 1; i < sortedJourneyDates.length; i++) {
        const prevDate = sortedJourneyDates[i - 1];
        const currentDate = sortedJourneyDates[i];

        const differenceInTime = (currentDate?.getTime() ?? 0) - (prevDate?.getTime() ?? 0);
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if (differenceInDays === 1) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }
      }

      setStreak(currentStreak);

      // Check if the user has filled in the journey log for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const hasFilledToday = userJourneyResponse.data.some((entry) => {
        const entryDate = new Date(entry.CREATED_AT);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === today.getTime();
      });
      setHasFilledToday(hasFilledToday);
    }
  }, [userJourneyResponse, isJourneyLoading]);

  if (!userJourneyResponse) {
    return;
  }

  return (
    <div className="container mx-auto space-y-8 p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">Your Wellness Journey</h1>
      <OverviewDashboard completedDays={completedDays} streak={streak} />
      {hasFilledToday
        ? (
            <Alert>
              <CheckCircle className="size-4" />
              <AlertTitle>Great job!</AlertTitle>
              <AlertDescription>
                You've already filled in your journey log for today. Keep up the good work!
              </AlertDescription>
            </Alert>
          )
        : (
            <DailyLogForm userId={userId} />
          )}
      <JourneyCalendar userJourney={userJourneyResponse?.data ?? []} completedDays={completedDays} />
      <InsightsAndMotivation completedDays={completedDays} />
    </div>
  );
}
