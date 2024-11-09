'use client';

import { useState } from 'react';

import { DailyLogForm } from './daily-log-form';
import { InsightsAndMotivation } from './insights-and-motivation';
import { JourneyCalendar } from './journey-calendar';
import { OverviewDashboard } from './overview-dashboard';

type HealthSummary = {
  avgSugarIntake: number;
  avgSleepQuality: string;
};

export default function UserJourney() {
  const [completedDays, setCompletedDays] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [healthSummary, setHealthSummary] = useState<HealthSummary>({
    avgSugarIntake: 0,
    avgSleepQuality: 'Average',
  });

  const handleDailyLogSubmit = (data: { sugarIntake: number; sleepQuality: string }) => {
    setCompletedDays(prev => Math.min(prev + 1, 30));
    setStreak(prev => prev + 1);
    setHealthSummary(prev => ({
      avgSugarIntake: (prev.avgSugarIntake + data.sugarIntake) / 2,
      avgSleepQuality: data.sleepQuality,
    }));
  };

  return (
    <div className="container mx-auto space-y-8 p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">Your Wellness Journey</h1>
      <OverviewDashboard completedDays={completedDays} streak={streak} healthSummary={healthSummary} />
      <DailyLogForm onSubmit={handleDailyLogSubmit} />
      <JourneyCalendar completedDays={completedDays} />
      <InsightsAndMotivation completedDays={completedDays} healthSummary={healthSummary} />
    </div>
  );
}
