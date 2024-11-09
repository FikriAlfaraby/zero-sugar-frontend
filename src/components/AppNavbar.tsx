import { SignOutButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from './LocaleSwitcher';
import { SidebarTrigger } from './ui/sidebar';

const AppNavbar = () => {
  const t = useTranslations('DashboardLayout');

  return (
    <div className="sticky top-4 z-50 my-2 flex h-fit flex-1 items-center justify-between border bg-sidebar p-2">
      <SidebarTrigger />
      <div className="flex items-center space-x-4">
        <LocaleSwitcher />
        <SignOutButton>
          <button className="border-none text-gray-700 hover:text-gray-900" type="button">
            {t('sign_out')}
          </button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default AppNavbar;
