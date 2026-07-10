'use client'

import * as React from 'react'

import { NavDocuments } from '@/components/admin/ui/nav-documents'
import { NavMain } from '@/components/admin/ui/nav-main'
import { NavSecondary } from '@/components/admin/ui/nav-secondary'
import { NavUser } from '@/components/admin/ui/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import {
  IconDashboard,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconCamera,
  IconFileDescription,
  IconFileAi,
  IconSettings,
  IconHelp,
  IconSearch,
  IconDatabase,
  IconReport,
  IconFileWord,
  IconInnerShadowTop,
  IconPackage,
} from '@tabler/icons-react'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: <IconDashboard />,
    },
    {
      title: 'Product',
      url: '/admin/product',
      icon: <IconPackage />,
    },
    {
      title: 'Analytics',
      url: '#',
      icon: <IconChartBar />,
    },
    {
      title: 'Projects',
      url: '#',
      icon: <IconFolder />,
    },
    {
      title: 'Team',
      url: '#',
      icon: <IconUsers />,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: <IconCamera />,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: <IconFileDescription />,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: <IconFileAi />,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: <IconSettings />,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: <IconHelp />,
    },
    {
      title: 'Search',
      url: '#',
      icon: <IconSearch />,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: <IconDatabase />,
    },
    {
      name: 'Reports',
      url: '#',
      icon: <IconReport />,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: <IconFileWord />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
