import { SignOutButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { SidebarTrigger } from './ui/sidebar';

const AppNavbar = () => {
  const t = useTranslations('DashboardLayout');
  
  return (
    <div className="my-2 flex h-fit flex-1 items-center justify-between border bg-sidebar p-2">
      <SidebarTrigger />
      <SignOutButton>
        <button className="border-none text-gray-700 hover:text-gray-900" type="button">
          {t('sign_out')}
        </button>
      </SignOutButton>
    </div>
  );
};

export default AppNavbar;
