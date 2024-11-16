import { useQuery } from '@tanstack/react-query';

export interface LineChartResponse {
  data: {
    [key: string]: Array<{ Date: string; Count: number }>;
  };
  user_id: number
}

export interface Data {
  ACTIVITIES: Activities[]
  DRINK_CONSUMPTION: DrinkConsumption[]
  HOURS_SLEEP: HoursSleep[]
  SUGAR: Sugar[]
}

export interface Activities {
  Count: number
  Date: string
}

export interface DrinkConsumption {
  Count: number
  Date: string
}

export interface HoursSleep {
  Count: number
  Date: string
}

export interface Sugar {
  Count: number
  Date: string
}

export const useLineChartSummary = (userId: number) => {
  return useQuery<LineChartResponse, Error>({
    queryKey: ['line', userId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/linechart_summary/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch line chart');
      }
      return response.json();
    },
  });
};
