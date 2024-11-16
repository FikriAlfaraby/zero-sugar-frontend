import { currentUser } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';

import OnboardingFlow from '@/components/complexes/user-journey/on-boarding/on-boarding-flow';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'UserJourney',
  });

  return {
    title: t('meta_title'),
  };
}

const page = async () => {
  const user = await currentUser();

  return (
    <OnboardingFlow userId={user?.publicMetadata.id_user as number} />
  );
};

export default page;
