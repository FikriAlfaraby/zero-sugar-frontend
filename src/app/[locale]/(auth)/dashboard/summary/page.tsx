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

const page = async () => {
  const user = await currentUser();

  return (
    <Summary
      userId={user?.publicMetadata.id_user as number}
    />
  );
};

export default page;
