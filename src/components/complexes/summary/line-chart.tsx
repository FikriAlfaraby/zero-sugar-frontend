'use client';

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

export interface LineChartProps {
  data: {
    [key: string]: Array<{ Date: string; Count: number }>;
  };
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
} satisfies ChartConfig;


export default function LineChart({ data }: LineChartProps) {
  const [selectedMetric, setSelectedMetric] = useState('ACTIVITIES');

  const formattedData = data[selectedMetric]?.map(item => ({
    date: new Date(item.Date).toLocaleDateString(),
    value: item.Count,
  }));

  return (
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
            <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="20%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
              <YAxis stroke="hsl(var(--foreground))" tick={{ fill: 'hsl(var(--foreground))' }} />
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
  );
}
