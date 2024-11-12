import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type OverviewDashboardProps = {
  completedDays: number;
  streak: number;
};

export function OverviewDashboard({ completedDays, streak }: OverviewDashboardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(completedDays / 30) * 100} className="w-full" />
          <p className="mt-2 text-center">
            You've completed
            {' '}
            {completedDays}
            {' '}
            out of 30 days.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-4xl font-bold">{streak}</p>
          <p className="text-center">
            Current streak:
            {' '}
            {streak}
            {' '}
            days
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
