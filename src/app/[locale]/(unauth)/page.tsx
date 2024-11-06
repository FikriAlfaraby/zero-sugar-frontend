import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import LandingPage from '@/components/LandingPage';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const Index = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <LandingPage />
  );
};

export default Index;
