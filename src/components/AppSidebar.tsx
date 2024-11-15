'use client';

import type { LucideIcon } from 'lucide-react';
import { BookOpen, Home, MessageSquare, Navigation, PieChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

type MenuItemId = 'dashboard' | 'userJourney' | 'katalogAhli' | 'summary' | 'feedback';

const items: { id: MenuItemId; url: string; icon: LucideIcon }[] = [
  { id: 'dashboard', url: '/dashboard', icon: Home },
  { id: 'userJourney', url: '/dashboard/user-journey', icon: Navigation },
  { id: 'katalogAhli', url: '/dashboard/catalog', icon: BookOpen },
  { id: 'summary', url: '/dashboard/summary', icon: PieChart },
  { id: 'feedback', url: '/dashboard/feedback', icon: MessageSquare },
];

export function AppSidebar() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('RootLayout');

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('application')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === `/${locale}${item.url}` || pathname === item.url;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton size="default" asChild isActive={isActive}>
                      <Link href={`/${locale}${item.url}`} className="flex items-center gap-3">
                        <item.icon className="size-4" />
                        <span>{t(`${item.id}`)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
