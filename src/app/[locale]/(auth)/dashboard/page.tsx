import { getTranslations } from 'next-intl/server';
import { currentUser } from '@clerk/nextjs/server';

import { DashboardAnalytic } from '@/components/complexes/dashboard/dashboard';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

const Dashboard = async () => {
    const user = await currentUser();

  return (
    <div className="[&_p]:my-6">
      <DashboardAnalytic username={user?.firstName ?? 'User'} userId={user?.publicMetadata.id_user as number} />
    </div>
  );
};

export default Dashboard;
