import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function InsightsAndMotivation({ completedDays, healthSummary }) {
  const getWeeklyInsight = () => {
    if (healthSummary.avgSugarIntake > 50) {
      return 'Your average sugar intake was high last week. Try reducing sugary drinks and snacks.';
    }
    return 'Great job maintaining a low sugar intake! Keep up the good work.';
  };

  const getMilestoneMessage = () => {
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
      <Card>
        <CardHeader>
          <CardTitle>Weekly Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{getWeeklyInsight()}</p>
        </CardContent>
      </Card>
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
