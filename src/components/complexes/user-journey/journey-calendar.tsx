import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type JourneyCalendarProps = {
  completedDays: number;
};

export function JourneyCalendar({ completedDays }: JourneyCalendarProps) {
  const [, setHoveredDay] = useState<number | null>(null);

  const getDayColor = (day: number) => {
    if (day > completedDays) {
      return 'bg-gray-200';
    }
    return 'bg-green-500';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold">30-Day Journey Calendar</h3>
        <div className="grid grid-cols-5 gap-2">
          {[...Array(30)].map((_, index) => (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div
                    className={`flex size-12 cursor-pointer items-center justify-center rounded-full ${getDayColor(index + 1)}`}
                    onMouseEnter={() => setHoveredDay(index + 1)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {index + 1}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Day
                    {index + 1}
                  </p>
                  {index < completedDays && (
                    <>
                      <p>Sugar intake: 100 g</p>
                      <p>Sleep: 4 hours</p>
                    </>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
