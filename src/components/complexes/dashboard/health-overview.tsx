'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function HealthOverview() {
  const nutrients = [
    { name: 'Sugar', current: 45, limit: 50, status: 'normal' },
    { name: 'Salt', current: 5, limit: 6, status: 'warning' },
    { name: 'Fat', current: 55, limit: 65, status: 'normal' },
  ];

  return (
    <>
      {nutrients.map(nutrient => (
        <Card key={nutrient.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {nutrient.name}
              {' '}
              Intake
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="size-4 text-muted-foreground"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nutrient.current}
              g
            </div>
            <p className="text-xs text-muted-foreground">
              of
              {' '}
              {nutrient.limit}
              g daily limit
            </p>
            <Progress
              value={(nutrient.current / nutrient.limit) * 100}
              className="mt-2"
            />
            <p className={`mt-2 text-xs ${
              nutrient.status === 'normal' ? 'text-green-500' : 'text-yellow-500'
            }`}
            >
              {nutrient.status === 'normal' ? 'Within safe limits' : 'Approaching limit'}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
