import { useQuery } from '@tanstack/react-query';

export const useGetCatalog = () => {
  return useQuery<any, Error>({
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
