'use client';

import PieChartWithLegend from './pie-chart';

interface PieChartsGridProps {
  data: {
    sleep_quality: Array<{ Count: number; Sleep_Quality: string }>;
    smoking_status: Array<{ Count: number; Smoking_Status: boolean }>;
    stress_level: Array<{ Count: number; Stress_Level: string }>;
    risk_profile: Array<{ Count: number; Risk_Profile: string }>;
  };
}

export default function PieChartsGrid({ data }: PieChartsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <PieChartWithLegend
        title="Sleep Quality Distribution"
        data={data.sleep_quality}
        dataKey="Count"
        nameKey="Sleep_Quality"
      />
      <PieChartWithLegend
        title="Smoking Status Distribution"
        data={data.smoking_status}
        labelFormatter={value => (value ? 'Ya' : 'Tidak')}
        dataKey="Count"
        nameKey="Smoking_Status"
      />
      <PieChartWithLegend
        title="Stress Level Distribution"
        data={data.stress_level}
        dataKey="Count"
        nameKey="Stress_Level"
      />
      <PieChartWithLegend
        title="Risk Profile Distribution"
        data={data.risk_profile}
        dataKey="Count"
        nameKey="Risk_Profile"
      />
    </div>
  );
}
