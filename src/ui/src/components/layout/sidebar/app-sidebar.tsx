import { Goal, LayoutDashboard, Send, Settings, User, UserStar } from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/layout/sidebar/nav-main'
import { NavSecondary } from '@/components/layout/sidebar/nav-secondary'
import { NavUser } from '@/components/layout/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/auth-context.tsx'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { hasPermission, hasAnyPermission } = useAuth()

  const data = {
    navProduction: [
      {
        title: 'Jackets',
        url: '/',
        icon: LayoutDashboard,
        isActive: true,
        isVisible: hasPermission('Jacket_Read'),
        items: [],
      },
    ],
    navConfiguration: [
      {
        title: 'General',
        url: '/configuration/general',
        icon: Settings,
        isActive: false,
        isVisible: hasPermission('ApplicationSettings_Write'),
        items: [],
      },
      {
        title: 'Customers',
        url: '/configuration/customers',
        icon: UserStar,
        isActive: true,
        isVisible: hasPermission('Customers_Write'),
        items: [],
      },
    ],
    navPermissions: [
      {
        title: 'Users',
        url: '/permissions/users',
        icon: User,
        isActive: true,
        isVisible: hasPermission('Permissions_Write'),
        items: [],
      },
    ],
    navSecondary: [
      {
        title: 'Feedback',
        url: 'mailto: admin@derekdoes.onmicrosoft.com',
        icon: Send,
      },
    ],
  }

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Goal className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Job Planning</span>
                  <span className="truncate text-xs">Production</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain title="Jackets" items={data.navProduction} />
        {hasAnyPermission(['ApplicationSettings_Write', 'Customers_Write']) && (
          <NavMain title="Configuration" items={data.navConfiguration} />
        )}
        {hasPermission('Permissions_Write') && <NavMain title="Permissions" items={data.navPermissions} />}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
