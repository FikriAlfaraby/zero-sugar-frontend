import { useQuery } from '@tanstack/react-query';

export interface UserCatalog {
    ID_CATALOG: number;
    ID_USER: number;
    NAME: string;
    AGE: number;
    SPECIALIZATION: string;
    TITLE: string;
    NIDN: number;
    EXP_YEARS: number;
    WHATSAPP: number; 
    IS_VERIFIED: boolean;
    NOTES: string;
    CREATED_AT: string; 
    UPDATED_AT: string;
    RATING: number;
}

export const useGetCatalog = () => {
  return useQuery<UserCatalog[], Error>({
    queryKey: ['catalog'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/catalog`);
      if (!response.ok) {
        throw new Error('Failed to fetch user journey');
      }
      return response.json();
    },
  });
};
