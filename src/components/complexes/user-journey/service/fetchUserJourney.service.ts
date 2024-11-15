import { useQuery } from '@tanstack/react-query';

export type UserJourneyResponse = {
  data: UserJourney[];
  isEnd: boolean;
};

export type UserJourney = {
  ID_JOURNEY: number;
  ID_USER: number;
  SUGAR: number;
  DRINK_CONSUMPTION: number;
  ACTIVITIES: number;
  HOURS_SLEEP: number;
  SLEEP_QUALITY: string;
  IS_SMOKING: boolean;
  STRESS_LEVEL: string;
  RISK_PROFILE: string;
  CREATED_AT: Date;
  UPDATED_AT: Date;
};

export const useUserJourney = (userId: number) => {
  return useQuery<UserJourneyResponse, Error>({
    queryKey: ['userJourney', userId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/journey/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user journey');
      }
      return response.json();
    },
  });
};
