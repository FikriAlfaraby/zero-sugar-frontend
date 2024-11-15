'use client';

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import PieChartWithLegend from './PieChart';

// Custom colors for better visualization
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
} satisfies ChartConfig;

type DataProps = {
  userId: number;
  lineChartData: {
    user_id: number;
    data: {
      SUGAR: Array<{ Count: number; Date: string }>;
      DRINK_CONSUMPTION: Array<{ Count: number; Date: string }>;
      ACTIVITIES: Array<{ Count: number; Date: string }>;
      HOURS_SLEEP: Array<{ Count: number; Date: string }>;
    };
  };
  pieChartData: {
    data: {
      risk_profile: Array<{ Count: number; Risk_Profile: string }>;
      sleep_quality: Array<{ Count: number; Sleep_Quality: string }>;
      smoking_status: Array<{ Count: number; Smoking_Status: boolean }>;
      stress_level: Array<{ Count: number; Stress_Level: string }>;
    };
    user_id: number;
  };
  lastData: {
    mode_is_smoking: boolean;
    mode_risk_profile: string;
    mode_sleep_quality: string;
    mode_stress_level: string;
    user_id: number;
  };
  averageData: {
    avg_activities: number;
    avg_drink_consumption: number;
    avg_hours_sleep: number;
    avg_sugar: number;
    user_id: number;
  };
};

export default function Component({ lineChartData, pieChartData, lastData, averageData, userId }: DataProps) {
  const [selectedMetric, setSelectedMetric] = useState('ACTIVITIES');

  const formatLineChartData = () => {
    return lineChartData.data[selectedMetric as keyof typeof lineChartData.data].map(item => ({
      date: new Date(item.Date).toLocaleDateString(),
      value: item.Count,
    }));
  };

  return (
    <div className="space-y-6 p-4">
      {/* Average Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AVG Sugar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageData.avg_sugar.toFixed(1)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AVG Drink</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageData.avg_drink_consumption.toFixed(1)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AVG Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageData.avg_activities.toFixed(1)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AVG Sleep Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageData.avg_hours_sleep.toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Most Records Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Sleep Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{lastData.mode_sleep_quality}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Smoking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastData.mode_is_smoking ? 'Yes' : 'No'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Stress Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{lastData.mode_stress_level}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Risk Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{lastData.mode_risk_profile}</div>
          </CardContent>
        </Card>
      </div>

      {/* Area Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Trends Over Time</CardTitle>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVITIES">Activities</SelectItem>
                <SelectItem value="DRINK_CONSUMPTION">Drink Consumption</SelectItem>
                <SelectItem value="HOURS_SLEEP">Hours Sleep</SelectItem>
                <SelectItem value="SUGAR">Sugar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="w-full p-2">
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formatLineChartData()} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <YAxis
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie Charts Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Sleep Quality Pie Chart */}
        <PieChartWithLegend
          title="Sleep Quality Distribution"
          data={pieChartData.data.sleep_quality}
          dataKey="Count"
          nameKey="Sleep_Quality"
        />
        <PieChartWithLegend
          title="Smoking Status Distribution"
          data={pieChartData.data.smoking_status}
          labelFormatter={value => (value ? 'Ya' : 'Tidak')}
          dataKey="Count"
          nameKey="Smoking_Status"
        />
        <PieChartWithLegend
          title="Stress Level Distribution"
          data={pieChartData.data.stress_level}
          dataKey="Count"
          nameKey="Stress_Level"
        />
        <PieChartWithLegend
          title="Risk Profile Distribution"
          data={pieChartData.data.risk_profile}
          dataKey="Count"
          nameKey="Risk_Profile"
        />

      </div>
    </div>
  );
}
