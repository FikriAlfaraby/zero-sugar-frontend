import AppNavbar from '@/components/AppNavbar';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-2">
        <AppNavbar />
        {props.children}
      </main>
    </SidebarProvider>
  );
}
