import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type HealthSummary = {
  avgSugarIntake: number;
  avgSleepQuality: string;
};

type OverviewDashboardProps = {
  completedDays: number;
  streak: number;
  healthSummary: HealthSummary;
};

export function OverviewDashboard({ completedDays, streak, healthSummary }: OverviewDashboardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(completedDays / 30) * 100} className="w-full" />
          <p className="mt-2 text-center">
            You've completed
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
            {streak}
            {' '}
            days
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Avg. Sugar Intake:
            {healthSummary.avgSugarIntake.toFixed(2)}
            {' '}
            g
          </p>
          <p>
            Avg. Sleep Quality:
            {healthSummary.avgSleepQuality}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
