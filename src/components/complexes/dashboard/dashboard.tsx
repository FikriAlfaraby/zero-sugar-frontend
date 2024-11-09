'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { AnalysisInsights } from './analysis-insights';
import { ConsumptionHistory } from './consumption-history';
import { DietaryGuide } from './dietary-guide';
import { HealthOverview } from './health-overview';

export function DashboardAnalytic() {
  const t = useTranslations();
  const [selectedPeriod, setSelectedPeriod] = useState(t('periodOptions.today'));

  console.log(selectedPeriod);

  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h2 className="text-lg font-semibold">{t('dashboardTitle')}</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {selectedPeriod}
                {' '}
                <ChevronDown className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {['today', 'week', 'month', 'year'].map(period => (
                <DropdownMenuItem
                  key={period}
                  onSelect={() => setSelectedPeriod(t(`periodOptions.${period}`))}
                >
                  {t(`periodOptions.${period}`)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('tabs.analytics')}</TabsTrigger>
            <TabsTrigger value="reports">{t('tabs.reports')}</TabsTrigger>
            <TabsTrigger value="notifications">{t('tabs.notifications')}</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <HealthOverview />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>{t('cardTitles.consumptionHistory')}</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ConsumptionHistory />
                </CardContent>
              </Card>
              <Card className="col-span-4 lg:col-span-3">
                <CardHeader>
                  <CardTitle>{t('cardTitles.analysisInsights')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnalysisInsights />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>{t('cardTitles.dietaryGuide')}</CardTitle>
            </CardHeader>
            <CardContent>
              <DietaryGuide />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
