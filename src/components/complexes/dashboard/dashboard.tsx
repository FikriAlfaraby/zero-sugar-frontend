'use client';

import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Reminders } from './reminder';
import { ConsumptionHistory } from './consumption-history';
import { HealthOverview } from './health-overview';
import { Spinner } from '@/components/ui/spinner';
import { useUserJourney } from '../user-journey/service/fetchUserJourney.service';

export function DashboardAnalytic({username, userId} : {username: string; userId : number} ) {
  const { isLoading: isJourneyLoading } = useUserJourney(userId);
  const t = useTranslations();
  
  if (isJourneyLoading) {
    return (
      <div className="flex h-[calc(100vh-60px)] items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }


  return (
    <div className="flex-col md:flex">
      {/* Header */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h2 className="text-lg font-semibold">{t('dashboardTitle')}</h2>
        </div>
      </div>

      {/* Alert */}
      <div className="p-4">
        <Alert className="border-l-4 border-teal-500 bg-teal-50 text-teal-900 shadow-sm">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-teal-500 mt-1" />
            <div>
              <AlertTitle className="text-xl font-bold">
                Selamat Datang di ZeroSugar!
              </AlertTitle>
              <AlertDescription className="mt-2 text-sm leading-relaxed">
                Hai, <span className="font-medium">{username || 'Pengguna'}</span>! Senang sekali Anda bergabung dengan kami.
                Pantau konsumsi gula harian Anda dengan mudah dan raih hidup yang lebih sehat bersama ZeroSugar.
                <br />
                <span className="block mt-2">
                  Yuk, mulai perjalanan Anda menuju gaya hidup sehat yang lebih baik sekarang juga!
                </span>
                <span className="block mt-4 italic text-gray-700">
                  “ZeroSugar, solusi cerdas untuk gaya hidup bebas gula berlebih.”
                </span>
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </div>


      {/* Main Dashboard Content */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HealthOverview userId={userId} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>{t('cardTitles.consumptionHistory')}</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ConsumptionHistory userId={userId} />
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle>{t('cardTitles.analysisInsights')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Reminders />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
