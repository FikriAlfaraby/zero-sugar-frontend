import { useQuery } from '@tanstack/react-query';

export interface PieChartResonse {
  data: Data
  user_id: number
}

export interface Data {
  risk_profile: RiskProfile[]
  sleep_quality: SleepQuality[]
  smoking_status: Status[]
  stress_level: StressLevel[]
}

export interface RiskProfile {
  Count: number
  Risk_Profile: string
}

export interface SleepQuality {
  Count: number
  Sleep_Quality: string
}

export interface Status {
  Count: number
  Smoking_Status: boolean
}

export interface StressLevel {
  Count: number
  Stress_Level: string
}


export const usePieChartSummary = (userId: number) => {
  return useQuery<PieChartResonse, Error>({
    queryKey: ['modus', userId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/get_data_pie/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to pie chart');
      }
      return response.json();
    },
  });
};
