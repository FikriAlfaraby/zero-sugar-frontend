import { getTranslations } from 'next-intl/server';

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

const Dashboard = () => {
  return (
    <div className="[&_p]:my-6">
      <DashboardAnalytic />
    </div>
  );
};

export default Dashboard;
