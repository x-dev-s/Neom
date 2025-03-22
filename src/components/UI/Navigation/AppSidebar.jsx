"use client";
import { Divider } from "@/components/Divider";
import { Input } from "@/components/Input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarLink,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSubLink,
} from "@/components/Sidebar";
import { cx, focusRing } from "@/lib/utils";
import { RiArrowDownSFill } from "@remixicon/react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaSolarPanel } from "react-icons/fa6";
import { TiWeatherCloudy } from "react-icons/ti";
import { GiPowerGenerator } from "react-icons/gi";
import { House } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import { siteConfig } from "@/components/UI/Navigation/siteConfig";
import { usePathname } from "next/navigation";

export default function AppSidebar({ ...props }) {
  const [openMenus, setOpenMenus] = useState([]);
  const pathname = usePathname();

  const isActive = (itemHref) => pathname === itemHref;

  const navigation = [
    {
      name: "Dashboard",
      href: siteConfig.baseLinks.dashboard,
      icon: TbLayoutDashboardFilled,
    },
    {
      name: "SLD",
      href: siteConfig.baseLinks.sld,
      icon: House,
    },
    {
      name: "PV",
      href: siteConfig.baseLinks.pv.self,
      icon: FaSolarPanel,
    },
    {
      name: "Meteo",
      href: siteConfig.baseLinks.meteo,
      icon: TiWeatherCloudy,
    },
    {
      name: "Genset",
      href: siteConfig.baseLinks.genset.self,
      icon: GiPowerGenerator,
    },
  ].map((item) => ({ ...item, active: isActive(item.href) }));

  const navigation2 = [
    {
      name: "Inverters",
      href: siteConfig.baseLinks.pv.self,
      icon: FaSolarPanel,
      children: [
        { name: "Inverter 1", href: siteConfig.baseLinks.pv.i1 },
        { name: "Inverter 2", href: siteConfig.baseLinks.pv.i2 },
        { name: "Inverter 3", href: siteConfig.baseLinks.pv.i3 },
        { name: "Inverter 4", href: siteConfig.baseLinks.pv.i4 },
        { name: "Inverter 5", href: siteConfig.baseLinks.pv.i5 },
        { name: "Inverter 6", href: siteConfig.baseLinks.pv.i6 },
      ],
    },
    {
      name: "Generators",
      href: siteConfig.baseLinks.genset.self,
      icon: GiPowerGenerator,
      children: [
        { name: "Generator 1", href: siteConfig.baseLinks.genset.g1 },
        { name: "Generator 2", href: siteConfig.baseLinks.genset.g2 },
        { name: "Generator 3", href: siteConfig.baseLinks.genset.g3 },
      ],
    },
  ].map((item) => ({
    ...item,
    active: isActive(item.href) || item.children?.some((child) => isActive(child.href)),
    children: item.children?.map((child) => ({
      ...child,
      active: isActive(child.href),
    })),
  }));

  useEffect(() => {
    if (navigation2.some((nav) => nav.active)) {
      setOpenMenus([navigation2.find((nav) => nav.active)?.name]);
    }
  }, [pathname]);

  const toggleMenu = (name) => {
    setOpenMenus((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <Sidebar {...props} className="bg-gray-50 dark:bg-gray-950">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-green-100 p-1.5 shadow-sm ring-1 ring-gray-200 dark:bg-green-100 dark:ring-gray-800">
            {/* <Logo className="size-6 text-blue-500 dark:text-blue-500" /> */}
            <img src="/images/logo.png" alt="Logo" className="h-10 object-contain" />
          </span>
          <div>
            <span className="block text-sm font-semibold text-gray-900 dark:text-gray-50">
              Power Matix
            </span>
            <span className="block text-xs text-gray-900 dark:text-gray-300">
              Technology Value Creation
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* <SidebarGroup>
          <SidebarGroupContent>
            <Input
              type="search"
              placeholder="Search items..."
              className="[&>input]:sm:py-1.5"
            />
          </SidebarGroupContent>
        </SidebarGroup> */}
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarLink
                    href={item.href}
                    isActive={item.active}
                    icon={item.icon}
                    notifications={item.notifications}
                  >
                    {item.name}
                  </SidebarLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-3">
          <Divider className="my-0 py-0" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {navigation2.map((item) => (
                <SidebarMenuItem key={item.name}>
                  {/* @CHRIS/SEV: discussion whether to componentize (-> state mgmt) */}
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={cx(
                      "flex w-full items-center justify-between gap-x-2.5 rounded-md p-2 text-base text-gray-900 transition hover:bg-gray-200/50 sm:text-sm dark:text-gray-400 hover:dark:bg-gray-900 hover:dark:text-gray-50",
                      focusRing
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        className="size-[18px] shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                    <RiArrowDownSFill
                      className={cx(
                        openMenus.includes(item.name)
                          ? "rotate-0"
                          : "-rotate-90",
                        "size-5 shrink-0 transform text-gray-400 transition-transform duration-150 ease-in-out dark:text-gray-600"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {item.children && openMenus.includes(item.name) && (
                    <SidebarMenuSub>
                      <div className="absolute inset-y-0 left-4 w-px bg-gray-300 dark:bg-gray-800" />
                      {item.children.map((child) => (
                        <SidebarMenuItem key={child.name}>
                          <SidebarSubLink
                            href={child.href}
                            isActive={child.active}
                          >
                            {child.name}
                          </SidebarSubLink>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <UserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
