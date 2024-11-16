import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MostCardsProps {
  mostData: {
    mode_sleep_quality: string;
    mode_is_smoking: boolean;
    mode_stress_level: string;
    mode_risk_profile: string;
  };
}

export default function MostCards({ mostData }: MostCardsProps) {
  const { mode_sleep_quality, mode_is_smoking, mode_stress_level, mode_risk_profile } = mostData;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Most Sleep Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{mode_sleep_quality}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Most Smoking Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mode_is_smoking ? 'Yes' : 'No'}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Most Stress Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{mode_stress_level}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Most Risk Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">{mode_risk_profile}</div>
        </CardContent>
      </Card>
    </div>
  );
}
