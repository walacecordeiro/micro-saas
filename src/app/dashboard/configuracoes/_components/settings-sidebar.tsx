"use client";

import {
 DashboardSidebarMain,
 DashboardSidebarNavLink,
 DashboardSidebarNav,
} from "@/components/dashboard/sidebar";
import { usePathname } from "next/navigation";

export function SettingsSidebar() {
 const pathName = usePathname();

 const isActive = (path: string) => {
  return pathName === path;
 };

 return (
  <aside>
   <DashboardSidebarNav>
    <DashboardSidebarMain>
     <DashboardSidebarNavLink
      href="/dashboard/configuracoes"
      active={isActive("/dashboard/configuracoes")}
     >
      Meu perfil
     </DashboardSidebarNavLink>
     <DashboardSidebarNavLink
      href="/dashboard/configuracoes/tema"
      active={isActive("/dashboard/configuracoes/tema")}
     >
      Aparência
     </DashboardSidebarNavLink>
     <DashboardSidebarNavLink
      href="/dashboard/configuracoes/assinatura"
      active={isActive("/dashboard/configuracoes/assinatura")}
     >
      Assinatura
     </DashboardSidebarNavLink>
    </DashboardSidebarMain>
   </DashboardSidebarNav>
  </aside>
 );
}
