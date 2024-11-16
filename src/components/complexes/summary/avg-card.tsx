import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AverageCardsProps {
  avgData: {
    avg_sugar: number;
    avg_drink_consumption: number;
    avg_activities: number;
    avg_hours_sleep: number;
  };
}

export default function AverageCards({ avgData }: AverageCardsProps) {


  const { avg_sugar, avg_drink_consumption, avg_activities, avg_hours_sleep } = avgData;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">AVG Sugar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avg_sugar.toFixed(1)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">AVG Drink</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avg_drink_consumption.toFixed(1)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">AVG Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avg_activities.toFixed(1)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">AVG Sleep Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avg_hours_sleep.toFixed(1)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
