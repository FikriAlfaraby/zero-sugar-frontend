import { useQuery } from '@tanstack/react-query';

export interface AvgResonse {
  avg_activities: number
  avg_drink_consumption: number
  avg_hours_sleep: number
  avg_sugar: number
  user_id: number
}

export const useAvgSummary = (userId: number) => {
  return useQuery<AvgResonse, Error>({
    queryKey: ['avg', userId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/avg_card_summary/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch avg');
      }
      return response.json();
    },
  });
};
