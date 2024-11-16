import Feedback from '@/components/complexes/feedback/Feedback';
import { currentUser } from '@clerk/nextjs/server';
import { getTranslations } from 'next-intl/server';


export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Feedback',
  });

  return {
    title: t('meta_title'),
  };
}

const page = async () => {
  const user = await currentUser();

  return (
    <Feedback userId={user?.publicMetadata.id_user as number} />
  );
};

export default page;
