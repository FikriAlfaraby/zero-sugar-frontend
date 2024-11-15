import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import type { UserJourney } from './service/fetchUserJourney.service';

type JourneyCalendarProps = {
  completedDays: number;
  userJourney: UserJourney[];
};

export function JourneyCalendar({ completedDays, userJourney }: JourneyCalendarProps) {
  const [, setHoveredDay] = useState<number | null>(null);

  // Map each journey entry to its respective day index
  const journeyDataByDayIndex = userJourney?.reduce((acc, entry) => {
    const dayIndex = Math.ceil(
      (new Date(entry.CREATED_AT).getTime() - new Date(userJourney[0].CREATED_AT).getTime())
      / (1000 * 60 * 60 * 24),
    ) + 1; // Calculate the day difference since start
    acc[dayIndex] = entry;
    return acc;
  }, {} as Record<number, UserJourney>);

  const getDayColor = (day: number) => {
    return journeyDataByDayIndex[day] ? 'bg-green-500' : 'bg-red-100'; // Completed vs Incomplete
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold">30-Day Journey Calendar</h3>
        <div className="grid grid-cols-5 gap-2">
          {[...Array(30)].map((_, index) => {
            const day = index + 1;
            const entry = journeyDataByDayIndex[day];

            return (
              <TooltipProvider key={index}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <div
                      className={`flex size-12 cursor-pointer items-center justify-center rounded-full ${getDayColor(day)}`}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      {day}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Day
                      {' '}
                      {day}
                    </p>
                    {entry
                      ? (
                          <>
                            <p>
                              Sugar intake:
                              {' '}
                              {entry.SUGAR}
                              {' '}
                              g
                            </p>
                            <p>
                              Drink consumption:
                              {' '}
                              {entry.DRINK_CONSUMPTION}
                              {' '}
                              cups
                            </p>
                            <p>
                              Activities:
                              {' '}
                              {entry.ACTIVITIES}
                            </p>
                            <p>
                              Sleep:
                              {' '}
                              {entry.HOURS_SLEEP}
                              {' '}
                              hours
                            </p>
                            <p>
                              Sleep quality:
                              {' '}
                              {entry.SLEEP_QUALITY}
                            </p>
                            <p>
                              Smoking:
                              {' '}
                              {entry.IS_SMOKING ? 'Yes' : 'No'}
                            </p>
                            <p>
                              Stress level:
                              {' '}
                              {entry.STRESS_LEVEL}
                            </p>
                          </>
                        )
                      : (
                          <p>No data</p>
                        )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
