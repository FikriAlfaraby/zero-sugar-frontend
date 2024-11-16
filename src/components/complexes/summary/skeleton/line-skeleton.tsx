'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LineChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="w-1/3 h-6 bg-muted animate-pulse rounded"></CardTitle>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Loading..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder">Placeholder</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="w-full p-2">
        <div className="h-[400px] w-full animate-pulse bg-muted rounded"></div>
      </CardContent>
    </Card>
  );
}
