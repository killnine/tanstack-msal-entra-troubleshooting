import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import React from 'react'
import LayoutAddition from '@/integrations/tanstack-query/layout.tsx'

import { AppSidebar } from '@/components/layout/sidebar/app-sidebar.tsx'
import { ModeToggle } from '@/components/layout/theming/mode-toggle.tsx'
import { ThemeProvider } from '@/components/layout/theming/theme-provider.tsx'
import { BreadcrumbsTrail } from '@/components/ui/breadcrumbs-trail.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx'
import { Toaster } from '@/components/ui/sonner'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbsTrail />
                <ModeToggle />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster richColors toastOptions={{ closeButton: true }} />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />

      <LayoutAddition />
    </>
  )
}

export default Layout
