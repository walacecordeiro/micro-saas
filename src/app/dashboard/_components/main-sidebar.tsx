"use client";

import {
 DashboardSidebar,
 DashboardSidebarHeader,
 DashboardSidebarMain,
 DashboardSidebarNav,
 DashboardSidebarNavMain,
 DashboardSidebarNavLink,
 DashboardSidebarNavHeader,
 DashboardSidebarNavHeaderTitle,
 DashboardSidebarFooter,
} from "@/components/dashboard/sidebar";
import { HomeIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { Logo } from "@/components/logo";
import { Session } from "next-auth";

type MainSidebarProps = {
 user: Session["user"];
};

export function MainSidebar({ user }: MainSidebarProps) {
 const pathName = usePathname();

 const isActive = (path: string) => {
  const normalizedPathName = pathName.split("/")[2];
  const normalizedPath = path.split("/")[2];
  return normalizedPathName === normalizedPath;
 };

 return (
  <DashboardSidebar>
   <DashboardSidebarHeader>
    <Logo />
   </DashboardSidebarHeader>

   <DashboardSidebarMain className="flex flex-col flex-grow">
    <DashboardSidebarNav>
     <DashboardSidebarNavMain>
      <DashboardSidebarNavLink href="/dashboard" active={isActive("/dashboard")}>
       <HomeIcon className="w-3 h-3 mr-3" />
       Tarefas
      </DashboardSidebarNavLink>
      <DashboardSidebarNavLink
       href="/dashboard/configuracoes"
       active={isActive("/dashboard/configuracoes")}
      >
       <MixerVerticalIcon className="w-3 h-3 mr-3" />
       Configurações
      </DashboardSidebarNavLink>
     </DashboardSidebarNavMain>
    </DashboardSidebarNav>

    <DashboardSidebarNav className="mt-auto">
     <DashboardSidebarNavHeader>
      <DashboardSidebarNavHeaderTitle>Links extras</DashboardSidebarNavHeaderTitle>
     </DashboardSidebarNavHeader>
     <DashboardSidebarNavMain>
      <DashboardSidebarNavLink href="/">Precisa de ajuda?</DashboardSidebarNavLink>
      <DashboardSidebarNavLink href="/">Site</DashboardSidebarNavLink>
     </DashboardSidebarNavMain>
    </DashboardSidebarNav>
   </DashboardSidebarMain>

   <DashboardSidebarFooter>
    <UserDropdown user={user} />
   </DashboardSidebarFooter>
  </DashboardSidebar>
 );
}
