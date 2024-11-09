'use client';

import { AlertCircle, TrendingUp } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';

export function AnalysisInsights() {
  const insights = [
    { type: 'recommendation', text: 'Consider reducing your sugar intake by 10% this week.' },
    { type: 'trend', text: 'Your salt consumption has increased by 15% compared to last month.' },
    { type: 'recommendation', text: 'Try to increase your water intake to 8 glasses a day.' },
    { type: 'trend', text: 'Great job! Your fat intake has decreased by 5% this month.' },
  ];

  return (
    <ScrollArea className="h-[350px] w-full rounded-md border px-4 py-5">
      {insights.map((insight, index) => (
        <div key={index} className="flex items-center space-x-2">
          {insight.type === 'recommendation'
            ? (
                <AlertCircle className="size-5 text-yellow-500" />
              )
            : (
                <TrendingUp className="size-5 text-blue-500" />
              )}
          <p className="text-sm">{insight.text}</p>
        </div>
      ))}
    </ScrollArea>
  );
}
