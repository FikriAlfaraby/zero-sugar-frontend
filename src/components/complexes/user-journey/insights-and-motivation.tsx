import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type InsightsAndMotivationProps = {
  completedDays: number;
};

export function InsightsAndMotivation({ completedDays }: InsightsAndMotivationProps) {
  const getMilestoneMessage = (): string | null => {
    if (completedDays === 10) {
      return 'Congratulations on reaching Day 10! You\'re building great habits.';
    }
    if (completedDays === 20) {
      return 'Amazing progress! You\'ve completed 20 days. Keep pushing forward!';
    }
    if (completedDays === 30) {
      return 'You did it! 30 days completed. You\'ve made significant strides in your wellness journey.';
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {getMilestoneMessage() && (
        <Card>
          <CardHeader>
            <CardTitle>Milestone Achieved!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{getMilestoneMessage()}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
