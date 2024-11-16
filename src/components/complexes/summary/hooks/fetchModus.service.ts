import { useQuery } from '@tanstack/react-query';

export interface AvgModus {
    mode_is_smoking: boolean
    mode_risk_profile: string
    mode_sleep_quality: string
    mode_stress_level: string
    user_id: number
}


export const useModusSummary = (userId: number) => {
  return useQuery<AvgModus, Error>({
    queryKey: ['modus', userId],
    queryFn: async () => {
      console.log(userId)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/mode_card/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch avg');
      }
      return response.json();
    },
    staleTime: 0, // Query selalu dianggap usang
    refetchOnMount: 'always', // Selalu ambil data baru saat komponen dipasang
  });
};
