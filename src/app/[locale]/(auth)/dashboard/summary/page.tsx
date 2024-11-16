import { currentUser } from '@clerk/nextjs/server';

import Summary from '@/components/complexes/summary/Summary';
import { getTranslations } from 'next-intl/server';


export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Summary',
  });

  return {
    title: t('meta_title'),
  };
}

const fetchModus = async (userId : number) => {
  try {
    // Call the API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL2}/mode_card/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data for userId: ${userId}`);
    }

    const data = await response.json();

    return data
   
  } catch (error) {
    console.error('Error fetching modus data:', error);
  }
}

const page = async () => {
  const user = await currentUser();
  const data = await fetchModus(user?.publicMetadata.id_user as number)

  return (
    <Summary
      mostData={data}
      userId={user?.publicMetadata.id_user as number}
    />
  );
};

export default page;
