import { currentUser } from '@clerk/nextjs/server';

import Summary from '@/components/complexes/summary/Summary';

const mockLineChartData = {
  data: {
    ACTIVITIES: [
      {
        Count: 12.0,
        Date: '2024-11-13',
      },
      {
        Count: 0,
        Date: '2024-11-14',
      },
      {
        Count: 3.0,
        Date: '2024-11-15',
      },
      {
        Count: 0,
        Date: '2024-11-16',
      },
      {
        Count: 0,
        Date: '2024-11-17',
      },
      {
        Count: 0,
        Date: '2024-11-18',
      },
      {
        Count: 0,
        Date: '2024-11-19',
      },
      {
        Count: 0,
        Date: '2024-11-20',
      },
      {
        Count: 0,
        Date: '2024-11-21',
      },
      {
        Count: 0,
        Date: '2024-11-22',
      },
      {
        Count: 0,
        Date: '2024-11-23',
      },
      {
        Count: 0,
        Date: '2024-11-24',
      },
      {
        Count: 0,
        Date: '2024-11-25',
      },
      {
        Count: 0,
        Date: '2024-11-26',
      },
      {
        Count: 0,
        Date: '2024-11-27',
      },
      {
        Count: 0,
        Date: '2024-11-28',
      },
      {
        Count: 0,
        Date: '2024-11-29',
      },
      {
        Count: 0,
        Date: '2024-11-30',
      },
      {
        Count: 0,
        Date: '2024-12-01',
      },
      {
        Count: 0,
        Date: '2024-12-02',
      },
      {
        Count: 0,
        Date: '2024-12-03',
      },
      {
        Count: 0,
        Date: '2024-12-04',
      },
      {
        Count: 0,
        Date: '2024-12-05',
      },
      {
        Count: 0,
        Date: '2024-12-06',
      },
      {
        Count: 0,
        Date: '2024-12-07',
      },
      {
        Count: 0,
        Date: '2024-12-08',
      },
      {
        Count: 0,
        Date: '2024-12-09',
      },
      {
        Count: 0,
        Date: '2024-12-10',
      },
      {
        Count: 1.0,
        Date: '2024-12-11',
      },
      {
        Count: 1.0,
        Date: '2024-12-12',
      },
      {
        Count: 0,
        Date: '2024-12-13',
      },
    ],
    DRINK_CONSUMPTION: [
      {
        Count: 12.0,
        Date: '2024-11-13',
      },
      {
        Count: 0,
        Date: '2024-11-14',
      },
      {
        Count: 1.0,
        Date: '2024-11-15',
      },
      {
        Count: 0,
        Date: '2024-11-16',
      },
      {
        Count: 0,
        Date: '2024-11-17',
      },
      {
        Count: 0,
        Date: '2024-11-18',
      },
      {
        Count: 0,
        Date: '2024-11-19',
      },
      {
        Count: 0,
        Date: '2024-11-20',
      },
      {
        Count: 0,
        Date: '2024-11-21',
      },
      {
        Count: 0,
        Date: '2024-11-22',
      },
      {
        Count: 0,
        Date: '2024-11-23',
      },
      {
        Count: 0,
        Date: '2024-11-24',
      },
      {
        Count: 0,
        Date: '2024-11-25',
      },
      {
        Count: 0,
        Date: '2024-11-26',
      },
      {
        Count: 0,
        Date: '2024-11-27',
      },
      {
        Count: 0,
        Date: '2024-11-28',
      },
      {
        Count: 0,
        Date: '2024-11-29',
      },
      {
        Count: 0,
        Date: '2024-11-30',
      },
      {
        Count: 0,
        Date: '2024-12-01',
      },
      {
        Count: 0,
        Date: '2024-12-02',
      },
      {
        Count: 0,
        Date: '2024-12-03',
      },
      {
        Count: 0,
        Date: '2024-12-04',
      },
      {
        Count: 0,
        Date: '2024-12-05',
      },
      {
        Count: 0,
        Date: '2024-12-06',
      },
      {
        Count: 0,
        Date: '2024-12-07',
      },
      {
        Count: 0,
        Date: '2024-12-08',
      },
      {
        Count: 0,
        Date: '2024-12-09',
      },
      {
        Count: 0,
        Date: '2024-12-10',
      },
      {
        Count: 3.0,
        Date: '2024-12-11',
      },
      {
        Count: 3.0,
        Date: '2024-12-12',
      },
      {
        Count: 0,
        Date: '2024-12-13',
      },
    ],
    HOURS_SLEEP: [
      {
        Count: 2.0,
        Date: '2024-11-13',
      },
      {
        Count: 0,
        Date: '2024-11-14',
      },
      {
        Count: 2.0,
        Date: '2024-11-15',
      },
      {
        Count: 0,
        Date: '2024-11-16',
      },
      {
        Count: 0,
        Date: '2024-11-17',
      },
      {
        Count: 0,
        Date: '2024-11-18',
      },
      {
        Count: 0,
        Date: '2024-11-19',
      },
      {
        Count: 0,
        Date: '2024-11-20',
      },
      {
        Count: 0,
        Date: '2024-11-21',
      },
      {
        Count: 0,
        Date: '2024-11-22',
      },
      {
        Count: 0,
        Date: '2024-11-23',
      },
      {
        Count: 0,
        Date: '2024-11-24',
      },
      {
        Count: 0,
        Date: '2024-11-25',
      },
      {
        Count: 0,
        Date: '2024-11-26',
      },
      {
        Count: 0,
        Date: '2024-11-27',
      },
      {
        Count: 0,
        Date: '2024-11-28',
      },
      {
        Count: 0,
        Date: '2024-11-29',
      },
      {
        Count: 0,
        Date: '2024-11-30',
      },
      {
        Count: 0,
        Date: '2024-12-01',
      },
      {
        Count: 0,
        Date: '2024-12-02',
      },
      {
        Count: 0,
        Date: '2024-12-03',
      },
      {
        Count: 0,
        Date: '2024-12-04',
      },
      {
        Count: 0,
        Date: '2024-12-05',
      },
      {
        Count: 0,
        Date: '2024-12-06',
      },
      {
        Count: 0,
        Date: '2024-12-07',
      },
      {
        Count: 0,
        Date: '2024-12-08',
      },
      {
        Count: 0,
        Date: '2024-12-09',
      },
      {
        Count: 0,
        Date: '2024-12-10',
      },
      {
        Count: 3.0,
        Date: '2024-12-11',
      },
      {
        Count: 3.0,
        Date: '2024-12-12',
      },
      {
        Count: 0,
        Date: '2024-12-13',
      },
    ],
    SUGAR: [
      {
        Count: 12.0,
        Date: '2024-11-13',
      },
      {
        Count: 0,
        Date: '2024-11-14',
      },
      {
        Count: 31.0,
        Date: '2024-11-15',
      },
      {
        Count: 0,
        Date: '2024-11-16',
      },
      {
        Count: 0,
        Date: '2024-11-17',
      },
      {
        Count: 0,
        Date: '2024-11-18',
      },
      {
        Count: 0,
        Date: '2024-11-19',
      },
      {
        Count: 0,
        Date: '2024-11-20',
      },
      {
        Count: 0,
        Date: '2024-11-21',
      },
      {
        Count: 0,
        Date: '2024-11-22',
      },
      {
        Count: 0,
        Date: '2024-11-23',
      },
      {
        Count: 0,
        Date: '2024-11-24',
      },
      {
        Count: 0,
        Date: '2024-11-25',
      },
      {
        Count: 0,
        Date: '2024-11-26',
      },
      {
        Count: 0,
        Date: '2024-11-27',
      },
      {
        Count: 0,
        Date: '2024-11-28',
      },
      {
        Count: 0,
        Date: '2024-11-29',
      },
      {
        Count: 0,
        Date: '2024-11-30',
      },
      {
        Count: 0,
        Date: '2024-12-01',
      },
      {
        Count: 0,
        Date: '2024-12-02',
      },
      {
        Count: 0,
        Date: '2024-12-03',
      },
      {
        Count: 0,
        Date: '2024-12-04',
      },
      {
        Count: 0,
        Date: '2024-12-05',
      },
      {
        Count: 0,
        Date: '2024-12-06',
      },
      {
        Count: 0,
        Date: '2024-12-07',
      },
      {
        Count: 0,
        Date: '2024-12-08',
      },
      {
        Count: 0,
        Date: '2024-12-09',
      },
      {
        Count: 0,
        Date: '2024-12-10',
      },
      {
        Count: 2.0,
        Date: '2024-12-11',
      },
      {
        Count: 2.0,
        Date: '2024-12-12',
      },
      {
        Count: 0,
        Date: '2024-12-13',
      },
    ],
  },
  user_id: 228,
};

const mockPieChartData = {
  data: {
    risk_profile: [
      { Count: 2, Risk_Profile: 'low' },
      { Count: 0, Risk_Profile: 'moderate' },
      { Count: 0, Risk_Profile: 'high' },
    ],
    sleep_quality: [
      { Count: 1, Sleep_Quality: 'average' },
      { Count: 1, Sleep_Quality: 'poor' },
      { Count: 0, Sleep_Quality: 'good' },
    ],
    smoking_status: [
      { Count: 1, Smoking_Status: true },
      { Count: 1, Smoking_Status: false },
    ],
    stress_level: [
      { Count: 2, Stress_Level: 'low' },
      { Count: 0, Stress_Level: 'medium' },
      { Count: 0, Stress_Level: 'high' },
    ],
  },
  user_id: 228,
};

const mockLastData = {
  mode_is_smoking: false,
  mode_risk_profile: 'low',
  mode_sleep_quality: 'average',
  mode_stress_level: 'low',
  user_id: 228,
};

const mockAverageData = {
  avg_activities: 6.5,
  avg_drink_consumption: 7.5,
  avg_hours_sleep: 2.5,
  avg_sugar: 7.0,
  user_id: 228,
};
const page = async () => {
  const user = await currentUser();

  return (
    <Summary
      lineChartData={mockLineChartData}
      pieChartData={mockPieChartData}
      lastData={mockLastData}
      averageData={mockAverageData}
      userId={user?.publicMetadata.id_user as number}
    />
  );
};

export default page;
