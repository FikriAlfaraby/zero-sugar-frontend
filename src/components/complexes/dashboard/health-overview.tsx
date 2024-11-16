'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUserJourney } from '../user-journey/service/fetchUserJourney.service';

// Helper function to convert to GMT+7
const getTodayInGMT7 = () => {
  const now = new Date();
  const gmt7 = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);

  // Format date to YYYY-MM-DD
  const [month, day, year] = gmt7.split('/');
  return `${year}-${month}-${day}`;
};

export function HealthOverview({userId} : {userId : number}) {
    const { data} = useUserJourney(userId);

  const today = getTodayInGMT7();

  // Filter data berdasarkan tanggal hari ini
  const todayData = data ?
  data.data.find((entry) => entry.CREATED_AT === today) || {
    CREATED_AT: '',
    SUGAR: 0,
    DRINK_CONSUMPTION: 0,
    RISK_PROFILE: 'Belum Ada',
  } : {
    CREATED_AT: '',
    SUGAR: 0,
    DRINK_CONSUMPTION: 0,
    RISK_PROFILE: 'Belum Ada',
  };

  const isDataAvailable = todayData.CREATED_AT === today;


  return (
    <div className="space-y-4">
      {!isDataAvailable && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="border-l-4 border-red-500 bg-red-50 text-red-800 shadow">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <div>
                <AlertTitle className="text-lg font-bold">
                  Data Tidak Ditemukan
                </AlertTitle>
                <AlertDescription className="mt-2 text-sm">
                  <div className='flex items-center space-x-1'>
                    <div className='h-fit'>Belum ada data untuk hari ini.</div>
                    <Link href="/dashboard/user-journey">
                      <Button className="px-0 h-fit py-0 text-sm text-red-800" variant="link">
                        Klik Untuk Mengisi!
                      </Button>
                    </Link>
                
                  </div>
                  
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Sugar Intake
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{todayData.SUGAR} g</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Konsumsi gula Anda hari ini.
            </p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Drink Consumption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                {(todayData.DRINK_CONSUMPTION / 4).toFixed(1)} L
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Asupan cairan Anda hari ini.
            </p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Risk Profile
            </CardTitle>
          </CardHeader>
          <CardContent className='flex items-center'>
            <span className="md:text-2xl text-lg font-bold text-teal-500">
              {todayData.RISK_PROFILE}
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
